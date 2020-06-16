import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss'],
})
export class ViewAttendanceComponent implements OnInit {
  display: boolean;
  instituteId: any;
  studentId: string;
  attendance: any[];
  present = 0;
  absent = 0;
  total = 0;
  courses: any[];
  noAttendanceData: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.display = false;
    this.noAttendanceData = 'Select Course';
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((data) => {
      this.studentId = data.student;
    });
    this.attendance = [];
    this.courses = [];
    if (this.studentId) {
      this.getCourses(this.instituteId, this.studentId);
    } else {
      this.location.back();
    }
  }

  getCourses(instituteId: any, studentId: any) {
    console.log({ _id: studentId, instituteId });
    this.api.getCoursesOfStudentByInstitute({ _id: studentId, instituteId }).subscribe(
      (res: any) => {
        this.courses = res._id;
        console.log(res);
        this.display = true;
      },
      (err: any) => {
        console.log(err);
      },
    );
  }

  onSelectCourse(id: any) {
    if (id !== '') {
      console.log(id);
      this.getAttendance(id);
    }
  }

  getAttendance(courseId: any) {
    this.api
      .getStudentAttendanceByCourse({
        studentId: this.studentId,
        instituteId: this.instituteId,
        courseId,
      })
      .subscribe(
        (res: any[]) => {
          this.total = res.length;
          this.present = 0;
          this.absent = 0;
          this.attendance = [];
          if (this.total === 0) {
            this.noAttendanceData = 'No Attendance Found';
          } else {
            res.sort((a1, a2) => {
              if (new Date(a1.date).getTime() >= new Date(a2.date).getTime()) {
                return 1;
              } else {
                return -1;
              }
            });

            res.forEach((atten: any) => {
              const newAtten = {
                date: this.getScheduleDate(atten.date),
                status: atten.attendance.attendanceStatus,
              };
              this.attendance.push(newAtten);
              if (newAtten.status) {
                this.present += 1;
              } else {
                this.absent += 1;
              }
            });
            console.log(this.attendance, this.present, this.absent, this.total);
          }
        },
        (err: any) => {
          console.log(err);
        },
      );
  }

  getScheduleDate(date: any) {
    const d = date.split('-');
    return `${d[2]}-${d[1]}-${d[0]}`;
  }
}
