import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.scss'],
})
export class AddAttendanceComponent implements OnInit {
  attandanceform: FormGroup;
  instituteId: string;
  date: number;
  courses: any[];
  batches: any[];
  availableBatches: any[];
  students: any[];
  attendance: any[];

  constructor(
    private api: ApiService,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.date = Date.now();
    this.courses = [];
    this.batches = [];
    this.students = [];
    this.availableBatches = [];
    this.attendance = [];
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.getCourseTd(this.instituteId);
    this.attandanceform = this.fb.group({
      courseId: ['', Validators.required],
      batchId: ['', Validators.required],
      allStudentsPresent: [],
      date: [this.constructDate(this.date), Validators.required],
    });
  }

  onSelectCourse(id: string) {
    // Find Batches of Selected Course
    this.students = [];
    this.attandanceform.get('batchId').setValue(null);
    this.availableBatches = this.batches.filter((b: any) => b.course === id);

    this.getStudents();
  }
  onSelectBatch() {
    this.getStudents();
  }
  getStudents() {
    this.students = [];
    this.attendance = [];
    if (
      this.attandanceform.get('batchId').value &&
      this.attandanceform.get('courseId').value &&
      this.attandanceform.get('date').value
    ) {
      const studentsRequest = {
        date: this.attandanceform.get('date').value,
        instituteId: this.instituteId,
        courseId: this.attandanceform.get('courseId').value,
        batchId: this.attandanceform.get('batchId').value,
      };
      this.api.getStudentsAttendance(studentsRequest).subscribe((data: any) => {
        this.students = data;
        this.students.sort((student1, student2) => {
          if (+student1.studentRollNo >= +student2.studentRollNo) {
            return 1;
          } else {
            return -1;
          }
        });
        this.students.map(function (student) {
          student.attendanceStatus = student.attendanceStatus ? true : false;
          return student;
        });
        this.students.forEach((student) => {
          const attendance = {
            studentId: student.studentId,
            attendanceStatus: student.attendanceStatus ? true : false,
          };
          this.attendance.push(attendance);
        });
      });
    }
  }
  getCourseTd(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.batches = data.batch;
      this.courses = data.course;
    });
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
}
