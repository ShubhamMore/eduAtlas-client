import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../pages-menu';
import { AuthService } from '../../services/auth-services/auth.service';
import { RoleAssignService } from '../../services/role/role-assign.service';

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
  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private authService: AuthService,
    private roleService: RoleAssignService,
  ) {}

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
      '/pages/institute/branch-config/manage-employee/' + this.instituteId;
    MENU_ITEMS[6].children[0].link = '/pages/communication/announcements/' + this.instituteId;
    MENU_ITEMS[7].children[0].link = '/pages/institute/test/manage-test/' + this.instituteId;
    MENU_ITEMS[7].children[1].link = '/pages/institute/test/manage-test-score/' + this.instituteId;
    MENU_ITEMS[8].children[3].link = '/pages/student-reports/mentoring/' + this.instituteId;
    MENU_ITEMS[8].children[4].link = '/pages/student-reports/manage-ptms/' + this.instituteId;
    '/pages/institute/online-classes/manage-class/' + this.instituteId;
    MENU_ITEMS[13].children[0].link =
      '/pages/institute/online-classes/settings/' + this.instituteId;
    MENU_ITEMS[13].children[1].link =
      '/pages/institute/online-classes/create-class/' + this.instituteId;
    MENU_ITEMS[13].children[2].link =
      '/pages/institute/online-classes/manage-class/' + this.instituteId;

    this.getStudents(this.instituteId);
    this.getInstitute(this.instituteId);
  }

  getInstitute(id: string) {
    this.api.getInstitute(id).subscribe((res: any) => {
      this.myInstitute = res;
      this.roleService.assignRoles(this.authService.getUser().role);
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
