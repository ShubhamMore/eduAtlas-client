import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BranchConfComponent } from '../branch-conf.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { AddBatchesComponent } from '../add-batches/add-batches.component';
import { RoleManagementComponent } from '../role-management/role-management.component';
import { DiscountComponent } from '../discount/discount.component';
import { ReceiptConfComponent } from '../receipt-conf/receipt-conf.component';
import { ManageCourseComponent } from '../../branch-conf/add-course/manage-course/manage-course.component';
import { ViewCourseComponent } from '../../branch-conf/add-course/view-course/view-course.component';

import { ManageBatchComponent } from '../add-batches/manage-batch/manage-batch.component';

import { ManageDiscountComponent } from '../discount/manage-discount/manage-discount.component';

import { ManageReceiptComponent } from '../../branch-conf/receipt-conf/manage-receipt/manage-receipt.component';
import { ManageEmployee } from '../employee-management/manage-employee/manage-employee.component';
import { AddEmployee } from '../employee-management/add-employee.component';
import { ViewEmployee } from '../employee-management/view-employee/view-employee.component';

const routes = [
  {
    path: '',
    component: BranchConfComponent,
    children: [
      { path: 'add-courses/:id', component: AddCourseComponent },
      { path: 'manage-course/:id', component: ManageCourseComponent },
      { path: 'view-course/:id', component: ViewCourseComponent },
      { path: 'add-batch/:id', component: AddBatchesComponent },
      { path: 'manage-batch/:id', component: ManageBatchComponent },
      { path: 'add-discount/:id', component: DiscountComponent },
      { path: 'manage-discount/:id', component: ManageDiscountComponent },
      { path: 'manage-receipt/:id', component: ManageReceiptComponent },
      { path: 'add-receipt/:id', component: ReceiptConfComponent },
      { path: 'manage-role-management/:id', component: RoleManagementComponent },
      { path: 'add-employee/:id', component: AddEmployee },
      { path: 'add-employee/:id/edit', component: AddEmployee },
      { path: 'manage-employee/:id', component: ManageEmployee },
      { path: 'view-employee/:id', component: ViewEmployee },
      { path: '', redirectTo: 'add-courses', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchRoutingModule {}
