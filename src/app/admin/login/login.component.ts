import { Observable } from 'rxjs';
import { AuthResponseData } from './../../services/auth-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth-services/auth.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      phone: new FormControl(null, { validators: [Validators.required] }),
      password: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const phone = this.loginForm.value.phone;
    const password = this.loginForm.value.password;

    let authObs: Observable<AuthResponseData>;

    authObs = this.authService.login(phone, password);

    authObs.subscribe(
      (resData: any) => {
        if (resData.role === '4') {
          this.showToast('top-right', 'success', `Login Success`);
          this.router.navigate(['/pages/home'], {
            relativeTo: this.route,
          });
        } else {
          this.router.navigate(['/login'], {
            relativeTo: this.route,
          });
        }
        this.loginForm.reset();
      },
      (errorMessage: any) => {
        this.showToast('top-right', 'danger', 'Invalid Password');
      },
    );
  }

  //  console.log(this.login.value);
  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
}
