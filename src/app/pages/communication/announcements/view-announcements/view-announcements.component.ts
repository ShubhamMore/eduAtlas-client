import { AnnouncementService } from './../../../../services/communication/announcement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-view-announcements',
  templateUrl: './view-announcements.component.html',
  styleUrls: ['./view-announcements.component.scss'],
})
export class ViewAnnouncementsComponent implements OnInit {
  display: boolean;
  announcement: any;
  announcementId: any;
  instituteId: any;
  constructor(
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private announceService: AnnouncementService,
  ) {}

  ngOnInit() {
    this.display = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((data: any) => {
      this.announcementId = data.announcement;
    });
    if (this.announcementId) {
      this.getAnnouncement(this.announcementId);
    } else {
      this.location.back();
    }
  }

  getAnnouncement(id: any) {
    this.announceService.getSingleAnnouncement(this.announcementId).subscribe(
      (res: any) => {
        this.announcement = res;
        this.display = true;
      },
      (err: any) => {
        this.showToast('top-right', 'danger', 'Announcement Not Found');
        this.location.back();
      },
    );
  }

  manageAnnouncement() {
    this.location.back();
  }

  showToast(position: any, status: any, message: any) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}