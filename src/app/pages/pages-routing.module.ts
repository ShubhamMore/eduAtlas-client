import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';

import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { MembershipComponent } from './membership/membership.component';
import { CommunicationComponent } from './communication/communication.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'membership',
        component: MembershipComponent,
      },
      {
        path: 'dashboard/:id',
        component: ECommerceComponent,
      },

      {
        path: 'institute',
        loadChildren: () =>
          import('./institute/institute/institute.module').then((m) => m.InstituteModule),
      },

      {
        path: 'communication',
        loadChildren: () =>
          import('./communication/communication/communication.module').then(
            (m) => m.CommunicationModule,
          ),
      },
      {
        path: 'student-reports',
        loadChildren: () => import('./student-reports/student-report.module').then((m) => m.StudentReportModule),
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
