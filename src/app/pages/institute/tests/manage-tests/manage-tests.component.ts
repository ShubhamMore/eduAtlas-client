import { NbToastrService } from '@nebular/theme';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-manage-tests',
  templateUrl: './manage-tests.component.html',
  styleUrls: ['./manage-tests.component.scss'],
})
export class ManageTestsComponent implements OnInit {

  instituteId: string;

  display: boolean;
  tests: any = {};
  months: string[] = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.tests.unmarked = [];
    this.tests.marked = [];
    this.display = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap, this.instituteId);
    // this.getTests({ instituteId: this.instituteId });
  }



  createTest() {
    this.router.navigate([`/pages/institute/test/create-test/${this.instituteId}`], {
      queryParams: {},
    });
  }

  edit(id: string) {
    this.router.navigate([`/pages/institute/test/create-test/${this.instituteId}/edit`], {
      queryParams: { test: id, edit: 'true' },
    });
  }

  score(id: string, batchId: string) {
    this.router.navigate([`/pages/institute/test/add-test-score/${this.instituteId}`], {
      queryParams: { test: id, batch: batchId },
    });
  }

  deleteTest(id: string, i: number) {
    this.api.deleteTest({ _id: id }).subscribe(
      (res: any) => {
        this.tests.splice(i, 1);
        this.showToast('top right', 'success', 'Test Deleted Successfully');
      },
      (err) => {
        this.showToast('top right', 'danger', err.err.message);
      },
    );
  }

  getTests(data: any) {
    this.api.getTestByInstitute(data).subscribe(
      (res: any) => {
        this.tests = res;
        this.display = true;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }


  getMonth(date: string) {
    const month = date.split('-')[1];
    return this.months[+month - 1];
  }

  getDay(date: string) {
    return date.split('-')[2];
  }
}
