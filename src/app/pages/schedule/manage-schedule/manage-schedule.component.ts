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
  routerId: string;
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
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getSchedules();
  }
  goAddSchedule() {
    this.router.navigate(['/pages/institute/add-schedule', this.routerId]);
  }

  getSchedules() {
    let param = new HttpParams();
    param = param.append('many', '1');
    param = param.append('instituteId', this.routerId);

    this.scheduleService.getSchedule(param).subscribe((res) => {
      this.schedules = res;
      // console.log('sch==>', this.schedules);
    });
  }
  view(code) {
    // console.log('batchCode', code);
    this.router.navigate(['/pages/institute/view-schedule', this.routerId], {
      queryParams: { batchCode: code },
    });
  }
  delete() {}
}
