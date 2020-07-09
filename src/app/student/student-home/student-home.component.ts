import { StudentService } from './../../services/student.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../student-menu';

@Component({
  selector: 'ngx-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent implements OnInit {
  announcements: any[] = [];
  schedules: any[] = [];
  tests: any[] = [];

  display: boolean = false;
  constructor(private studentService: StudentService) {}
  ngOnInit() {
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
  }

  getDashboardData() {
    this.studentService.getStudentDashboard().subscribe((res: any) => {
      this.announcements = res.announcements;
      this.tests = res.test;
      this.schedules = res.schedule;
      this.display = true;
    });
  }
}
