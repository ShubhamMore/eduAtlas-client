import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { OtpService } from '../../services/auth-services/otp/otp.service';
import { HttpParams } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  phone: string;
  otpSend: boolean = false;
  otpVerified: boolean = false;
  otp: string;

  constructor(
    private otpService: OtpService,
    private toasterService: NbToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      phone: new FormControl(null, { validators: [Validators.required] }),
      otp: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  resendOtp() {
    this.otpSend = false;
    this.otpVerified = false;
    this.getOtp();
  }

  getOtp() {
    if (this.forgotPasswordForm.controls.phone.valid) {
      this.phone = this.forgotPasswordForm.value.phone;
      // console.log(this.phone);

      let param = new HttpParams();
      param = param.append('register', '0');
      this.otpService.getOtpForRegisteredUser(this.phone, param).subscribe(
        (data) => {
          // console.log(data);
          this.otpSend = true;
          this.showToast('top-right', 'success', 'OTP Send');
        },
        (error) => {
          // console.log(error);
          this.showToast('top-right', 'danger', 'This Phone Number is not valid');
        },
      );
    }
  }

  verifyOtp() {
    if (
      this.otpSend &&
      this.forgotPasswordForm.controls.phone.valid &&
      this.forgotPasswordForm.controls.otp.valid
    ) {
      const verificationData = {
        verifyType: 'forgotPassword',
        otp: this.forgotPasswordForm.value.otp,
        phone: this.phone,
      };
      this.otpService.verifyOtp(verificationData).subscribe(
        (data) => {
          // console.log(data);
          this.otpVerified = true;
          this.showToast('top-right', 'success', 'Verified Successfully');
        },
        (error) => {
          // console.log(error);
          this.showToast('top-right', 'danger', 'Invalid OTP');
        },
      );
    }
  }

  resetPassword() {
    if (
      this.otpVerified &&
      this.forgotPasswordForm.controls.phone.valid &&
      this.forgotPasswordForm.controls.password.valid
    ) {
      const data = {
        phone: this.forgotPasswordForm.value.phone,
        password: this.forgotPasswordForm.value.password,
      };

      this.otpService.setPassword(data).subscribe(
        (res: any) => {
          // console.log(res);
          this.showToast('top-right', 'success', 'Successfully set password');

          this.router.navigate(['/login'], { relativeTo: this.route });
        },
        (err) => {
          // console.log(err);
          this.showToast('top-right', 'danger', 'Error While Resetting Password');
        },
      );
    }
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
