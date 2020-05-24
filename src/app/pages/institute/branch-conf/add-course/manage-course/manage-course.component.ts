import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { MENU_ITEMS } from '../../../../pages-menu';

@Component({
  selector: 'ngx-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss'],
})
export class ManageCourseComponent implements OnInit {
  display: boolean = false;
  courses = {
    course: [
      { courseCode: '', discription: '', fees: '', gst: '', name: '', totalFee: '', _id: '' },
    ],
  };
  institutes: any[] = [];
  institute: any[] = [];
  instituteId: string;

  constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit() {
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.getCourses(this.instituteId);
  }

  getCourses(id: any) {
    this.api.getCourses(id).subscribe((data: any) => {
      this.courses = data;
    });
  }

  delete(id: any) {
    let param = new HttpParams();
    param = param.append('instituteId', this.instituteId);
    param = param.append('courseId', id);
    this.api.deleteCourse(param).subscribe(
      (res) => {},
      (error) => console.error(error),
    );

    const i = this.courses.course.findIndex((e) => e._id === id);
    if (i !== -1) {
      this.courses.course.splice(i, 1);
    }
  }

  edit(id: string) {
    this.router.navigate([`/pages/institute/branch-config/add-courses/${this.instituteId}`], {
      queryParams: { courseId: id, edit: true },
    });
  }

  onClick() {
    this.router.navigate(['/pages/institute/branch-config/add-courses/', this.instituteId]);
  }
}
