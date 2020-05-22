import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth-services/auth.service';
import { Router } from '@angular/router';
import { OtpService } from '../../services/auth-services/otp/otp.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userExist: boolean;

  signUpForm: FormGroup;

  tnc: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private toasterService: NbToastrService,
    private otpService: OtpService,
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup(
      {
        name: new FormControl(null, { validators: [Validators.required] }),
        email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
        phone: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        }),
        password: new FormControl(null, { validators: [Validators.required] }),
        confirmPassword: new FormControl(null, { validators: [Validators.required] }),
        role: new FormControl(null, { validators: [Validators.required] }),
      },
      {
        validators: this.passwordValidator.bind(this),
      },
    );
  }

  passwordValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.password !== group.value.confirmPassword) {
      return { invalidPassword: true };
    }
    return null;
  }

  acceptTermsAndConditions(tnc: boolean) {
    this.tnc = tnc;
    // console.log(tnc);
  }

  onSignUp() {
    if (this.signUpForm.invalid || !this.tnc) {
      return;
    }

    const user = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      phone: this.signUpForm.value.phone,
      password: this.signUpForm.value.password,
      role: this.signUpForm.value.role,
    };

    // this.registerUser.removeControl(name)
    // console.log(user);
    this.authService.findUser(user.phone).subscribe((res: any) => {
      this.userExist = res.user ? true : false;

      // console.log('User Exist' + this.userExist);

      if (this.userExist) {
        this.showToast('top-right', 'danger', 'This User already Exist');
        return;
      }

      this.authService.signUp(user).subscribe(
        (signupRes: any) => {
          // console.log(signupRes);
          //  this.dialog.open(SuccessComponent,
          //   {context:{title:'title'},
          // })

          this.router.navigate(['/otp'], { queryParams: { phone: user.phone } });
        },
        (err: any) => {
          // console.log(err);
          this.showToast('top-right', 'danger', 'This Email or Phone already exist');
        },
      );
    });
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
