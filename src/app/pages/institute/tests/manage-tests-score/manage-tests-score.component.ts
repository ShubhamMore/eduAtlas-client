import { NbToastrService } from '@nebular/theme';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-manage-tests-score',
  templateUrl: './manage-tests-score.component.html',
  styleUrls: ['./manage-tests-score.component.scss'],
})
export class ManageTestsScoreComponent implements OnInit {
  institute: any;
  instituteId: string;
  batches: any[] = [];
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

    this.getCourses(this.instituteId);
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.display = true;
    });
  }

  onSelectCourse(id: string) {
    this.courseId = id;
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  onSelectBatch(batchId: string) {
    this.batch = batchId;
    this.getTests(this.instituteId, batchId);
  }

  createTestScore(id: any) {
    this.router.navigate([`/pages/institute/test/add-test-score/${this.instituteId}`], {
      queryParams: { test: id },
    });
  }

  edit(id: string) {
    this.router.navigate([`/pages/institute/test/add-test-score/${this.instituteId}/edit`], {
      queryParams: { test: id, edit: 'true' },
    });
  }
  getTests(instituteId: any, batchId: any) {
    this.api.getTestByBatch({ instituteId: instituteId, batchId: batchId }).subscribe(
      (res: any) => {
        this.tests = res;
      },
      (err) => {
        this.showToast('top right', 'danger', err.err.message);
      },
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
