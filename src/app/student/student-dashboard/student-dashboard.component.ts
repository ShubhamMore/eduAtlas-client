import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../student-menu';

@Component({
  selector: 'ngx-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  instituteId: string;
  studentId: string;
  constructor(private active: ActivatedRoute, private studentService: StudentService) {}
  ngOnInit() {
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.studentId = this.studentService.getStudent()._id;
    this.setInstituteIdForMenus();
    this.showDashboardMenus();
  }

  setInstituteIdForMenus() {
    MENU_ITEMS.map((menu) => {
      const link = menu.link.substring(0, menu.link.lastIndexOf('/'));
      menu.link = link + '/' + this.instituteId;

      if (menu.children) {
        menu.children.map((menuChildren) => {
          const childrenLink = menuChildren.link.substring(0, menuChildren.link.lastIndexOf('/'));
          menuChildren.link = childrenLink + '/' + this.instituteId;
          return menuChildren;
        });
      }
      return menu;
    });
  }
  showDashboardMenus() {
    MENU_ITEMS[1].hidden = true;
    MENU_ITEMS[2].hidden = false;
    MENU_ITEMS[3].hidden = false;
    MENU_ITEMS[4].hidden = false;
    MENU_ITEMS[5].hidden = false;
    MENU_ITEMS[6].hidden = false;
    MENU_ITEMS[7].hidden = false;
    MENU_ITEMS[8].hidden = false;
    MENU_ITEMS[9].hidden = false;
    MENU_ITEMS[10].hidden = false;
    MENU_ITEMS[11].hidden = false;
  }
}
