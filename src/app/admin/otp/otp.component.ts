import { AuthService } from './../../services/auth-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OtpService } from '../../services/auth-services/otp/otp.service';
import { HttpParams } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  phone: string;
  otp: string;

  loginOTP: boolean;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private otpService: OtpService,
    private toasterService: NbToastrService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param: Params) => {
      this.loginOTP = param.type === 'login' ? true : false;
      this.phone = param.phone;
      this.getOtp();
    });
  }

  resendOtp() {
    this.getOtp();
  }

  getOtp() {
    this.otpService.getOtp(this.phone).subscribe(
      (res: any) => {
        // console.log(res);
      },
      (error: any) => {
        // console.log(error);
      },
    );
  }

  verifyOtp(otp: any) {
    const otpData = {
      verifyType: this.loginOTP ? 'loginUser' : 'createUser',
      otp: otp,
      phone: this.phone,
    };

    this.otpService.userVerify(otpData).subscribe(
      (res: any) => {
        if (this.loginOTP) {
          if (res._id) {
            this.authService.loginSuccess(res);
            this.showToast('top-right', 'success', 'OTO Verification Successful');
            setTimeout(() => {
              this.router.navigate(['/pages/home'], {
                relativeTo: this.route,
              });
            }, 1000);
          }
        } else {
          this.showToast('top-right', 'success', 'Successfully Registered');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        }
      },
      (err: any) => {
        // console.log(err);
        this.showToast('top-right', 'danger', err.error.message);
      },
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
