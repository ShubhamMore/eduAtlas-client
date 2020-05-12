import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AnnouncementService } from '../../../services/communication/announcement.service';

@Component({
  selector: 'ngx-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  announce = {
    text: '',
    title: '',
    batchCodes: [],
    categories: [],
    instituteId: '',
    selectAll: false,
  };
  announcement = [
    {
      text: '',
      title: '',
      batchCodes: [],
      categories: [],
      instituteId: '',
      selectAll: false,
      _id: '',
    },
  ];
  // selectAll:boolean = false;
  batches = { batch: [{ _id: '', course: '', batchCode: '', description: '' }] };
  institute = {
    institute: {
      name: '',
      logo: null,
      instituteContact: '',
      address: { addressLine: '', city: '', state: '', pincode: '' },
      category: [''],
      instituteMetaTag: [''],
    },
  };

  routerId: string;
  constructor(
    private api: ApiService,
    private active: ActivatedRoute,
    private announceService: AnnouncementService
  ) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.announce.instituteId = this.routerId;
    this.getBatches(this.routerId);
    this.getInstitute(this.routerId);
    this.getAnnouncement(this.routerId);
  }
  getBatches(id) {
    this.api.getBatches(id).subscribe((data) => {
      const batch = JSON.stringify(data);
      this.batches = JSON.parse(batch);
      console.log('my batch' + JSON.parse(JSON.stringify(data)));
    });
  }
  getAnnouncement(id) {
    this.announceService.getAnnouncement(id).subscribe((data) => {
      this.announcement = data;
      console.log('announce =>', this.announcement);
    });
  }
  getInstitute(id) {
    this.api.getInstitute(id).subscribe((data) => {
      const inst = JSON.stringify(data);
      this.institute = JSON.parse(inst);
      console.log(this.institute.institute);
    });
  }
  check(event) {
    console.log(event);
    this.announce.selectAll = event;
  }
  onSubmit() {
    console.log('text =>', this.announce);

    this.announceService.postAnnouncement(this.announce).subscribe((res) => {
      // this.announcement.push(res);
    });
  }
  onDelete(id) {
    this.announceService.deleteAnnouncement(id).subscribe((res) => {
      console.log(res);
    });

    const i = this.announcement.findIndex((e) => e._id == id);
    console.log(i);
    if (i !== -1) {
      this.announcement.splice(i, 1);
    }
  }
}
