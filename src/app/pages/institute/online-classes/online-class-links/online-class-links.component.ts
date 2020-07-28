import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { MeetingService } from '../../../../services/meeting.service';

@Component({
  selector: 'ngx-online-class-links',
  templateUrl: './online-class-links.component.html',
  styleUrls: ['./online-class-links.component.scss'],
})
export class OnlineClassLinksComponent implements OnInit {
  institute: any;
  instituteId: string;
  batches: any[] = [];
  display: boolean;
  courseId: string;
  batch: string;

  upcomingMeetings: any[];
  previousMeetings: any[];

  months: string[] = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private meetingService: MeetingService,
    private router: Router,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.display = false;
    this.upcomingMeetings = [];
    this.previousMeetings = [];
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getCourses(this.instituteId);
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.display = true;
    });
  }

  month(date: string) {
    const month = date.split('-')[1];
    return this.months[+month - 1];
  }

  day(date: string) {
    return date.split('-')[2];
  }

  onSelectCourse(id: string) {
    this.courseId = id;
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  onSelectBatch(batchId: string) {
    this.batch = batchId;
    this.getClasses(this.instituteId, this.courseId, batchId);
  }

  start(link: string) {
    window.open(
      link,
      'EA Live',
      'scrollbars=yes,resizable=yes,status=no,location=no,toolbar=no,menubar=no',
    );
  }

  edit(id: string) {
    this.router.navigate(
      [`/pages/institute/online-classes/create-class-link/${this.instituteId}/edit`],
      {
        queryParams: { meeting: id, edit: 'true' },
      },
    );
  }

  deleteMeeting(id: string) {
    this.meetingService.deleteMeetingLink({ _id: id }).subscribe(
      (res: any) => {
        const i = this.upcomingMeetings.findIndex((meeting: any) => meeting._id === id);
        this.upcomingMeetings.splice(i, 1);
      },
      (err) => {},
    );
  }

  uploadRecording(id: string) {
    const recording = new FormData();
    recording.append('_id', id);
    recording.append('recording', '');

    this.meetingService.addRecording(recording).subscribe(
      (res: any) => {},
      (err) => {},
    );
  }

  viewRecording(id: string, recording: string) {}

  deleteRecording(meetingId: string, recordingId: string) {
    this.meetingService.deleteRecording(meetingId, recordingId).subscribe(
      (res: any) => {},
      (err) => {},
    );
  }

  createTime(time: string) {
    return time;
  }

  createDate(date: string) {
    return date.split('-').reverse().join('-');
  }

  getClasses(instituteId: any, courseId: any, batchId: any) {
    this.meetingService
      .getMeetingLinkByBatch({ instituteId: instituteId, courseId: courseId, batchId: batchId })
      .subscribe(
        (res: any) => {
          this.upcomingMeetings = res.upcomingMeetings;
          this.previousMeetings = res.previousMeetings;
        },
        (err) => {
          this.showToast('top right', 'danger', err.err.message);
        },
      );
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
