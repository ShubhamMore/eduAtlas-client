import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss'],
})
export class ECommerceComponent implements OnInit {
  myInstitute: any;

  students: any[] = [];
  display: boolean;
  instituteId: string;

  studentReq: any[] = [];

  classes = [];
  studentPendingFee = [];

  study = [];
  constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit() {
    this.display = false;

    this.instituteId = this.active.snapshot.paramMap.get('id');

    MENU_ITEMS[11].link = '/pages/institute/manage-schedule/' + this.instituteId;
    MENU_ITEMS[12].link = '/pages/institute/attandance/' + this.instituteId;
    MENU_ITEMS[2].link = '/pages/dashboard/' + this.instituteId;
    MENU_ITEMS[5].children[0].link = '/pages/institute/add-students/' + this.instituteId;
    MENU_ITEMS[5].children[1].link = '/pages/institute/manage-students/' + this.instituteId;
    MENU_ITEMS[5].children[2].link = '/pages/institute/pending-students/' + this.instituteId;
    MENU_ITEMS[4].children[0].link =
      '/pages/institute/branch-config/manage-course/' + this.instituteId;
    MENU_ITEMS[4].children[1].link =
      '/pages/institute/branch-config/manage-batch/' + this.instituteId;
    MENU_ITEMS[4].children[2].link =
      '/pages/institute/branch-config/manage-discount/' + this.instituteId;
    MENU_ITEMS[4].children[3].link =
      '/pages/institute/branch-config/manage-receipt/' + this.instituteId;
    MENU_ITEMS[4].children[4].link =
      '/pages/institute/branch-config/manage-role-management/' + this.instituteId;
    MENU_ITEMS[4].children[4].children[0].link =
    '/pages/institute/branch-config/add-employee/' + this.instituteId;
    MENU_ITEMS[4].children[4].children[1].link =
    '/pages/institute/branch-config/manage-employee/' + this.instituteId;
    MENU_ITEMS[6].children[0].link = '/pages/communication/announcements/' + this.instituteId;
  }
 
  getInstitute(id: string) {
    this.api.getInstitute(id).subscribe((res) => {
      this.myInstitute = res;

      MENU_ITEMS[1].hidden = true;
      MENU_ITEMS[2].hidden = false;
      MENU_ITEMS[3].hidden = false;
      MENU_ITEMS[4].hidden = false;
      MENU_ITEMS[5].hidden = false;
      MENU_ITEMS[6].hidden = false;
      // MENU_ITEMS[7].hidden = false;
      // MENU_ITEMS[8].hidden = false;
      // MENU_ITEMS[9].hidden = false;
      // MENU_ITEMS[10].hidden = false;
      MENU_ITEMS[11].hidden = false;
      MENU_ITEMS[12].hidden = false;

      this.display = true;
    });
  }

  getStudents(id: string) {
    this.api.getStudents(id).subscribe(
      (res: any) => {
        this.students = res;
      },
      (err) => console.error(err),
    );
  }
}
