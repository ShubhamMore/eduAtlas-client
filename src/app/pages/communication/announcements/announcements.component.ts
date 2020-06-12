import { NbToastrService } from '@nebular/theme';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../../../services/communication/announcement.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  file: File;

  announcementForm: FormGroup;
  announcement = [];
  batches: any[];
  institute: any;
  display = false;
  routerId: string;
  constructor(
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private location: Location,
    private api: ApiService,
    private active: ActivatedRoute,
    private announceService: AnnouncementService,
  ) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.batches = [];
    this.announcementForm = this.fb.group({
      title: [''],
      text: [''],
      instituteId: [this.routerId],
      batchCodes: [],
      categories: [],
      // batchCodes: this.fb.array([]),
      // categories: this.fb.array([]),
    });
    this.getInstitute(this.routerId);
    this.getAnnouncement(this.routerId);
  }

  getBatches(id: any) {
    this.api.getBatches(id).subscribe((data: any) => {
      this.batches = data.batch;
      this.display = true;

      // console.log('my batch' + JSON.parse(JSON.stringify(data)));
    });
  }

  getAnnouncement(id: any) {
    this.announceService.getAnnouncements(id).subscribe((data: any) => {
      this.announcement = data;
      // console.log('announce =>', this.announcement);
    });
  }

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    // const imgExt: string[] = ['jpg', 'png'];
    // const ext = file.name
    // if (!(imgExt.indexOf(ext) !== -1)) {
    // this.invalidImage = true;
    // return;
    // }
    // this.imageRequired = false;
    // this.invalidImage = false;
    this.file = file;
  }

  getInstitute(id: any) {
    this.api.getInstitute(id).subscribe((data: any) => {
      this.institute = data.institute;
      this.getBatches(this.routerId);

      // console.log(this.institute.institute);
    });
  }

  check(event: any) {
    const batches = [];
    if (event) {
      this.batches.forEach((batch: any) => batches.push(batch.batchCode));
      this.announcementForm.patchValue({ batchCodes: batches });
    } else {
      this.announcementForm.patchValue({ batchCodes: batches });
    }
  }

  onSubmit() {
    // console.log('text =>', this.announce);
    const announce = new FormData();
    announce.append('title', this.announcementForm.value.title);
    announce.append('text', this.announcementForm.value.text);
    announce.append('instituteId', this.announcementForm.value.instituteId);
    announce.append('batchCodes', JSON.stringify(this.announcementForm.value.batchCodes));
    announce.append('categories', JSON.stringify(this.announcementForm.value.categories));
    if (this.file) {
      announce.append('announcement', this.file, this.announcementForm.value.title);
    }
    this.announceService.postAnnouncement(announce).subscribe(
      (res) => {
        this.showToast('top-right', 'success', 'Announcement Added Successfully');
        this.location.back();
      },
      (err: any) => {
        this.showToast('top-right', 'danger', err.err.message);
      },
    );
  }

  onDelete(id: any) {
    this.announceService.deleteAnnouncement(id).subscribe(
      (res) => {
        // console.log(res);
        const i = this.announcement.findIndex((e) => e._id === id);
        // console.log(i);
        if (i !== -1) {
          this.announcement.splice(i, 1);
          this.showToast('top-right', 'success', 'Announcement Deleted Successfully');
        }
        this.getAnnouncement(this.routerId);
      },
      (err) => {
        this.showToast('top-right', 'danger', 'Announcement Deletion Failed');
      },
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
