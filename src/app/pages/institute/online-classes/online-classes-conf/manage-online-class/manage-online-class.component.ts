import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../services/api.service';

@Component({
  selector: 'ngx-manage-online-class',
  templateUrl: './manage-online-class.component.html',
  styleUrls: ['./manage-online-class.component.scss'],
})
export class ManageOnlineClassComponent implements OnInit {
  institute: any;
  instituteId: string;
  batches: any[] = [];
  display: boolean;
  courseId: string;

  constructor(private active: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.getCourses(this.instituteId);
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.display = true;
    });
  }

  onSelectCourse(id: string) {
    this.courseId = id;
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  onSelectBatch(batchId: string) {

    this.getUpcomingClasses(this.instituteId, batchId);
  }

  getUpcomingClasses(instituteId, batchId) {
    this.api.getMeetingByBatch({ 'instituteId': instituteId, 'batchId': batchId }).subscribe((res) => {
      
    }, (err) => {

    })
  }
}
