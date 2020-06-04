import { NbMenuItem } from '@nebular/theme';
import { EmployeeComponent } from './employee.component';
import { Title } from '@angular/platform-browser';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline', //  0
    link: '/employee/home',
    home: true,
  },
];
