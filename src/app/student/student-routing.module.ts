import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentComponent } from './student.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentAnnouncementsComponent } from './student-pages/student-announcements/student-announcements.component';
import { StudentScheduleComponent } from './student-pages/student-schedule/student-schedule.component';
import { StudentAttendanceComponent } from './student-pages/student-attendance/student-attendance.component';
import { StudentPerformanceReportComponent } from './student-pages/student-performance-report/student-performance-report.component';
import { StudentStudyMaterialComponent } from './student-pages/student-study-material/student-study-material.component';
import { StudentForumsChatsComponent } from './student-pages/student-forums-chats/student-forums-chats.component';
import { StudentEnrollmentDetailsComponent } from './student-pages/student-enrollment-details/student-enrollment-details.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: 'home',
        component: StudentHomeComponent,
      },
      {
        path: 'manage-institute',
        component: StudentHomeComponent,
      },
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
      },
      {
        path: 'announcements',
        component: StudentAnnouncementsComponent,
      },
      {
        path: 'schedule',
        component: StudentScheduleComponent,
      },
      {
        path: 'attendance',
        component: StudentAttendanceComponent,
      },
      {
        path: 'performanceReport',
        component: StudentPerformanceReportComponent,
      },
      {
        path: 'studentMaterial',
        component: StudentStudyMaterialComponent,
      },
      {
        path: 'forumsAndChats',
        component: StudentForumsChatsComponent,
      },
      {
        path: 'enrollmentDetails',
        component: StudentEnrollmentDetailsComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
