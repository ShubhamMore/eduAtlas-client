import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { MENU_ITEMS } from '../../../pages-menu';

@Component({
  selector: 'ngx-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
  discount: FormGroup;
  routerId: string;
  edit: string;
  discountId: string;
  discountUpdate = { discountCode: '', description: '', amount: '', _id: '' };
  submitted = false;
  message: string;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private location: Location,
    private active: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((data) => {
      // console.log(data);
      this.edit = data.edit;
      this.discountId = data.discountId;
      if (this.edit) {
        this.getDiscount(this.discountId);
      }
    });

    this.discount = this.fb.group({
      discountCode: ['', Validators.required],
      description: [''],
      amount: ['', Validators.required],
    });
  }

  getDiscount(id) {
    let param = new HttpParams();
    param = param.append('instituteId', this.routerId);
    param = param.append('discountId', id);
    this.api.getDiscount(param).subscribe((data) => {
      // console.log('discount Data ', data);
      this.discountUpdate = JSON.parse(JSON.stringify(data[0]));
      // console.log('CODE ', this.discountUpdate.discountCode);

      this.discount.patchValue({
        discountCode: this.discountUpdate.discountCode,
        description: this.discountUpdate.description,
        amount: this.discountUpdate.amount,
      });
    });
  }
  get f() {
    return this.discount.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.discount.invalid) {
      return;
    }
    if (this.edit === 'true') {
      let param = new HttpParams();
      param = param.append('instituteId', this.routerId);
      param = param.append('discountId', this.discountId);
      this.api.updateDiscount(param, this.discount.value).subscribe(
        (res) => {
          // console.log(res);
          this.showToast('top-right', 'success', 'Discount Updated');
          setTimeout(() => {
            this.router.navigate([
              '/pages/institute/branch-config/manage-discount/',
              this.routerId,
            ]);
          }, 1000);
        },
        (error) => {
          // console.log(error);
          this.showToast('top-right', 'danger', 'Discount Updation Failed');
        },
      );
    } else {
      // console.log(this.discount.value);
      this.api.addDiscount(this.routerId, this.discount.value).subscribe(
        (data) => {
          // console.log('add success' + ' ' + data);

          this.showToast('top-right', 'success', 'Discount Added Successfully');
          setTimeout(() => {
            this.router.navigate([
              '/pages/institute/branch-config/manage-discount/',
              this.routerId,
            ]);
          }, 1000);
        },
        (err) => {
          console.error(err);
          this.showToast('top-right', 'danger', 'This Discount already added');
        },
      );
    }
  }
  back() {
    this.location.back();
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
