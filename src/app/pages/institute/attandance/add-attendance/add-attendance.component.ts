import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { AttributeMarker } from '@angular/compiler/src/core';
import { AttendanceService } from '../../../../services/attendance.service';

@Component({
  selector: 'ngx-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss'],
})
export class AddAttendanceComponent implements OnInit {
  attandanceform: FormGroup;
  instituteId: string;
  attendanceId: string;
  date: number;
  courses: any[];
  batches: any[];
  availableBatches: any[];
  attendanceBasicDetail: any;
  students: any[];
  attendance: any[];
  markAllCheckBox: boolean = true;
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
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit() {
    this.date = Date.now();
    this.courses = [];
    this.batches = [];
    this.students = [];
    this.availableBatches = [];
    this.attendance = [];
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((param: Params) => {
      var courseId = param.courseId;
      var batchId = param.batchId;

      this.attendanceBasicDetail = this.attendanceService.getAttendanceData();
      this.getStudentsByBatch(courseId, batchId);
    });

  }

  getStudentsByBatch(courseId, batchId) {
    this.api.getStudentsByBatch(this.instituteId, courseId, batchId).subscribe((res: any) => {
      if (res) {
        this.attendance = res.map((student) => {
          return {
            'studentId': student._id,
            'studentName': student.basicDetails.name,
            'studentRollNo': student.instituteDetails.rollNumber,
            'attendanceStatus': false
          }
        });
      }
    }, (err) => {

    })
  }

  markAllAttendance() {
    this.attendance.map((attendance) => {
      attendance.attendanceStatus = this.markAllCheckBox;
      return attendance;
    });
    this.markAllCheckBox = !this.markAllCheckBox;
  }
  markSingleAttendance(isPresent, i) {
    this.attendance[i].attendanceStatus = isPresent;
  }
  constructDate(dateInMillisecond: number) {
    const date = new Date(dateInMillisecond);
    return `${date.getFullYear()}-${this.appendZero(date.getMonth() + 1)}-${this.appendZero(
      date.getDate(),
    )}`;
  }
  appendZero(n: number): string {
    if (n < 10) {
      return '0' + n;
    }
    return '' + n;
  }

  markAttendance(event: any, studentId: string, index: number) {
    if (event.target.checked) {
      this.attendance[index].attendanceStatus = true;
    } else {
      this.attendance[index].attendanceStatus = false;
    }
  }

  saveAttendance() {
    var request = {
      'scheduleId': this.attendanceBasicDetail._id,
      'lectureId': this.attendanceBasicDetail.days._id,
      'date': this.attendanceBasicDetail.days.date,
      'courseId': this.attendanceBasicDetail.courseId,
      'batchId': this.attendanceBasicDetail.batchId,
      'instituteId': this.instituteId,
      'attendance': this.attendance
    }
    this.api.addAttendance(request).subscribe((res) => {
      this.showToaster('top-right', 'success', 'Attendance Added Successfully!')
    }, (err) => {
      this.showToaster('top-right', 'danger', err.error.message);
    })
  }
  showToaster(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }

  onSubmit() {
    const attendanceRequest = {
      date: this.attandanceform.get('date').value,
      instituteId: this.instituteId,
      courseId: this.attandanceform.get('courseId').value,
      batchId: this.attandanceform.get('batchId').value,
      attendance: this.attendance,
    };
    this.api.addAttendance(attendanceRequest).subscribe(
      (res) => {
        this.attandanceform.reset();
        this.attandanceform.get('date').setValue(this.constructDate(this.date));
        this.students = [];
        this.attendance = [];
        this.showToaster('top-right', 'success', 'Attendance Updated Successfully');
      },
      (err) => this.showToaster('top-right', 'danger', err.error.message),
    );
  }
  getMonth(date: string) {
    const month = date.split('-')[1];
    return this.months[+month - 1];
  }

  getDay(date: string) {
    return date.split('-')[2];
  }

}
