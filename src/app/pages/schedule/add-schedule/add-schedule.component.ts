import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { NbToastrService } from '@nebular/theme';
import { Location } from '@angular/common';
import { GeneratedFile } from '@angular/compiler';

@Component({
  selector: 'ngx-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit {
  display: boolean;

  scheduleForm: FormGroup;

  instituteId: string;
  institute: any;

  batches: any[] = [];
  teachers: any[] = [];

  date: number;
  noOfDays: number;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private toasterService: NbToastrService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.display = false;
    this.date = Date.now();
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getCourses(this.instituteId);
    this.scheduleForm = this.fb.group(
      {
        instituteId: [this.instituteId],
        scheduleStart: [this.constructDate(this.date), Validators.required],
        scheduleEnd: ['', Validators.required],
        course: ['', Validators.required],
        batch: ['', Validators.required],
        days: this.fb.array([]),
        recurrence: [],
      },
      {
        validators: this.dateValidator.bind(this),
      },
    );

    this.fromDatePicked(this.date);
  }

  dateValidator(group: FormGroup): { [s: string]: boolean } {
    if (
      this.getDate(group.value.scheduleStart).getTime() >
      this.getDate(group.value.scheduleEnd).getTime()
    ) {
      return { invalidSchedule: true };
    }
    return null;
  }

  scheduleDay(dayData: any) {
    return this.fb.group({
      date: [dayData.date ? dayData.date : ''],
      time: [dayData.time ? dayData.time : ''],
      teacher: [dayData.teacher ? dayData.teacher : ''],
      topic: [dayData.topic ? dayData.topic : ''],
    });
  }

  addScheduleDay(scheduleData: any) {
    const scheduleDays = this.scheduleForm.get('days') as FormArray;
    scheduleDays.push(this.scheduleDay(scheduleData));
  }

  generateSchedule() {
    const scheduleDays = this.scheduleForm.get('days') as FormArray;
    scheduleDays.controls = [];
    // const currentDay = this.getDate(this.date).getDay();
    for (let i = 0; i < this.noOfDays; i++) {
      const date = this.constructDate(this.date + i * 24 * 60 * 60 * 1000);

      const scheduleData = {
        date: date,
        time: '',
        teacher: '',
        topic: '',
      };
      this.addScheduleDay(scheduleData);
    }
  }

  getDate(date: number) {
    return new Date(date);
  }

  fromDatePicked(date: any) {
    this.date = new Date(date).getTime();
    const noOfDays = 7 - this.getDate(this.date).getDay();
    const nextSunday = this.constructDate(this.date + this.noOfDays * (24 * 60 * 60 * 1000));
    setTimeout(() => {
      this.scheduleForm.patchValue({ scheduleEnd: nextSunday });
    }, 200);
    this.noOfDays = noOfDays + 1;
    this.generateSchedule();
  }

  toDatePicked(date: any) {
    date = new Date(date).getTime();
    this.noOfDays = (date - this.date) / (24 * 60 * 60 * 1000) + 1;
    this.generateSchedule();
  }

  // Construct date in yyyy-MM-dd format to set in DOM form field
  constructDate(dateInMillisecond: number) {
    const date = new Date(dateInMillisecond);
    return `${date.getFullYear()}-${this.appendZero(date.getMonth() + 1)}-${this.appendZero(
      date.getDate(),
    )}`;
  }

  // Append zero for single digit Date and Month
  appendZero(n: number): string {
    if (n < 10) {
      return '0' + n;
    }
    return '' + n;
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.display = true;
    });
  }

  onSelectCourse(id: string) {
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  recurrence(check: boolean) {
    this.scheduleForm.patchValue({
      recurrence: check,
    });
  }

  onSubmit() {
    if (this.scheduleForm.invalid) {
      return;
    }
    const instituteId = this.route.snapshot.paramMap.get('id');
    this.scheduleService.addSchedule(this.scheduleForm.value).subscribe(
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
