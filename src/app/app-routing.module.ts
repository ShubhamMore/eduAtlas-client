import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from '../app/admin/login/login.component';
// import {HomeComponent } from './home/home.component'
import { AuthGuard } from './auth.guard';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { SignUpComponent } from './admin/sign-up/sign-up.component';

import { OtpComponent } from './admin/otp/otp.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then((m) => m.StudentModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'sign-up',
    component: SignUpComponent,
  },

  {
    path: 'otp',
    component: OtpComponent,
  },

  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },

  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
