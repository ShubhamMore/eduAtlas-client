import { NbMenuItem } from '@nebular/theme';
import { StudentComponent } from './student.component';
import { Title } from '@angular/platform-browser';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline', //  0
    link: '/student/home',
    home: true,
  },
];
