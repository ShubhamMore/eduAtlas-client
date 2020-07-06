import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  activeInst: any[];
  inactiveInst: any[];

  display: boolean;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.display = false;
    this.adminService.getAllInstitutes().subscribe((res: any) => {
      this.activeInst = res.activeInstitutes;
      this.inactiveInst = res.inactiveInstitutes;
      this.display = true;
    });
  }

  viewInstitute(active: boolean, i: any) {
    if (active) {
      this.adminService.setInstitute(this.activeInst[i]);
    } else {
      this.adminService.setInstitute(this.inactiveInst[i]);
    }
    this.router.navigate(['/admin/institute'], { relativeTo: this.route });
  }
}
