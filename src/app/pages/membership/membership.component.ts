import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../pages-menu';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss'],
})
export class MembershipComponent implements OnInit {
  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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

  activate(amount: string, planType: string) {
    const gstCalculatedAmount = (+amount + +amount * 0.18).toFixed(2);
    this.paymentService.setPaymentDetails(gstCalculatedAmount, planType);
    this.router.navigate(['/pages/institute/add-institute'], { relativeTo: this.route });
  }
}
