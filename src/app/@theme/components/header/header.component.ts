import { InstituteService } from './../../../services/institute.service';
import { AuthService } from './../../../services/auth-services/auth.service';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RoleAssignService } from '../../../services/role/role-assign.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean;
  institutes: any[];
  name: string;
  user: any;

  userMenu = [{ title: 'Edit Profile' }, { title: 'Change Password' }];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  constructor(
    private authService: AuthService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private api: ApiService,
    private layoutService: LayoutService,
    private router: Router,
    private breakpointService: NbMediaBreakpointsService,
    private instituteService: InstituteService,
    private roleService: RoleAssignService,
  ) {}

  ngOnInit() {
    this.userPictureOnly = false;
    this.institutes = [];
    this.user = this.authService.getUser();
    this.name = `Welcome ${this.user.name}
      (${this.user.role})`;

    this.getInstitutes();
  }

  getInstitutes() {
    if (this.user.role === 'institute') {
      this.api.getInstitutes().subscribe((data: any[]) => {
        this.institutes = data;
      });
    } else if (this.user.role === 'employee') {
      this.api.getEmployeeInstitutes({ email: this.user.email }).subscribe((inst: any) => {
        this.instituteService.setInstitutes(inst);
      });
    }
  }

  setInstitutes() {
    this.institutes = [];
    this.institutes = this.instituteService.getInstitutes();
  }

  onSelect(event: any) {
    if (event !== 'undefined') {
      if (this.user.role === 'institute') {
        this.router.navigate(['/pages/dashboard/', event]);
      } else if (this.user.role === 'employee') {
        var role = this.getEmployeeRole(event);
        this.roleService.assignRoles(role);
        this.router.navigate(['/pages/dashboard/', event]);
      } else if (this.user.role === 'student') {
        this.router.navigate(['/student/dashboard/', event]);
      }
    }
  }
  getEmployeeRole(instituteId: any) {
    var institiute = this.institutes.find((institute=>{return instituteId===institute._id}))
    if(institiute){
      return institiute.role;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
