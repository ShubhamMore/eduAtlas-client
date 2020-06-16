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

  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.display = false;
    this.courseId = 'all';
    this.batches = [];
    this.students = [];
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.getCourses(this.instituteId);
    this.onSelectCourse('all');
  }

  viewStudentAttendance(id: any) {
    this.router.navigate(['/pages/institute/view-attandance/' + this.instituteId], {
      queryParams: { student: id },
    });
  }

  addAttendance() {
    this.router.navigate(['/pages/institute/add-attandance/' + this.instituteId]);
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.display = true;
    });
  }

  onSelectCourse(id: string) {
    this.courseId = id;
    if (id === 'all') {
      this.getStudents({ instituteId: this.instituteId });
    } else {
      this.batchId = 'all';
      this.batches = this.institute.batch.filter((b: any) => b.course === id);
    }
  }

  onSelectBatch(id: string) {
    if (id === 'all') {
      this.getStudents({ instituteId: this.instituteId, courseId: this.courseId });
    } else {
      this.getStudents({ instituteId: this.instituteId, courseId: this.courseId, batchId: id });
    }
  }

  getStudents(data: any) {
    this.api.getStudentsByInstitute(data).subscribe((res: any) => {
      this.students = res;
    });
  }

  showToaster(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
}
