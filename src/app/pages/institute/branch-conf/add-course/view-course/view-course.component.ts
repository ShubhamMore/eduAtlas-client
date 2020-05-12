import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { courseData } from '../../../../../../assets/dataTypes/dataType';
@Component({
  selector: 'ngx-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss'],
})
export class ViewCourseComponent implements OnInit {
  courses: courseData;
  routerId: number;
  constructor(private api: ApiService, private active: ActivatedRoute) {}

  ngOnInit() {
    this.routerId = +this.active.snapshot.paramMap.get('id');
    console.log(this.active.snapshot.paramMap);
    this.api.getCourse(this.routerId).subscribe(
      (data) => {
        console.log(data);
        this.courses = data;
      },
      (err) => console.log(err)
    );
  }
}
