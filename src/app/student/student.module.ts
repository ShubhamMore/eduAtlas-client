import { SafeHtmlPipe } from './../pipe/safe-html.pipe';
import { StudentComponent } from './student.component';
import { NgModule } from '@angular/core';

import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbButtonModule,
  NbDatepickerModule,
  NbAccordionModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { ThemeModule } from '../@theme/theme.module';

import { ButtonModule } from 'primeng/button';

import { StudentRoutingModule } from './student-routing.module';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentAnnouncementsComponent } from './student-pages/student-announcements/student-announcements.component';
import { StudentScheduleComponent } from './student-pages/student-schedule/student-schedule.component';
import { StudentAttendanceComponent } from './student-pages/student-attendance/student-attendance.component';
import { StudentPerformanceReportComponent } from './student-pages/student-performance-report/student-performance-report.component';
import { StudentStudyMaterialComponent } from './student-pages/student-study-material/student-study-material.component';
import { StudentForumsChatsComponent } from './student-pages/student-forums-chats/student-forums-chats.component';
import { StudentEnrollmentDetailsComponent } from './student-pages/student-enrollment-details/student-enrollment-details.component';
import { StudentViewAnnouncementComponent } from './student-pages/student-announcements/student-view-announcement/student-view-announcement.component';
import { StudentViewScheduleComponent } from './student-pages/student-schedule/student-view-schedule/student-view-schedule.component';

@NgModule({
  imports: [
    StudentRoutingModule,
    ThemeModule,
    NbMenuModule,
    ButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbListModule,
    NbSelectModule,
    NbDatepickerModule,
    NbAccordionModule,
    NbButtonModule,
  ],
  declarations: [
    StudentComponent,
    StudentHomeComponent,
    StudentDashboardComponent,
    StudentAnnouncementsComponent,
    StudentScheduleComponent,
    StudentAttendanceComponent,
    StudentPerformanceReportComponent,
    StudentStudyMaterialComponent,
    StudentForumsChatsComponent,
    StudentEnrollmentDetailsComponent,
    StudentViewAnnouncementComponent,

    SafeHtmlPipe,

    StudentViewScheduleComponent,
  ],
})
export class StudentModule {}
