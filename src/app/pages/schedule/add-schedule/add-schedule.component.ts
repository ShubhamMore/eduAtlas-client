import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ScheduleService } from '../../../services/schedule/schedule.service';
import { NbToastrService } from '@nebular/theme';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit {
  display: boolean;

  edit: string;
  scheduleId: string;

  scheduleForm: FormGroup;
  schedule: any;

  instituteId: string;
  institute: any;

  batches: any[] = [];
  teachers: any[] = [];

  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  date: number;
  noOfDays: number;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private toasterService: NbToastrService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.display = false;
    this.date = Date.now();
    this.instituteId = this.route.snapshot.paramMap.get('id');

    this.route.queryParams.subscribe((param: Params) => {
      this.edit = param.edit;
      this.scheduleId = param.schedule;
    });

    this.scheduleForm = this.fb.group(
      {
        instituteId: [this.instituteId],
        courseId: ['', Validators.required],
        batchId: ['', Validators.required],
        scheduleStart: [this.constructDate(this.date), Validators.required],
        scheduleEnd: ['', Validators.required],
        days: this.fb.array([]),
        recurrence: [false],
      },
      {
        validators: this.dateValidator.bind(this),
      },
    );

    this.getCourses(this.instituteId);

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

  getEmployees(instituteId: string) {
    this.api.getEmployeesByInstituteId(instituteId).subscribe((data: any) => {
      this.teachers = data;
      if (this.edit) {
        this.getSchedule(this.scheduleId);
      } else {
        this.display = true;
      }
    });
  }

  getSchedule(id: string) {
    this.scheduleService.getSchedule(id).subscribe(
      (res: any) => {
        this.schedule = res;
        this.scheduleForm.patchValue({
          courseId: this.schedule.courseId,
          scheduleStart: this.schedule.scheduleStart,
          scheduleEnd: this.schedule.scheduleEnd,
          recurrence: this.schedule.recurrence === 'true' ? true : false,
        });
        this.onSelectCourse(this.schedule.courseId);
        this.scheduleForm.patchValue({ batchId: this.schedule.batchId });

        this.scheduleForm.get('scheduleStart').disable();
        this.scheduleForm.get('scheduleEnd').disable();

        const scheduleDays = this.scheduleForm.get('days') as FormArray;
        scheduleDays.controls = [];
        this.schedule.days.forEach((day: any) => {
          const scheduleData = {
            day: day.day,
            date: day.date,
            time: day.time,
            teacher: day.teacher,
            topic: day.topic,
          };
          this.addScheduleDay(scheduleData);
        });
        this.display = true;
      },
      (error: any) => {
        this.showToast('top-right', 'danger', error.error.message);
        console.error(error);
      },
    );
  }

  scheduleDay(dayData: any) {
    return this.fb.group({
      day: [dayData.day ? dayData.day : ''],
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
      const day = new Date(date).getDay();

      const scheduleData = {
        day: this.days[day],
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
    const nextSunday = this.constructDate(this.date + noOfDays * (24 * 60 * 60 * 1000));
    this.scheduleForm.patchValue({ scheduleEnd: nextSunday });
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
      this.getEmployees(this.instituteId);
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
    if (!this.edit) {
      this.scheduleService.addSchedule(this.scheduleForm.value).subscribe(
        (res: any) => {
          this.showToast('top-right', 'success', 'Schedule Added Successfully');
          setTimeout(() => {
            this.back();
          }, 1000);
        },
        (error: any) => {
          this.showToast('top-right', 'danger', error.error.message);
          console.error(error);
        },
      );
    } else {
      this.scheduleForm.value.scheduleStart = this.schedule.scheduleStart;
      this.scheduleForm.value.scheduleEnd = this.schedule.scheduleEnd;

      this.scheduleService.updateSchedule(this.scheduleForm.value, this.schedule._id).subscribe(
        (res: any) => {
          this.showToast('top-right', 'success', 'Schedule Updated Successfully');
          setTimeout(() => {
            this.back();
          }, 1000);
        },
        (error: any) => {
          this.showToast('top-right', 'danger', error.error.message);
          console.error(error);
        },
      );
    }
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
