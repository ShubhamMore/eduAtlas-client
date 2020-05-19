import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../../../../pages-menu';
@Component({
  selector: 'ngx-manage-receipt',
  templateUrl: './manage-receipt.component.html',
  styleUrls: ['./manage-receipt.component.scss'],
})
export class ManageReceiptComponent implements OnInit {
  receipts = { businessName: '', address: '', fee: '', gstNumber: '', termsAndCondition: '' };
  routerId: string;
  constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getReceipts(this.routerId);
  }
  getReceipts(id) {
    this.api.getReceipt(id).subscribe((data) => {
      this.receipts = JSON.parse(JSON.stringify(data));
    });
  }

  edit(id: string) {
    this.router.navigate([`/pages/institute/branch-config/add-receipt/${this.routerId}`], {
      queryParams: { recieptId: id, edit: true },
    });
  }
  delete(id: string) {
    this.api.deleteReceipt(id).subscribe(
      () => {
        this.receipts = null;
      },
      (err) => console.error(err),
    );
    // const i = this.receipts.reciepts.findIndex(e => e.id == id)
    // if(i !== -1){
    // this.receipts.splice(i,1);
    // }
  }
  onClick() {
    this.router.navigate([`/pages/institute/branch-config/add-receipt/${this.routerId}`]);
  }
}
