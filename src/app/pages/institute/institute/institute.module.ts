import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstRoutingModule } from './institute-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbLayoutModule, NbInputModule, NbSelectModule, NbButtonModule, NbAccordionComponent, 
  NbAccordionItemBodyComponent, NbAccordionItemHeaderComponent,
  NbDatepickerModule, NbAccordionModule,
  NbToastrModule, 
  NbCheckboxModule,
  NbStepperModule
  } from '@nebular/theme';
import { AddInstituteComponent } from '../add-institute/add-institute.component';
import { InstituteComponent } from '../institute.component'; 
import { AddStudentsComponent } from '../add-students/add-students.component';
import { BranchConfComponent } from '../branch-conf/branch-conf.component';

import {ManageStudentsComponent} from '../add-students/manage-students/manage-students.component';
import {ManageInstituteComponent} from '../add-institute/manage-institute/manage-institute.component'
import {ViewInstituteComponent} from '../add-institute/manage-institute/view-institute/view-institute.component';

import {ViewStudentComponent} from '../add-students/manage-students/view-student/view-student.component';
import { AddScheduleComponent } from '../../schedule/add-schedule/add-schedule.component';

import { PendingStudentComponent } from '../add-students/pending-student/pending-student.component';
import { AttandanceComponent } from '../attandance/attandance.component';
import { ManageScheduleComponent } from '../../schedule/manage-schedule/manage-schedule.component';
import { ViewScheduleComponent } from '../../schedule/view-schedule/view-schedule.component';
import {TeacherGuard} from '../../../teacher.guard';
import {bManagerGuard} from '../../../bManager.guard';

@NgModule({
  declarations: [AddInstituteComponent,
      InstituteComponent,
      AddStudentsComponent,
  
     ManageStudentsComponent,
     ManageInstituteComponent,
     ViewInstituteComponent,

     ViewStudentComponent,
     PendingStudentComponent,
     AddScheduleComponent,
     AttandanceComponent,
     ManageScheduleComponent,
     ViewScheduleComponent,
    ],
  imports: [
    CommonModule,
    InstRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbDatepickerModule,
    NbButtonModule,
    NbAccordionModule,
    NbStepperModule,
    NbToastrModule.forRoot(),
  ],
  providers: [TeacherGuard, bManagerGuard],
})
export class InstituteModule { }
