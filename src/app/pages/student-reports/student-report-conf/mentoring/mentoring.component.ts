import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-mentoring',
  templateUrl: './mentoring.component.html',
  styleUrls: ['./mentoring.component.scss'],
})
export class MentoringComponent implements OnInit {
  instituteId: string;
  students: any[];
  display: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.display = false;
    this.students = [];
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.api.getStudentsByInstitute({ instituteId: this.instituteId }).subscribe(
      (res: any) => {
        this.students = res;
        console.log(res);
        this.display = true;
      },
      (err) => {},
    );
  }

  schedule(student: any) {
    this.router.navigate(['/pages/student-reports/schedule-mentoring/', this.instituteId], {
      queryParams: { student },
    });
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
}
