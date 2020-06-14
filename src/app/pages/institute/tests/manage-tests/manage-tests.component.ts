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
  institute: any;
  instituteId: string;
  batches: any[] = [];
  courses: any[] = [];
  display: boolean;
  courseId: string;
  batch: string;

  tests: any[];

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.display = false;
    this.tests = [];
    this.instituteId = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap, this.instituteId);
    this.getCourses(this.instituteId);
    this.getTests({ instituteId: this.instituteId });
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      // console.log(data);
      this.institute = data;
      if (data) {
        this.courses = this.institute.course;
      }
    });
  }

  onSelectCourse(id: string) {
    this.courseId = id;
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  onSelectBatch(batchId: string) {
    this.batch = batchId;
    this.getTests({ instituteId: this.instituteId, batchId: batchId });
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
}
