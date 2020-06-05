import { InstituteService } from './../../services/institute.service';
import { HeaderComponent } from './../../@theme/components/header/header.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../pages-menu';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HostListener } from '@angular/core';

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

  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private instituteService: InstituteService,
  ) {}

  ngOnInit() {
    this.display = false;
    this.getInstitutes();

    MENU_ITEMS[1].hidden = false;
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

  onClick() {
    this.router.navigate(['/pages/membership']);
  }

  viewInstitute(id: string, name: string) {
    this.router.navigate(['/pages/dashboard', id]);
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.institutes = null;
  }
}
