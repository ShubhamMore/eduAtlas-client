import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { MENU_ITEMS } from '../../../../pages-menu';
@Component({
  selector: 'ngx-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  student: any;
  routerId: string;
  studentEduId: string;
  courseId: string;

  constructor(private api: ApiService, private active: ActivatedRoute) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');

    this.active.queryParams.subscribe((data) => {
      this.studentEduId = data.student;
      this.courseId = data.course;
    });

    this.getStudent(this.studentEduId, this.routerId, this.courseId);
  }
  getStudent(student: string, institute: string, course: string) {
    this.api
      .getOneStudentByInstitute({ eduatlasId: student, instituteId: institute, courseId: course })
      .subscribe((data) => {
        this.student = data[0];
      });
  }
}
