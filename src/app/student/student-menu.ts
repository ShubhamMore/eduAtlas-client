import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home', //  0
    link: '/student/home/',
    icon: 'home-outline',
    home: true,
    hidden: false,
  },
  {
    title: 'My Institutes', //  1
    link: '/student/my-institutes/',
    icon: 'layers-outline',
    hidden: false,
  },
  {
    title: 'Dashboard', //  2
    link: '/student/dashboard/',
    icon: 'layout-outline',
    hidden: true,
  },
  {
    title: 'Announcements', //  3
    link: '/student/announcements/',
    icon: 'message-square-outline',
    hidden: true,
  },
  {
    title: 'Schedule', //  4
    link: '/student/schedule/',
    icon: 'calendar-outline',
    hidden: true,
  },
  {
    title: 'Attendance', //  5
    link: '/student/attendance/',
    icon: 'checkmark-square-outline',
    hidden: true,
  },
  {
    title: 'Performance Report', //  6
    link: '/student/performanceReport/',
    icon: 'activity-outline',
    hidden: true,
  },
  {
    title: 'Study Materials', //  7
    link: '/student/studentMaterial/',
    icon: 'book-open-outline',
    hidden: true,
  },
  {
    title: 'Forums', //  8
    link: '/student/forumsAndChats/',
    icon: 'book-outline',
    hidden: true,
  },
  {
    title: 'Enrollment Details', //  9
    link: '/student/enrollmentDetails/',
    icon: 'bookmark-outline',
    hidden: true,
  },
  {
    title: 'Meetings', //  10
    link: '/student/meeting/',
    icon: 'people-outline',
    hidden: true,
  },
  {
    title: 'Mentoring', //  11
    link: '/student/mentoring/',
    icon: 'person-outline',
    hidden: true,
  },
  {
    title: 'EA Live', //  12
    link: '/student/onlineClasses/',
    icon: 'globe-outline',
    hidden: true,
  },
];
