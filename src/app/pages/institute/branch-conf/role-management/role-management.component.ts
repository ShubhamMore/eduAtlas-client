import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbComponentSize, NbToastrService } from '@nebular/theme';
import { RoleAssignService } from '../../../../services/role/role-assign.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  roleManage: FormGroup;
  submitted = false;
  display = false;
  otp: string;
  selectedSize: NbComponentSize = 'medium';
  constructor(
    private fb: FormBuilder,
    private roleService: RoleAssignService,
    private active: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.roleManage = this.fb.group({
      phone: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      instituteId: this.active.snapshot.paramMap.get('id'),
    });
  }
  get f() {
    return this.roleManage.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.roleManage.invalid) {
      return;
    }

    // console.log(this.roleManage.value);
    this.roleService.addRole(this.roleManage.value).subscribe(
      (data) => {
        // console.log(data);
        this.display = true;
        this.getOtp(this.roleManage.value.phone);
      },
      // (error) => console.log(error),
    );
  }

  getOtp(phone) {
    let param = new HttpParams();
    param = param.append('register', '1');
    this.roleService.getOtp(phone, param).subscribe((res) => {
      // console.log(res);
    });
  }
  varifyOtp() {
    // console.log('otp====>', this.otp);
    let param = new HttpParams();
    param = param.append('varifyType', 'roleAssign');
    param = param.append('phone', this.roleManage.value.phone);
    param = param.append('otp', this.otp);
    this.roleService.verifyOtp(param).subscribe(
      (res) => {
        // console.log(res);
        this.valid('top-right', 'success');
      },
      (error) => {
        // console.log(error);
        this.invalid('top-right', 'danger');
      },
    );
  }

  valid(position, status) {
    this.toasterService.show(status || 'Success', 'Role Added Successfully', { position, status });
  }
  invalid(position, status) {
    this.toasterService.show(status || 'Danger', 'Invalid OTP', { position, status });
  }
}
