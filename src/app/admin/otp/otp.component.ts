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

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private otpService: OtpService,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((param: Params) => {
      // console.log(param);
      this.phone = param.phone;
      this.getOtp();
    });
  }

  resendOtp() {
    this.getOtp();
  }

  getOtp() {
    const param = new HttpParams();
    this.otpService.getOtp(this.phone, param).subscribe(
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
      verifyType: 'creatUser',
      otp: otp,
      phone: this.phone,
    };

    this.otpService.userVerify(otpData).subscribe(
      (res: any) => {
        // console.log(res);
        this.showToast('top-right', 'success', 'Successfully Registered');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      (err: any) => {
        // console.log(err);
        this.showToast('top-right', 'danger', 'Invalid OTP');
      },
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
