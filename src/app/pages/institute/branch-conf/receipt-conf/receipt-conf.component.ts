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
  updateReciept = { bussinessName: '', address: '', gstNumber: '', termsAndCondition: '' };
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
    this.getReciept(this.routerId);
    this.active.queryParams.subscribe((data) => {
      console.log(data);
      this.recieptId = data.receiptId;
      this.edit = data.edit;
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
        console.log(data);
        this.updateReciept = data;
        console.log(this.updateReciept.bussinessName);
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
      this.api.updateReceipt(this.routerId, this.receipt.value).subscribe((data) => {
        console.log('update success' + data);
      });
    }

    if (!this.edit) {
      this.api.addReceipt(this.routerId, this.receipt.value).subscribe(
        () => {
          console.log('add success');
          this.message = 'Reciept Added Successfully';
          this.showToast('top-right', 'success');
          setTimeout(() => {
            this.router.navigate(['/pages/institute/branch-config/manage-receipt/', this.routerId]);
          }, 1000);
        },
        (err) => {
          console.error(err);
          this.message = 'There is something missing';
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
