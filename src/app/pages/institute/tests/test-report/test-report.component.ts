import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss'],
})
export class TestReportComponent implements OnInit {
  
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
    console.log(this.route.snapshot.paramMap, this.instituteId);
    this.getCourses(this.instituteId);
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      console.log(data);
      this.display = true;
    });
  }

  onSelectCourse(id: string) {
    this.courseId = id;
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  onSelectBatch(batchId: string) {
    this.batch = batchId;
    this.getTestsForReports(this.instituteId, batchId);
  }

  viewScore(testId,batchId) {
    this.router.navigate([`/pages/institute/test/view-report/${this.instituteId}`], {
      queryParams: {testId},
    });
  }

  getTestsForReports(instituteId: any, batchId: any) {
    this.api.getTestsForReports({ instituteId: instituteId, batchId: batchId }).subscribe(
      (res: any) => {
        this.tests = res;
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
