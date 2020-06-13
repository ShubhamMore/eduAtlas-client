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

import { AuthInterceptor } from './services/auth-services/auth-interceptor/auth-interceptor';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AuthGuard } from './auth.guard';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbContextMenuModule,
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
  NbStepperModule,
} from '@nebular/theme';
import { LoginComponent } from './admin/login/login.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { OtpComponent } from './admin/otp/otp.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { TermsAndConditionsComponent } from './admin/terms-and-conditions/terms-and-conditions.component';

// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    OtpComponent,
    ForgotPasswordComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    NbContextMenuModule,
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
  entryComponents: [TermsAndConditionsComponent],
  bootstrap: [AppComponent],
  providers: [AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AppModule {}
