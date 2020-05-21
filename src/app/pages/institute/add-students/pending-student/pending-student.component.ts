import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { MENU_ITEMS } from '../../../pages-menu';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ngx-pending-student',
  templateUrl: './pending-student.component.html',
  styleUrls: ['./pending-student.component.scss'],
})
export class PendingStudentComponent implements OnInit {
  institute: any;
  courses: any[];
  course: string;
  students = [];
  routerId: string;

  constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit() {
    this.students = [];
    this.course = '';
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getCourseTd(this.routerId);
  }

  getStudents(instituteId:string,courseId: string) {
    this.api.getPendingStudents(instituteId,courseId).subscribe((data:any) => {
      this.students = data;
    });
  }

  view(email: string) {
    // console.log('from pending ', email);
    this.router.navigate([`/pages/institute/view-student/${this.routerId}`], {
      queryParams: { email: email },
    });
  }

  edit(email: string) {
    // console.log('from manag edit => ', email);
    this.router.navigate([`/pages/institute/add-students/${this.routerId}`], {
      queryParams: { email: email, edit: 'true' },
    });
  }

  getCourseTd(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.courses = data.course;
    });
  }

  onSelectCourse(courseId: string) {
    this.course = courseId;
    this.getStudents(this.routerId, courseId);
  }

  delete(email: string, id: string) {
    let param = new HttpParams();
    param = param.append('instituteId', this.routerId);
    param = param.append('studentEmail', email);

    this.api.deleteStudent(param).subscribe(() => {
      // console.log('success delete');
    });
    const i = this.students.findIndex((e) => e._id === id);
    if (i !== -1) {
      this.students.splice(i, 1);
    }
  }
}
