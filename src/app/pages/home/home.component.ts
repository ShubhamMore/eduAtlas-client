import { InstituteService } from './../../services/institute.service';
import { HeaderComponent } from './../../@theme/components/header/header.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../pages-menu';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HostListener } from '@angular/core';
import { AuthService } from '../../services/auth-services/auth.service';
import { RoleAssignService } from '../../services/role/role-assign.service';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  display: boolean;

  institutes: any[] = [];

  students: any[] = [];
  studentReq: any[] = [];

  classes: any[] = [];
  fee = ['week', 'month'];

  studentPendingFee: any[] = [];

  messages: any[] = [];
  newLeads: any[] = [];
  showAddInstituteBtn:boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private instituteService: InstituteService,
    private authService: AuthService,
    private roleService: RoleAssignService,
  ) {}

  ngOnInit() {
    this.display = false;
    this.getInstitutes();

    MENU_ITEMS[2].hidden = true;
    MENU_ITEMS[3].hidden = true;
    MENU_ITEMS[4].hidden = true;
    MENU_ITEMS[5].hidden = true;
    MENU_ITEMS[6].hidden = true;
    MENU_ITEMS[7].hidden = true;
    MENU_ITEMS[8].hidden = true;
    MENU_ITEMS[9].hidden = true;
    MENU_ITEMS[10].hidden = true;
    MENU_ITEMS[11].hidden = true;
    MENU_ITEMS[12].hidden = true;
  }

  getInstitutes() {
    const user = this.authService.getUser();
    if(user && user.role === 'institute'){
      MENU_ITEMS[1].hidden = false;
      this.showAddInstituteBtn = true;
      this.api.getInstitutes().subscribe((data: any) => {
        this.institutes = data;
  
        if (this.institutes.length) {
          MENU_ITEMS[1].children[1].hidden = false;
          this.instituteService.setInstitutes(this.institutes);
          this.display = true;
        } else {
          MENU_ITEMS[1].children[1].hidden = true;
        }
      });
    }
    else  if(user && user.role === 'employee'){
      this.api.getEmployeeInstitutes({email:user.email}).subscribe((data: any) => {
        MENU_ITEMS[1].hidden = true;
        this.institutes = data;
        if (this.institutes.length) {
          this.instituteService.setInstitutes(this.institutes);
          this.display = true;
        } 
      });
    }
    
  }

  onClick() {
    this.router.navigate(['/pages/membership']);
  }

  viewInstitute(id: string, name: string) {
    var role = this.getEmployeeRole(id);
    this.roleService.assignRoles(role);
    this.router.navigate(['/pages/dashboard', id]);
  }
  getEmployeeRole(instituteId: any) {
    var institiute = this.institutes.find((institute=>{return instituteId===institute._id}))
    if(institiute){
      return institiute.role;
    }
    }
  @HostListener('unloaded')
  ngOnDestroy() {
    this.institutes = null;
  }
}
