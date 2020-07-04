import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../student-menu';

@Component({
  selector: 'ngx-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  constructor(private active: ActivatedRoute) {}
  instituteId: string;
  ngOnInit() {
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.setInstituteIdForMenus();
    this.showDashboardMenus();
  }

  setInstituteIdForMenus() {
    MENU_ITEMS.map((menu) => {
      menu.link = menu.link + '/' + this.instituteId;
      if (menu.children) {
        menu.children.map((menuChildren) => {
          menuChildren.link = menuChildren.link + '/' + this.instituteId;
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
  }
}
