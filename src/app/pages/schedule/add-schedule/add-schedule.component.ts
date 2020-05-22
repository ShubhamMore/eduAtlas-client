import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { NbToastrService } from '@nebular/theme';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit {
  schedule: FormGroup;
  routerId: string;
  submitted = false;
  batches = { batch: [{ _id: '', course: '', batchCode: '', description: '' }] };
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private active: ActivatedRoute,
    private scheduleService: ScheduleService,
    private toasterService: NbToastrService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.getBatches(this.active.snapshot.paramMap.get('id'));
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.schedule = this.fb.group({
      instituteId: [this.routerId],
      scheduleStart: ['', Validators.required],
      scheduleEnd: ['', Validators.required],
      batchCode: ['', Validators.required],
      topic: [''],
      teacher: ['', Validators.required],
      recurrence: [],
    });
  }
  get f() {
    return this.schedule.controls;
  }
  getBatches(id) {
    this.api.getBatches(id).subscribe((data) => {
      this.batches = JSON.parse(JSON.stringify(data));
      // console.log('my Batch =>', this.batches);
    });
  }

  recurrance(check: boolean) {
    this.schedule.patchValue({
      recurrence: check,
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.schedule.invalid) {
      return;
    }
    // console.log('onSubmit => ', this.schedule.value);
    const routerId = this.active.snapshot.paramMap.get('id');
    this.scheduleService.addSchedule(this.schedule.value).subscribe(
      (res) => {
        // console.log('from api =>', res);
        this.showToast('top-right', 'success');
      },
      (error) => console.error(error),
    );
  }

  showToast(position, status) {
    this.toasterService.show(status || 'Success', 'Schedule Added Successfully', {
      position,
      status,
    });
  }
  back() {
    this.location.back();
  }
}
