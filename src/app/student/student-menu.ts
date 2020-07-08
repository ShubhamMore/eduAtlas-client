import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home-outline', //  0
    link: '/student/home/',
    home: true,
  },
  {
    title: 'My Institutes', //  1
    link: '/student/my-institutes/',
    home: true,
  },
  {
    title: 'Dashboard', //  2
    link: '/student/dashboard/',
    home: true,
    hidden: true,
  },
  {
    title: 'Announcements', //  3
    link: '/student/announcements/',
    home: true,
    hidden: true,
  },
  {
    title: 'Schedule', //  4
    link: '/student/schedule/',
    home: true,
    hidden: true,
  },
  {
    title: 'Attendance', //  5
    link: '/student/attendance/',
    home: true,
    hidden: true,
  },
  {
    title: 'Performance Report', //  6
    link: '/student/performanceReport/',
    home: true,
    hidden: true,
  },
  {
    title: 'Study Materials', //  7
    link: '/student/studentMaterial/',
    home: true,
    hidden: true,
  },
  {
    title: 'Forums & Chats', //  8
    link: '/student/forumsAndChats/',
    home: true,
    hidden: true,
  },
  {
    title: 'Enrollment Details', //  9
    link: '/student/enrollmentDetails/',
    home: true,
    hidden: true,
  },
];
