/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AuthInterceptor} from './services/auth-interceptor/auth-interceptor';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import {AuthGuard} from './auth.guard';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbButtonModule,
  NbWindowModule,
  NbSelectModule,
  NbLayoutModule,
  NbCardModule,
  NbCheckboxModule,
  NbRadioModule,
  NbInputModule,
  NbPopoverModule,
  NbStepperModule
} from '@nebular/theme';
import { LoginComponent } from './admin/login/login.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { OtpComponent } from './admin/otp/otp.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';


// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, OtpComponent, ForgotPasswordComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    NbSelectModule,
    NbCardModule,
    NbLayoutModule,
    AppRoutingModule,
    NbButtonModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbRadioModule,
    NbStepperModule,
    NbInputModule,
    NbEvaIconsModule,
    //InMemoryWebApiModule.forRoot(UserData),
    NbToastrModule.forRoot(),
    ReactiveFormsModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers:[AuthGuard,
    //{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AppModule {
}
