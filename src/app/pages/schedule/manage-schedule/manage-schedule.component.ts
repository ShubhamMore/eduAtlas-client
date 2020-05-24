import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ngx-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss'],
})
export class ManageScheduleComponent implements OnInit {
  instituteId: string;
  schedules = [
    {
      batchCode: '',
      course: '',
      instituteId: '',
      letter: '',
      recurrence: '',
      scheduleEnd: '',
      scheduleStart: '',
      teacher: '',
      topic: '',
    },
  ];

  constructor(
    private router: Router,
    private active: ActivatedRoute,
    private scheduleService: ScheduleService,
  ) {}

  ngOnInit() {
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.getSchedules();
  }

  goAddSchedule() {
    this.router.navigate(['/pages/institute/add-schedule', this.instituteId]);
  }

  getSchedules() {
    let param = new HttpParams();
    param = param.append('many', '1');
    param = param.append('instituteId', this.instituteId);

    this.scheduleService.getSchedule(param).subscribe((res: any) => {
      this.schedules = res;
    });
  }

  view(code: any) {
    this.router.navigate(['/pages/institute/view-schedule', this.instituteId], {
      queryParams: { batchCode: code },
    });
  }

  delete() {}
}
