import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { MENU_ITEMS } from '../../../../pages-menu';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ngx-manage-discount',
  templateUrl: './manage-discount.component.html',
  styleUrls: ['./manage-discount.component.scss'],
})
export class ManageDiscountComponent implements OnInit {
  discounts = { discount: [{ discountCode: '', description: '', _id: '', amount: '' }] };
  routerId: string;
  constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getDiscounts(this.routerId);
  }
  getDiscounts(id) {
    this.api.getDiscounts(id).subscribe(
      (data) => {
        // console.log(data);
        const dis = JSON.stringify(data);
        this.discounts = JSON.parse(dis);
        // console.log('Discount' + this.discounts);
      },
      (err) => console.error(err),
    );
  }

  edit(id: string) {
    this.router.navigate([`/pages/institute/branch-config/add-discount/${this.routerId}`], {
      queryParams: { discountId: id, edit: true },
    });
  }

  delete(id: string) {
    let param = new HttpParams();
    param = param.append('instituteId', this.routerId);
    param = param.append('discountId', id);
    this.api.deleteDiscount(param).subscribe(
      //   () => console.log('successfully deleted'),
      (err) => console.error(err),
    );
    const i = this.discounts.discount.findIndex((e) => e._id === id);
    if (i !== -1) {
      this.discounts.discount.splice(i, 1);
    }
  }

  onClick() {
    this.router.navigate(['/pages/institute/branch-config/add-discount/', this.routerId]);
  }
}
