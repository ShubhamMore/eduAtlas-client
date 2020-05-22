import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { MENU_ITEMS } from '../../../pages-menu';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'ngx-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss'],
})
export class ManageStudentsComponent implements OnInit {
  institute: any;
  form: FormGroup;

  courses: any[];
  course: string;

  batches: any[];

  students = [];
  routerId: string;

  constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit() {
    this.students = [];
    this.course = '';
    this.form = new FormGroup({
      course: new FormControl('', { validators: [] }),
      batch: new FormControl('', { validators: [] }),
    });
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getCourseTd(this.routerId);
  }

  getStudents(id: string, courseId: string, batchId: string) {
    this.api.getActiveStudents(id, courseId, batchId).subscribe((data: any) => {
      console.log(data);
      this.students = data;
    });
  }

  getCourseTd(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.courses = data.course;
    });
  }

  onSelectCourse(id: string) {
    if (id !== '') {
      this.course = id;
      // this.form.patchValue({ batch: '' });
      this.getStudents(this.routerId, id, id);
      // this.batches = this.institute.batch.filter((b: any) => b.course === id);
    }
  }

  // onSelectBatch(id: string) {
  //   console.log(id);
  //   this.getStudents(this.routerId, this.form.value.course, id);
  // }

  view(email: string) {
    this.router.navigate([`/pages/institute/view-student/${this.routerId}`], {
      queryParams: { email: email },
    });
  }

  edit(student: string) {
    // console.log('from manag edit => ', email);
    this.router.navigate([`/pages/institute/add-students/${this.routerId}`], {
      queryParams: { student, course: this.course, edit: 'true' },
    });
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
