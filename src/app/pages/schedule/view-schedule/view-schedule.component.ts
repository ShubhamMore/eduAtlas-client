import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {ScheduleService} from '../../../services/schedule/schedule.service';
import {Location} from '@angular/common';

@Component({
  selector: 'ngx-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.scss']
})
export class ViewScheduleComponent implements OnInit {
routerId: string;
batchCode:string;
batch = [{batchCode:'', instututeId:'', letter:'', recurrence:false, scheduleEnd:'',
          scheduleStart:'', teacher:'', topic:'', _id:'',
        institute:[{batch:[{batchCode:'', course:'', description:'', _id:''}]}]}];

  constructor(private active:ActivatedRoute, private router:Router, 
    private schduleService: ScheduleService, private location: Location) { }

  ngOnInit() {
    this.active.queryParams.subscribe(data => this.batchCode = data.batchCode);
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getSchedule(this.routerId, this.batchCode);
  }

  getSchedule(id, code){
    let param = new HttpParams();
     param = param.append('many', '0');
     param = param.append('instituteId', id);
     param = param.append('batchCode', code); 
     this.schduleService.getSchedule(param).subscribe( res => {
       this.batch = JSON.parse(JSON.stringify(res));
       console.log('bathc=> ', this.batch);
     },
      error => console.log(error));
  }
  back(){
    this.location.back();
  }

}
