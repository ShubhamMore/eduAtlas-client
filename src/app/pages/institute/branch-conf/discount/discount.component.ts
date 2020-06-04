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
  discountForm: FormGroup;
  instituteId: string;
  edit: string;
  discountId: string;
  discountUpdate: any;
  submitted = false;
  display: boolean;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private location: Location,
    private active: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.display = false;
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((data) => {
      this.edit = data.edit;
      this.discountId = data.discountId;
    });

    this.discountForm = this.fb.group({
      discountCode: ['', Validators.required],
      description: [''],
      amount: ['', Validators.required],
    });

    if (this.edit) {
      this.getDiscount(this.discountId);
    } else {
      this.display = true;
    }
  }

  getDiscount(id: any) {
    let param = new HttpParams();
    param = param.append('instituteId', this.instituteId);
    param = param.append('discountId', id);
    this.api.getDiscount(param).subscribe(
      (data: any) => {
        this.discountUpdate = data[0];

        this.discountForm.patchValue({
          discountCode: this.discountUpdate.discountCode,
          description: this.discountUpdate.description,
          amount: this.discountUpdate.amount,
        });
        this.display = true;
      },
      (err: any) => {
        this.display = true;
      },
    );
  }

  get f() {
    return this.discountForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.discountForm.invalid) {
      return;
    }
    if (this.edit === 'true') {
      let param = new HttpParams();
      param = param.append('instituteId', this.instituteId);
      param = param.append('discountId', this.discountId);
      this.api.updateDiscount(param, this.discountForm.value).subscribe(
        (res) => {
          this.showToast('top-right', 'success', 'Discount Updated');
          setTimeout(() => {
            this.router.navigate([
              '/pages/institute/branch-config/manage-discount/',
              this.instituteId,
            ]);
          }, 1000);
        },
        (error) => {
          this.showToast('top-right', 'danger', 'Discount Updation Failed');
        },
      );
    } else {
      this.api.addDiscount(this.instituteId, this.discountForm.value).subscribe(
        (data) => {
          this.showToast('top-right', 'success', 'Discount Added Successfully');
          setTimeout(() => {
            this.router.navigate([
              '/pages/institute/branch-config/manage-discount/',
              this.instituteId,
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
