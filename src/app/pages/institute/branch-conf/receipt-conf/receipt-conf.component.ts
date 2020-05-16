import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MENU_ITEMS } from '../../../pages-menu';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-receipt-conf',
  templateUrl: './receipt-conf.component.html',
  styleUrls: ['./receipt-conf.component.scss'],
})
export class ReceiptConfComponent implements OnInit {
  receipt: FormGroup;
  submitted = false;
  updateReciept = { businessName: '', address: '', gstNumber: '', termsAndCondition: '', fee: '' };
  routerId: string;
  recieptId: string;
  edit: string;
  message: string;
  fees = ['Collection Basis', 'Course Fee Basis'];
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private active: ActivatedRoute,
    private router: Router,
    private toasterSevice: NbToastrService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((data) => {
      this.recieptId = data.receiptId;
      this.edit = data.edit;
      if (this.edit === 'true') {
        this.getReciept(this.routerId);
      }
    });
    this.receipt = this.fb.group({
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      gstNumber: [''],
      termsAndCondition: ['', Validators.required],
      fee: ['', Validators.required],
    });
  }
  get f() {
    return this.receipt.controls;
  }

  getReciept(id) {
    this.api.getReceipt(id).subscribe(
      (data) => {
        this.updateReciept = data;
        this.receipt.patchValue({
          businessName: this.updateReciept.businessName,
          address: this.updateReciept.address,
          gstNumber: this.updateReciept.gstNumber,
          termsAndCondition: this.updateReciept.termsAndCondition,
          fee: this.updateReciept.fee,
        });
      },
      (err) => console.log(err),
    );
  }
  onSubmit() {
    this.submitted = true;
    if (this.receipt.invalid) {
      return;
    }
    if (this.edit === 'true') {
      this.api.updateReceipt(this.routerId, this.receipt.value).subscribe(
        (data) => {
          this.message = 'Reciept Updated Successfully';
          this.showToast('top-right', 'success');
          this.router.navigate(['/pages/institute/branch-config/manage-receipt/', this.routerId]);
        },
        (err) => {
          this.message = err.error.message;
          this.invalidToast('top-right', 'danger');
        },
      );
    }
    if (!this.edit) {
      this.api.addReceipt(this.routerId, this.receipt.value).subscribe(
        () => {
          this.message = 'Reciept Added Successfully';
          this.showToast('top-right', 'success');
            this.router.navigate(['/pages/institute/branch-config/manage-receipt/', this.routerId]);
        },
        (err) => {
          this.message = err.error.message;
          this.invalidToast('top-right', 'danger');
        },
      );
    }
  }
  back() {
    this.location.back();
  }
  showToast(position, status) {
    this.toasterSevice.show(status || 'Success', `${this.message}`, { position, status });
  }
  invalidToast(position, status) {
    this.toasterSevice.show(status || 'Danger', `${this.message}`, { position, status });
  }
}
