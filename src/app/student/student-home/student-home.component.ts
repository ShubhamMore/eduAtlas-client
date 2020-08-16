import { InstituteService } from './../../services/institute.service';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../student-menu';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent implements OnInit {
  announcements: any[] = [];
  schedules: any[] = [];
  onlineClasses: any[] = [];
  tests: any[] = [];

  display: boolean = false;
  constructor(
    private instituteService: InstituteService,
    private studentService: StudentService,
    private router: Router,
    private active: ActivatedRoute,
  ) {}
  ngOnInit() {
    this.instituteService.publishData('');

    this.hideOtherMenus();
    this.getDashboardData();
  }

  hideOtherMenus() {
    MENU_ITEMS[2].hidden = true;
    MENU_ITEMS[3].hidden = true;
    MENU_ITEMS[4].hidden = true;
    MENU_ITEMS[5].hidden = true;
    MENU_ITEMS[6].hidden = true;
    MENU_ITEMS[7].hidden = true;
    MENU_ITEMS[8].hidden = true;
    MENU_ITEMS[9].hidden = true;
    MENU_ITEMS[10].hidden = true;
    MENU_ITEMS[11].hidden = true;
    MENU_ITEMS[12].hidden = true;
    MENU_ITEMS[13].hidden = true;
    MENU_ITEMS[14].hidden = true;
  }
  goToAnnouncement(announcement: string, instituteId: string) {
    this.router.navigate(['/student/view-announcement/', instituteId], {
      relativeTo: this.active,
      queryParams: { announcement },
    });
  }
  getDashboardData() {
    this.studentService.getStudentDashboard().subscribe((res: any) => {
      this.announcements = res.announcements;
      this.tests = res.test;
      this.schedules = res.schedule;
      this.onlineClasses = res.onlineClass;
      this.display = true;
    });
  }

  createTime(time: string) {
    return time;
  }

  createDate(date: string) {
    return date.split('-').reverse().join('-');
  }
}
