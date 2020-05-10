import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbEvaIconsModule} from '@nebular/eva-icons';


import { BranchConfComponent } from '../branch-conf.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { AddBatchesComponent } from '../add-batches/add-batches.component';
import {BranchRoutingModule} from './branch-routing.module';
import { RoleManagementComponent } from '../role-management/role-management.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbCardModule, NbLayoutModule, NbInputModule, NbButtonModule, NbSelectModule,
   NbMenuModule, NbStepperModule, NbAccordionModule,NbCheckboxModule } from '@nebular/theme';
import { DiscountComponent } from '../discount/discount.component';
import { ReceiptConfComponent } from '../receipt-conf/receipt-conf.component';
import {ManageCourseComponent} from '../../branch-conf/add-course/manage-course/manage-course.component';
import {ViewCourseComponent} from '../../branch-conf/add-course/view-course/view-course.component';

import {ManageBatchComponent} from '../../branch-conf/add-batches/manage-batch/manage-batch.component';

import {ManageDiscountComponent} from '../../branch-conf/discount/manage-discount/manage-discount.component';

import {ManageReceiptComponent} from '../../branch-conf/receipt-conf/manage-receipt/manage-receipt.component'

@NgModule({
  declarations: [
  BranchConfComponent,
  AddCourseComponent,
  AddBatchesComponent,
  RoleManagementComponent,
  DiscountComponent,
  ReceiptConfComponent,
  ManageCourseComponent,
  ViewCourseComponent,
  ManageBatchComponent,
  ManageDiscountComponent,
  ManageReceiptComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    NbLayoutModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NbMenuModule,
    NbAccordionModule,
    NbEvaIconsModule

  ],

})

export class BranchModule { }
