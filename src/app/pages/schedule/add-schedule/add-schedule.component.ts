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
  instituteId: string;
  submitted = false;
  batches = { batch: [{ _id: '', course: '', batchCode: '', description: '' }] };
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private toasterService: NbToastrService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.getBatches(this.route.snapshot.paramMap.get('id'));
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.schedule = this.fb.group({
      instituteId: [this.instituteId],
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
    const instituteId = this.route.snapshot.paramMap.get('id');
    this.scheduleService.addSchedule(this.schedule.value).subscribe(
      (res) => {
        this.showToast('top-right', 'success', 'Schedule Added Successfully');
      },
      (error) => console.error(error),
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }

  back() {
    this.location.back();
  }
}
