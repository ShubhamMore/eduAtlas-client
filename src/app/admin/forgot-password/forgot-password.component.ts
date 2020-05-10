import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OtpService } from '../../services/otp/otp.service';
import { HttpParams } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgot: FormGroup;
  phone: string;
  display: boolean = true;
  displayPass: boolean = true;
  newPassword: string;
  message: string;
  otp: string;
  constructor(
    private fb: FormBuilder,
    private otpService: OtpService,
    private toasterService: NbToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgot = this.fb.group({
      phone: ['', Validators.required],
      otp: [''],
      password: [''],
    });
  }

  getOtp() {
    console.log('phone=> ', this.forgot.value);
    this.phone = this.forgot.value.phone;
    this.otp = this.forgot.value.otp;
    this.newPassword = this.forgot.value.password;
    console.log(this.phone);
    if (!this.display) {
      let param = new HttpParams();
      param = param.append('varify', '1');
      console.log(this.otp);
      if (this.displayPass) {
        console.log('from varify =>', this.displayPass);
        let param = new HttpParams();
        param = param.append('varifyType', 'forgotPassword');
        param = param.append('isVarify', '1');
        param = param.append('otp', this.otp);
        param = param.append('phone', this.phone);
        this.otpService.varifyOtp(param, this.newPassword).subscribe(
          (data) => {
            console.log(data);
            this.displayPass = false;
            this.message = 'Varified Successfully';
            this.showToast('top-right', 'success');
          },
          (error) => {
            console.log(error);
            this.message = 'Invalid OTP';
            this.invalidToast('top-right', 'danger');
          }
        );
      }
    }
    if (!this.displayPass) {
      console.log('from setPass=> ', this.displayPass);
      console.log(this.forgot.value);
      let param = new HttpParams();
      param = param.append('varifyType', 'forgotPassword');
      param = param.append('phone', this.phone);
      param = param.append('otp', this.otp);

      this.otpService.setPassword(param, this.forgot.value).subscribe((data) => {
        console.log(data);
        this.message = 'Successfully set password';
        this.showToast('top-right', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      });
    }
    if (this.display) {
      let param = new HttpParams();
      param = param.append('register', '0');
      this.otpService.getOtp(this.phone, param).subscribe(
        (data) => {
          console.log(data);
          this.display = false;
          console.log(this.display);
          this.message = 'OTP Send';
          this.showToast('top-right', 'success');
        },
        (error) => {
          console.log(error);
          this.message = 'This Phone Number is not valid';
          this.invalidToast('top-right', 'danger');
        }
      );
    }
  }

  showToast(position, status) {
    this.toasterService.show(status || 'Success', `${this.message}`, { position, status });
  }

  invalidToast(position, status) {
    this.toasterService.show(status || 'Danger', `${this.message}`, { position, status });
  }
}
