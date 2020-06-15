import { NbToastrService } from '@nebular/theme';
import { AnnouncementService } from './../../../../services/communication/announcement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-manage-announcements',
  templateUrl: './manage-announcements.component.html',
  styleUrls: ['./manage-announcements.component.scss'],
})
export class ManageAnnouncementsComponent implements OnInit {
  announcements = [];
  instituteId: string;
  display = false;
  constructor(
    private api: ApiService,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private announceService: AnnouncementService,
  ) {}

  ngOnInit() {
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getAnnouncement(this.instituteId);
  }

  onView(id: string) {
    this.router.navigate(['/pages/communication/view-announcements/', this.instituteId], {
      queryParams: { announcement: id },
    });
  }

  getAnnouncement(id: any) {
    this.announceService.getAnnouncements(id).subscribe((data: any) => {
      this.announcements = data;
      this.display = true;
      // console.log('announce =>', this.announcement);
    });
  }

  onDelete(id: any) {
    this.announceService.deleteAnnouncement(id).subscribe(
      (res) => {
        const i = this.announcements.findIndex((e) => e._id === id);

        if (i !== -1) {
          this.announcements.splice(i, 1);
        }
        this.showToast('top-right', 'success', 'Announcement Deleted Successfully');
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
