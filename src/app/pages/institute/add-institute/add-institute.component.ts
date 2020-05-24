import { PaymentService } from './../../../services/payment.service';
import { AuthService } from './../../../services/auth-services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CountryService } from '../../../services/country.service';
import { MENU_ITEMS } from '../../pages-menu';
import { mimeType } from './mime-type.validator';
import { environment } from '../../../../environments/environment';

import { NbToastrService, NbStepperComponent } from '@nebular/theme';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var Razorpay: any;

@Component({
  selector: 'ngx-add-institute',
  templateUrl: './add-institute.component.html',
  styleUrls: ['./add-institute.component.scss'],
})
export class AddInstituteComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent;

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  user: any;

  options: any;
  razorPay: any;
  amount: string;
  placedOrderReceipt: any;

  institute = {
    name: '',
    logo: null,
    instituteContact: '',
    address: { addressLine: '', city: '', state: '', pincode: '' },
    category: [''],
    instituteMetaTag: [''],
  };

  submitted = false;
  inputValue: string;

  myInstitute = {
    institute: {
      address: { addressLine: '', locality: '', state: '', city: '', pincode: '' },
      basicInfo: { name: '', instituteContact: '', logo: '' },
      category: [],
      course: [{ name: '' }],
      batch: [{ code: '' }],
      discount: [{ amount: '' }],
      metaTag: [],
      location: { type: '', coordinates: [] },
    },
  };

  imagePreview: string;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  edit: string;
  instituteId: string;

  category = [
    { id: 1, name: 'Pre School' },
    { id: 2, name: 'School' },
    { id: 3, name: 'Tuition Centers' },
    { id: 4, name: 'Coaching Centers' },
    { id: 5, name: 'Hobby Centers' },
    { id: 6, name: 'Enhanced learning' },
    { id: 7, name: 'Sports Centers' },
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private country: CountryService,
    private active: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService,
    private domSanitizer: DomSanitizer,
    private paymentService: PaymentService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    this.active.queryParams.subscribe((param: Params) => {
      this.amount = param.amount;
      this.edit = param.edit;
      this.instituteId = param.instituteId;
    });

    if (!this.edit) {
      this.options = {
        key: environment.razorpayKeyId, // Enter the Key ID generated from the Dashboard
        amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'eduatlas',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        // tslint:disable-next-line: max-line-length
        order_id: '', // This is a sample Order ID. Pass the `id` obtained in the response of Step 1 order_9A33XWu170gUtm
        handler: (response: any) => {
          console.log(response);
          this.verifyPayment(response);
        },
        modal: {
          ondismiss: () => {
            this.deleteOrder();
          },
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          address: 'Eduatlas Office',
        },
        theme: {
          color: '#ffd500',
        },
      };

      this.razorPay = new Razorpay(this.options);
    }

    this.firstForm = this.fb.group({
      name: ['', Validators.required],
      logo: [null, { Validators: [Validators.required], asyncValidators: [mimeType] }],
    });

    this.secondForm = this.fb.group({
      instituteContact: ['', { validators: [Validators.required] }],
      address: this.fb.group({
        addressLine: [''],
        locality: [''],
        city: [''],
        state: [''],
        pincode: [''],
      }),
    });

    this.thirdForm = this.fb.group({
      category: [['']],
      instituteMetaTag: this.fb.array([this.fb.control('')]),
    });

    MENU_ITEMS[2].hidden = true;
    MENU_ITEMS[3].hidden = true;
    MENU_ITEMS[4].hidden = true;
    MENU_ITEMS[1].hidden = false;

    this.getCountries();

    if (this.edit) {
      this.getInstitute(this.instituteId);
    }
  }

  pay() {
    this.razorPay.open();
  }

  deleteOrder() {
    this.paymentService.deleteOrder(this.placedOrderReceipt._id).subscribe(
      (res: any) => {
        this.placedOrderReceipt = null;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  generateOrder(order: any) {
    this.paymentService.generateOrder(order).subscribe(
      (res: any) => {
        console.log(res);
        this.placedOrderReceipt = res.receipt;
        this.options.amount = res.order.amount;
        this.options.order_id = res.order.id;
        this.options.currency = res.order.currency;
        this.options.prefill.name = this.user.name;
        this.options.prefill.email = this.user.email;
        this.options.prefill.contact = this.user.phone;
        this.razorPay = new Razorpay(this.options);
        this.pay();
      },
      (err) => {
        console.log(err);
      },
    );
  }

  verifyPayment(payment: any) {
    this.paymentService.verifyPayment(payment, this.placedOrderReceipt).subscribe(
      (res: any) => {
        this.addInstituteAfterPayment(this.institute);
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  addInstituteAfterPayment(institute: any) {
    this.api.addInstitute(institute).subscribe(
      (data) => {
        this.user = data;
        this.showToast('top-right', 'success', 'Institute Added Successfully');
        setTimeout(() => {
          this.router.navigate(['/pages/home']);
        }, 1000);
      },
      (error) => {
        this.showToast('top-right', 'danger', error.message || 'Something bad happened');
      },
    );
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.firstForm.patchValue({ logo: file });
    this.firstForm.get('logo').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getInstitute(id: any) {
    this.api.getInstitute(id).subscribe((data: any) => {
      this.myInstitute = data;
      // console.log('myInstitute==========>', this.myInstitute);
      // console.log('myInstitute==========>', this.myInstitute.institute.basicInfo.name);

      this.firstForm.patchValue({
        name: this.myInstitute.institute.basicInfo.name,
        logo: this.myInstitute.institute.basicInfo.logo,
      });

      this.secondForm.patchValue({
        instituteContact: this.myInstitute.institute.basicInfo.instituteContact,
        address: {
          addressLine: this.myInstitute.institute.address.addressLine,
          locality: this.myInstitute.institute.address.locality,
          state: this.myInstitute.institute.address.state,
          city: this.myInstitute.institute.address.city,
          pincode: this.myInstitute.institute.address.pincode,
        },
      });

      this.thirdForm.patchValue({
        category: this.myInstitute.institute.category,
        // instituteMetaTag: this.myInstitute.institute.metaTag,
      });

      this.thirdForm.get('instituteMetaTag').setValue([this.myInstitute.institute.metaTag[0]]);
      this.myInstitute.institute.metaTag.forEach((tag, i) => {
        if (i !== 0) {
          this.instituteMetaTag.push(this.fb.control(this.myInstitute.institute.metaTag[i]));
        }
      });
    });
  }

  getCountries() {
    this.country.allCountries().subscribe(
      (data) => {
        this.countryInfo = data.Countries;
        this.stateInfo = this.countryInfo[100].States;
        this.cityInfo = this.stateInfo[0].Cities;
        // console.log(this.stateInfo[0]);
      },
      (err) => {
        // console.log(err);
      },
      () => {
        // console.log('complete');
      },
    );
  }

  onChangeState(stateValue: any) {
    // console.log(stateValue);
    this.cityInfo = this.stateInfo[stateValue].Cities;
  }

  get instituteMetaTag() {
    return this.thirdForm.get('instituteMetaTag') as FormArray;
  }

  addMetaTag() {
    this.instituteMetaTag.push(this.fb.control(''));
  }

  removeMetaTag() {
    this.instituteMetaTag.removeAt(this.instituteMetaTag.length - 1);
  }

  get first() {
    return this.firstForm.controls;
  }

  get second() {
    return this.secondForm.controls;
  }

  get third() {
    return this.thirdForm.controls;
  }

  firstFormSubmit() {
    this.firstForm.markAsDirty();
    this.institute.name = this.firstForm.value.name;
    this.institute.logo = this.firstForm.value.logo;
    // console.log(this.first.logo.errors);
    this.stepper.next();
    // console.log('firstForm=>', this.institute);
  }

  secondFormSubmit() {
    this.secondForm.markAsDirty();
    this.institute.instituteContact = this.secondForm.value.instituteContact;
    this.institute.address = this.secondForm.value.address;
    this.stepper.next();
    // console.log('sec form=>', this.institute);
  }

  thirdFormSubmit() {
    this.thirdForm.markAsDirty();
    this.institute.category = this.thirdForm.value.category;
    this.institute.instituteMetaTag = this.thirdForm.value.instituteMetaTag;
    // console.log(this.institute);

    if (this.edit === 'true') {
      this.api.updateInstitute(this.instituteId, this.institute).subscribe(
        (res) => {
          // console.log(res);
          this.showToast('top-right', 'success', 'Institute Updated Successfully');
          setTimeout(() => {
            this.router.navigate(['/pages/home']);
          }, 1000);
        },
        (error) => {
          this.showToast('top-right', 'danger', error.message || 'Something bad happened');
          // console.log(err);
        },
      );
    }

    // console.log(this.institute);
    if (!this.edit) {
      const orderDetails = {
        userId: this.user._id,
        userPhone: this.user._phone,
        userName: this.user.name,
        userEmail: this.user.email,
        amount: this.amount,
      };
      this.generateOrder(orderDetails);
    }

    // console.log('forth form =>', this.institute);
  }

  showToast(position: any, status: any, message: any) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  change(event) {
    // console.log(event.target.value);
  }
}
