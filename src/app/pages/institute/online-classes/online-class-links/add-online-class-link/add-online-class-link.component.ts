import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NbToastrService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MeetingService } from '../../../../../services/meeting.service';

@Component({
  selector: 'ngx-add-online-class-link',
  templateUrl: './add-online-class-link.component.html',
  styleUrls: ['./add-online-class-link.component.scss'],
})
export class AddOnlineClassLinkComponent implements OnInit {
  instituteId: string;

  institute: any;
  onlineClassForm: FormGroup;

  meetingId: any;
  meeting: any;
  edit: any;

  courses: any[] = [];
  batches: any[] = [];
  teachers: any[] = [];

  display: boolean;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private meetingService: MeetingService,
    private location: Location,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.display = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((param) => {
      this.meetingId = param.meeting;
      this.edit = param.edit;
    });
    this.getCourses(this.instituteId);

    this.onlineClassForm = this.fb.group({
      instituteId: [this.instituteId],
      courseId: ['', Validators.required],
      batchId: ['', Validators.required],
      topic: ['', Validators.required],
      link: ['', Validators.required],
      date: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required], // Num in Min
    });
  }

  getMeeting(id: string) {
    this.meetingService.getOneMeetingLink({ id }).subscribe(
      (data: any) => {
        this.meeting = data;
        this.onlineClassForm.patchValue({
          instituteId: this.meeting.instituteId,
          courseId: this.meeting.courseId,
          topic: this.meeting.topic,
          link: this.meeting.link,
          date: this.meeting.date,
          fromTime: this.meeting.fromTime,
          toTime: this.meeting.toTime,
        });

        this.onSelectCourse(this.meeting.courseId);

        this.onlineClassForm.patchValue({
          batchId: this.meeting.batchId,
        });
        this.display = true;
      },
      (err: any) => {},
    );
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.courses = this.institute.course;
    });
  }

  onSelectCourse(id: string) {
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  saveOnlineClassLink() {
    if (this.onlineClassForm.valid) {
      const onlineClass: any = {
        instituteId: this.instituteId,
        courseId: this.onlineClassForm.value.courseId,
        batchId: this.onlineClassForm.value.batchId,
        topic: this.onlineClassForm.value.topic,
        link: this.onlineClassForm.value.agenda,
        date: this.onlineClassForm.value.date,
        fromTime: this.onlineClassForm.value.fromTime,
        toTime: this.onlineClassForm.value.toTime,
      };
      if (!this.edit) {
        this.meetingService.createMeetingLink(onlineClass).subscribe(
          (res) => {
            this.showToast('top right', 'success', 'Meeting Added Successfully');
            this.location.back();
          },
          (err: any) => {
            this.showToast('top right', 'danger', err.err.message);
          },
        );
      } else {
        onlineClass._id = this.meetingId;
        this.meetingService.updateMeetingLink(onlineClass).subscribe(
          (res) => {
            this.showToast('top right', 'success', 'Meeting Updated Successfully');
            this.location.back();
          },
          (err: any) => {
            this.showToast('top right', 'danger', err.err.message);
          },
        );
      }
    }
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
