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
    this.api.getInstitutes().subscribe((data: any[]) => {
      this.institutes = data;
    });
  }

  setInstitutes() {
    this.institutes = [];
    this.institutes = this.instituteService.getInstitutes();
  }

  onSelect(event: any) {
    if (event !== 'undefined') {
      this.router.navigate(['/pages/dashboard/', event]);
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
