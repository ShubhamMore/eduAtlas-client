import { AuthService } from './../../services/auth-services/auth.service';
import { ApiService } from './../../services/api.service';
import { environment } from './../../../environments/environment';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { PaymentService } from './../../services/payment.service';
import { Location } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  options: any;
  razorPay: any;
  placedOrderReceipt: any;
  @Input() instituteId: string;
  paymentDetails: any;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private toastrService: NbToastrService,
    private paymentService: PaymentService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.instituteId = param.id;
      this.user = this.authService.getUser();

      this.paymentDetails = this.paymentService.getPaymentDetails();
      if (!this.instituteId || !this.paymentDetails || !this.user) {
        this.showToast('top-right', 'danger', 'Invalid Payment');
        this.back();
        return;
      }

      this.options = {
        key: environment.razorpayKeyId, // Enter the Key ID generated from the Dashboard
        amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'eduatlas',
        description: 'Test Transaction',
        image: '../../../assets/img/EA FAVI.png',
        // tslint:disable-next-line: max-line-length
        order_id: '', // This is a sample Order ID. Pass the `id` obtained in the response of Step 1 order_9A33XWu170gUtm
        handler: (response: any) => {
          // console.log(response);
          this.verifyPayment(response);
        },
        modal: {
          ondismiss: () => {
            this.deleteOrder();
            this.deleteInstitute();
            this.back();
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

      this.getInstitute(this.instituteId);
    });
  }

  getInstitute(id: any) {
    this.api.getInstitute(id).subscribe(
      (res: any) => {
        const orderDetails = {
          userId: this.user._id,
          userPhone: this.user.phone,
          userName: this.user.name,
          userEmail: this.user.email,
          amount: this.paymentDetails.amount,
          planType: this.paymentDetails.planType,
        };
        this.generateOrder(orderDetails);
      },
      (err: any) => {
        this.showToast('top-right', 'danger', 'Invalid Institute');
        this.back();
      },
    );
  }

  pay() {
    this.razorPay.open();
  }

  generateOrder(order: any) {
    this.paymentService.generateOrder(order).subscribe(
      (res: any) => {
        // console.log(res);
        this.placedOrderReceipt = res.receipt;
        // this.options.amount = res.order.amount;
        this.options.amount = '1';
        this.options.order_id = res.order.id;
        this.options.currency = res.order.currency;
        this.options.prefill.name = this.user.name;
        this.options.prefill.email = this.user.email;
        this.options.prefill.contact = this.user.phone;
        this.razorPay = new Razorpay(this.options);
        this.pay();
      },
      (err) => {
        // console.log(err);
        this.showToast('top-right', 'danger', err.error.message || 'Order Generation Failed');
      },
    );
  }

  verifyPayment(payment: any) {
    this.paymentService.verifyPayment(payment, this.placedOrderReceipt).subscribe(
      (res: any) => {
        // console.log(res);
        this.showToast('top-right', 'success', 'Payment Verified Successfully');
        setTimeout(() => {
          // this.addInstituteAfterPayment(this.institute, res.orderId, res.receiptId);
          this.activateInstitute(this.instituteId, res.orderId, res.receiptId);
        }, 1000);
      },
      (err: any) => {
        // console.log(err);
        this.showToast('top-right', 'danger', err.error.message || 'Payment Verification Failed');
      },
    );
  }

  activateInstitute(id: string, orderId: string, ReceiptId: string) {
    const paymentDetails = {
      amount: this.paymentDetails.amount,
      planType: this.paymentDetails.planType,
      orderId: orderId,
      receiptId: ReceiptId,
    };
    this.api.activateInstitute(id, paymentDetails).subscribe(
      (data) => {
        // this.user = data;
        this.showToast('top-right', 'success', 'Institute Activated Successfully');
        setTimeout(() => {
          this.router.navigate(['/pages/home'], { relativeTo: this.route });
        }, 1000);
      },
      (error) => {
        this.showToast('top-right', 'danger', error.message || 'Something bad happened');
      },
    );
  }

  deleteOrder() {
    this.paymentService.deleteOrder(this.placedOrderReceipt._id).subscribe(
      (res: any) => {
        this.placedOrderReceipt = null;
        // console.log(res);
      },
      (err) => {
        // console.log(err);
      },
    );
  }

  deleteInstitute() {
    this.api.deleteInstitute(this.instituteId).subscribe(
      (res: any) => {
        this.instituteId = null;
      },
      (err: any) => {},
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.location.back();
  }
}
