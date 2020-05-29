import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss'],
})
export class ViewScheduleComponent implements OnInit {
  instituteId: string;
  schedule: any;
  display: boolean;

  constructor(
    private active: ActivatedRoute,
    private scheduleService: ScheduleService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.display = false;
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((param: Params) => {
      const schedule = param.schedule;
      this.getSchedule(schedule);
    });
  }

  getSchedule(id: string) {
    console.log(id);
    this.scheduleService.getSchedule(id).subscribe(
      (res: any) => {
        this.schedule = res;
        this.display = true;
      },
      (error) => console.error(error),
    );
  }

  back() {
    this.location.back();
  }
}
