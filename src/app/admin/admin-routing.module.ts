import { AdminInstitutesComponent } from './admin-institutes/admin-institutes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
import { AdminInstituteComponent } from './admin-institute/admin-institute.component';
import { AdminSavePlanComponent } from './admin-plans/admin-save-plan/admin-save-plan.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'institutes',
        component: AdminInstitutesComponent,
      },
      {
        path: 'institute',
        component: AdminInstituteComponent,
      },
      {
        path: 'plans',
        component: AdminPlansComponent,
      },
      {
        path: 'plans/add',
        component: AdminSavePlanComponent,
      },
      {
        path: 'plans/edit',
        component: AdminSavePlanComponent,
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
export class AdminRoutingModule {}
