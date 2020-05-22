import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../pages-menu';
import { Router } from '@angular/router';

// declare var Razorpay: any;
@Component({
  selector: 'ngx-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
})
export class MembershipComponent implements OnInit {
  routerId: string;

  options = {
    key: '', // Enter the Key ID generated from the Dashboard
    amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'eduatlas',
    description: 'Test Transaction',
    image: 'https://example.com/your_logo',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1 order_9A33XWu170gUtm
    handler: (response) => {
      console.log(response);
      this.verifyPayment(response);
    },
    modal: {
      ondismiss: () => {
        console.log('Checkout form closed');
      },
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#ffd500',
    },
  };

  // rzp1 = new Razorpay(this.options);

  constructor(private router: Router, private paymentService: PaymentService) {}

  ngOnInit() {
    MENU_ITEMS[1].hidden = false;
    MENU_ITEMS[2].hidden = true;
    MENU_ITEMS[4].hidden = true;
    MENU_ITEMS[5].hidden = true;
    MENU_ITEMS[6].hidden = true;
    MENU_ITEMS[7].hidden = true;
    MENU_ITEMS[8].hidden = true;
    MENU_ITEMS[9].hidden = true;
    MENU_ITEMS[10].hidden = true;
  }

  pay() {
    // this.rzp1.open();
  }

  generateOrder() {
    this.paymentService.generateOrder('', {}).subscribe(
      (res: any) => {
        console.log(res);
        this.options.amount = res.amount;
        this.options.order_id = res.id;
        this.options.currency = res.currency;
        // this.rzp1 = new Razorpay(this.options);
        this.pay();
      },
      (err) => {
        console.log(err);
      },
    );
  }

  verifyPayment(data) {
    this.paymentService.verifyPayment('', data).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  onClick() {
    this.router.navigate(['/pages/institute/add-institute']);
  }
}
