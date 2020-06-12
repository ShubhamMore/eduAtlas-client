import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.scss'],
})
export class ManageStudentsComponent implements OnInit {
  institute: any;
  form: FormGroup;
  noStudent: string;
  courses: any[];
  course: string;

  batches: any[];

  students = [];
  instituteId: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.students = [];
    this.course = '';
    this.form = new FormGroup({
      course: new FormControl('', { validators: [] }),
      batch: new FormControl('', { validators: [] }),
    });
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getCourseTd(this.instituteId);
    this.noStudent = 'Select Course';
  }

  getStudents(id: string, courseId: string, batchId: string) {
    this.api.getActiveStudents(id, courseId, batchId).subscribe((data: any) => {
      this.students = data;
      if (data.length === 0) {
        this.noStudent = 'No Record';
      }
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
      this.getStudents(this.instituteId, id, id);
    }
  }

  view(student: string) {
    this.router.navigate([`/pages/institute/view-student/${this.instituteId}`], {
      queryParams: { student, course: this.course },
    });
  }

  edit(student: string) {
    this.router.navigate([`/pages/institute/add-students/${this.instituteId}/edit`], {
      queryParams: { student, course: this.course, edit: 'true' },
    });
  }

  delete(eduAtlId: string, courseObjId: string) {
    const confirm = window.confirm('Are u sure, You want to delete this Student?');
    if (confirm) {
      this.api.deleteStudentCourse(courseObjId, eduAtlId).subscribe(() => {
        const i = this.students.findIndex(
          (student) => student.instituteDetails._id === courseObjId,
        );
        if (i !== -1) {
          this.students.splice(i, 1);
          this.showToaster('top-right', 'success', 'New Student Deleted Successfully!');
        }
      });
    }
  }

  showToaster(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
}
