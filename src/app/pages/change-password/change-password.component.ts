import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { AuthService } from './../../services/auth-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.form = new FormGroup(
      {
        oldPassword: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirm_password: new FormControl(null, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: this.passwordValidator.bind(this),
      },
    );
  }

  passwordValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.password !== group.value.confirm_password) {
      return { invalidPassword: true };
    }
    return null;
  }

  changePassword() {
    if (this.form.valid && !this.form.hasError('invalidPassword')) {
      const data = {
        api: 'changePassword',
        data: {
          email: JSON.parse(localStorage.getItem('userData')).email,
          oldPassword: this.form.value.oldPassword,
          newPassword: this.form.value.password,
        },
      };
      this.authService.changePassword(data).subscribe(
        (resData: any) => {
          this.showToast('top-right', 'success', 'Password Changed Successfully!');
          this.router.navigate(['/pages/home'], { relativeTo: this.route });
        },
        (errorMessage: any) => {
          console.log(errorMessage);
          this.showToast('top-right', 'danger', 'Password Changed Failed!');
        },
      );
    } else {
      this.showToast('top-right', 'danger', 'Please Fill all The Fields Correctly');
    }
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
}
