import { MeetingService } from './../../../../services/meeting.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-upload-class-recording',
  templateUrl: './upload-class-recording.component.html',
  styleUrls: ['./upload-class-recording.component.scss'],
})
export class UploadClassRecordingComponent implements OnInit {
  @Input() meeting: any;
  @Output() close = new EventEmitter<void>();
  @Output() deleteClassRecording = new EventEmitter<{ _id: string; recordingId: string }>();

  file: File;
  fileError: boolean;

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

  constructor(private meetingService: MeetingService, private toasterService: NbToastrService) {}

  ngOnInit() {
    this.fileError = false;
  }

  deleteRecording(_id: string, recordingId: string) {
    this.meetingService.deleteRecording(_id, recordingId).subscribe(
      (res: any) => {
        const i = this.meeting.recordings.findIndex(
          (recording: any) => recording._id === recordingId,
        );
        if (i >= 0) {
          this.meeting.recordings.splice(i, 1);
        }
        this.deleteClassRecording.emit({ _id, recordingId });
        this.showToast('top-right', 'success', 'Recording Deleted Successfully');
      },
      (err: any) => {
        this.showToast('top-right', 'danger', err.err.message);
      },
    );
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    const imgExt: string[] = ['mp4'];
    const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
    if (!(imgExt.indexOf(ext) !== -1)) {
      this.fileError = true;
      return;
    }
    this.fileError = false;
    this.file = file;
  }

  uploadRecording() {
    if (!this.file) {
      this.fileError = true;
      return;
    }

    const recording = new FormData();
    recording.append('_id', this.meeting._id);
    recording.append('instituteId', this.meeting.instituteId);
    recording.append('recording', this.file, this.meeting.title);

    this.meetingService.addRecording(recording).subscribe(
      (res: any) => {
        this.meeting.recordings.push(res);
        this.showToast('top-right', 'success', 'Recording Added Successfully');
      },
      (err) => {
        this.showToast('top-right', 'danger', err.err.message);
      },
    );
  }

  month(date: string) {
    const month = date.split('-')[1];
    return this.months[+month - 1];
  }

  day(date: string) {
    return date.split('-')[2];
  }

  createDate(date: string) {
    return date.split('-').reverse().join('-');
  }

  createTime(time: any) {
    if (!time) {
      return '--';
    }
    time = time.split(':');
    let hours = +time[0];
    const minute = time[1];
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    if (hours === 0) {
      hours = 12;
    } else if (hours >= 12) {
      hours -= 12;
    }

    return hours.toString().padStart(2, '0') + ':' + minute + ' ' + meridiem;
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }

  onClose() {
    this.close.emit();
  }
}
