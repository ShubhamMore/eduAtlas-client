import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { OtpService } from '../../services/otp/otp.service';
import { HttpParams } from '@angular/common/http';

import { NbToastrService } from '@nebular/theme';
interface sendValue {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userExist: boolean;
  public registerUser: FormGroup;
  invalid: string;
  submitted: boolean = false;
  phone: string;

  message: string;
  // options = [
  //   {value:null,name:'Select Role'},
  //   { value: 1, name: 'role 1' },
  //   { value: 2, name: 'role 2' },
  //   { value: 3, name: 'role 3' },
  // ];

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router,
    private toasterService: NbToastrService,
    private otpService: OtpService
  ) {}

  ngOnInit() {
    this.registerUser = this.fb.group(
      {
        name: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/),
            Validators.maxLength(10),
          ]),
        ],
        role: ['', Validators.required],

        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        confirmPass: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPass'),
      }
    );
    console.log(this.f.phone);
  }
  get f() {
    return this.registerUser.controls;
  }
  onKey(event) {
    this.phone = event.target.value;
  }

  onSignUp() {
    const sendValue: sendValue = { name: '', email: '', phone: '', password: '', role: '' };
    this.submitted = true;

    if (this.registerUser.invalid) {
      return;
    }
    sendValue.name = this.registerUser.value.name;
    sendValue.email = this.registerUser.value.email;
    sendValue.phone = this.registerUser.value.phone;
    sendValue.role = this.registerUser.value.role;
    sendValue.password = this.registerUser.value.password;

    // this.registerUser.removeControl(name)
    console.log(sendValue);
    this.auth.findUser(sendValue.phone).subscribe((res) => {
      this.userExist = res.User ? true : false;
      console.log('User Exist' + this.userExist);

      if (!this.userExist) {
        this.auth.instituteSignup(sendValue).subscribe(
          (res) => {
            console.log(res);
            //  this.dialog.open(SuccessComponent,
            //   {context:{title:'title'},
            // })

            this.router.navigate([`/otp`], { queryParams: { phone: sendValue.phone } });
          },
          (err) => {
            console.log(err);
            this.invalid = 'This Email or Phone already exist';
            this.invalidToast('top-right', 'danger');
          }
        );
      }
      if (this.userExist) {
        //  const dialogRef = this.dialog.open(DialogComponent, {
        //     context: {
        //       title: 'This is a title passed to the dialog component',
        //     },
        //   });
        this.invalid = 'This User already Exist';
        this.invalidToast('top-right', 'danger');
      }
    });
  }

  invalidToast(position, status) {
    this.toasterService.show(status || 'Danger', `${this.invalid}`, { position, status });
  }
}
