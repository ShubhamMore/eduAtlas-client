import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentReportConfComponent } from './student-report-conf/student-report-conf.component';
import { AddPTMsComponent } from './student-report-conf/Schedule-PTMs/add-PTMs/add-ptms.component';
import { ManagePTMsComponent } from './student-report-conf/Schedule-PTMs/manage-PTMs/manage-ptms.component';

const routes: Routes = [
  {
    path: '',
    component: StudentReportConfComponent,
    children: [
      {
        path: 'add-ptms/:id',
        component: AddPTMsComponent,
      },
      {
        path: 'manage-ptms/:id',
        component: ManagePTMsComponent,
      },
      {
        path: '',
        redirectTo: 'manage-ptms',
        pathMatch: 'full',
      },
      {
        path: '**',
        // component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentReportRoutingModule {}
