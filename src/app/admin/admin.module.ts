import { NgModule } from '@angular/core';

import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbTabsetModule,
  NbUserModule,
  NbButtonModule,
  NbDatepickerModule,
  NbInputModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { ThemeModule } from '../@theme/theme.module';

import { ButtonModule } from 'primeng/button';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminInstituteComponent } from './admin-institute/admin-institute.component';
import { AdminSavePlanComponent } from './admin-plans/admin-save-plan/admin-save-plan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminInstitutesComponent } from './admin-institutes/admin-institutes.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    ButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbTabsetModule,
    NbUserModule,
    NbListModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbDatepickerModule,
    NbButtonModule,
    NbInputModule,
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    AdminPlansComponent,
    AdminInstituteComponent,
    AdminSavePlanComponent,
    AdminInstitutesComponent,
  ],
})
export class AdminModule {}
