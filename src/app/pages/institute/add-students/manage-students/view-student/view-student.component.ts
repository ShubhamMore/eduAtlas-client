import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  student: any;
  instituteId: string;
  studentEduId: string;
  courseId: string;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.instituteId = this.route.snapshot.paramMap.get('id');

    this.route.queryParams.subscribe((data) => {
      this.studentEduId = data.student;
      this.courseId = data.course;
    });

    this.getStudent(this.studentEduId, this.instituteId, this.courseId);
  }
  getStudent(student: string, institute: string, course: string) {
    this.api
      .getOneStudentByInstitute({ eduatlasId: student, instituteId: institute, courseId: course })
      .subscribe((data) => {
        this.student = data[0];
      });
  }
}
