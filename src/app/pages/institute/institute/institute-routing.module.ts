import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InstituteComponent } from '../institute.component';
import { AddInstituteComponent } from '../add-institute/add-institute.component';
import { AddStudentsComponent } from '../add-students/add-students.component';
import { BranchConfComponent } from '../branch-conf/branch-conf.component';
import { ManageInstituteComponent } from '../add-institute/manage-institute/manage-institute.component';
import { ManageStudentsComponent } from '../add-students/manage-students/manage-students.component';
import { ViewInstituteComponent } from '../add-institute/manage-institute/view-institute/view-institute.component';

import { ViewStudentComponent } from '../add-students/manage-students/view-student/view-student.component';
import { AddScheduleComponent } from '../../schedule/add-schedule/add-schedule.component';
import { AttandanceComponent } from '../attandance/attandance.component';
import { PendingStudentComponent } from '../add-students/pending-student/pending-student.component';
import { ManageScheduleComponent } from '../../schedule/manage-schedule/manage-schedule.component';
import { ViewScheduleComponent } from '../../schedule/view-schedule/view-schedule.component';
import { TeacherGuard } from '../../../teacher.guard';
import { bManagerGuard } from '../../../bManager.guard';

const routes: Routes = [
  {
    path: '',
    component: InstituteComponent,
    children: [
      { path: 'add-institute', component: AddInstituteComponent },
      { path: 'add-students/:id', component: AddStudentsComponent },
      { path: 'add-students/:id/edit', component: AddStudentsComponent },
      { path: 'manage-institute', component: ManageInstituteComponent },
      { path: 'manage-students/:id', component: ManageStudentsComponent },
      { path: 'manage-institute', component: ManageInstituteComponent },
      { path: 'add-schedule/:id', component: AddScheduleComponent },
      { path: 'attandance/:id', component: AttandanceComponent, canActivate: [] },
      { path: 'view-institute/:id', component: ViewInstituteComponent },

      { path: 'view-student/:id', component: ViewStudentComponent },
      { path: 'manage-schedule/:id', component: ManageScheduleComponent },
      { path: 'pending-students/:id', component: PendingStudentComponent },

      { path: 'view-schedule/:id', component: ViewScheduleComponent },
      {
        path: 'branch-config',
        loadChildren: () =>
          import('../branch-conf/branch/branch.module').then((m) => m.BranchModule),
        canActivate: [bManagerGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstRoutingModule {}
