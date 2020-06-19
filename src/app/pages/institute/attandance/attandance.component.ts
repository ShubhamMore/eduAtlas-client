import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.scss'],
})
export class AttandanceComponent implements OnInit {
  instituteId: string;
  institute: any;
  batchId: string;
  courseId: string;
  batches: any[];
  students: any[];
  display: boolean;
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
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
  ) { }

  ngOnInit() {
    this.display = false;
    this.courseId = 'all';
    this.batches = [];
    this.students = [];
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.getAttendanceByInstitute();
  }

  viewStudentAttendance(id: any) {
    this.router.navigate(['/pages/institute/view-attandance/' + this.instituteId], {
      queryParams: { student: id },
    });
  }

  markAttendance() {
    this.router.navigate(['/pages/institute/add-attandance/' + this.instituteId]);
  }


  getAttendanceByInstitute() {
    this.api.getAttendanceByInstitute({ 'instituteId': this.instituteId }).subscribe((res: any) => {
      this.students = res;
    });
  }

  showToaster(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
  getMonth(date: string) {
    const month = date.split('-')[1];
    return this.months[+month - 1];
  }

  getDay(date: string) {
    return date.split('-')[2];
  }
}
