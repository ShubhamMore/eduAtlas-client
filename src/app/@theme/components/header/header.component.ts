import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
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
  userPictureOnly: boolean = false;
  institutes: any;
  institute = [];
  name = `${
    localStorage.getItem('username') !== 'undefined'
      ? JSON.parse(JSON.stringify(localStorage.getItem('username')))
      : ''
  }`;
  user = {
    name: `Welcome ${this.name}
   (${JSON.parse(JSON.stringify(localStorage.getItem('role')))})`,
  };
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
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private api: ApiService,
    private layoutService: LayoutService,
    private router: Router,
    private breakpointService: NbMediaBreakpointsService
  ) {}

  ngOnInit() {
    this.getInstitutes();

    // this.currentTheme = this.themeService.currentTheme;

    //  this.userService.getUsers()
    //    .pipe(takeUntil(this.destroy$))
    //  .subscribe((users: any) => this.user = users.nick);

    // const { xl } = this.breakpointService.getBreakpointsMap();
    // this.themeService.onMediaQueryChange()
    //   .pipe(
    //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    // this.themeService.onThemeChange()
    //   .pipe(
    //     map(({ name }) => name),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe(themeName => this.currentTheme = themeName);

    //localStorage.removeItem("username");
  }
  getInstitutes() {
    this.api.getInstitutes().subscribe((data) => {
      this.institutes = data;

      // console.log('institutes - ' + JSON.stringify(this.institutes));
      this.institute = JSON.parse(JSON.stringify(this.institutes));
      console.log(this.institute);
    });
  }
  onSelect(event) {
    console.log('Institute===================>', JSON.parse(JSON.stringify(event)));
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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');

    this.router.navigate(['/login']);
  }
}
