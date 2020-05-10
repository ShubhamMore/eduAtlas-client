import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OtpService } from '../../services/otp/otp.service';
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
  message: string;
  constructor(
    public router: Router,
    private active: ActivatedRoute,
    private otpService: OtpService,
    private toasterService: NbToastrService
  ) {}

  ngOnInit() {
    this.active.queryParams.subscribe((res) => {
      console.log(res);
      this.phone = res.phone;

      this.getOtp();
    });
  }

  getOtp() {
    let param = new HttpParams();
    param = param.append('register', '1');
    this.otpService.getOtp(this.phone, param).subscribe((res) => console.log(res));
  }
  verifyOtp(otp) {
    let param = new HttpParams();
    param = param.append('varifyType', 'creatUser');
    param = param.append('otp', otp);
    param = param.append('phone', this.phone);
    this.otpService.userVarify(param).subscribe(
      (res) => {
        console.log(res);
        this.message = 'Successfully Registered';
        this.showToast('top-right', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      (err) => {
        console.log(err);
        this.message = 'Invalid OTP';
        this.invalidToast('top-right', 'danger');
      }
    );
  }
  showToast(position, status) {
    this.toasterService.show(status || 'Success', `${this.message}`, { position, status });
  }
  invalidToast(position, status) {
    this.toasterService.show(status || 'Danger', `${this.message}`, { position, status });
  }
}
