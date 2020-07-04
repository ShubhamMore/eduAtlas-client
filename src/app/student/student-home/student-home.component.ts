import { ApiService } from './../../services/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MENU_ITEMS } from '../student-menu';

// import { ZoomMtg } from '@zoomus/websdk';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

@Component({
  selector: 'ngx-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss'],
})
export class StudentHomeComponent implements OnInit {
  meetings: any[] = [];

  constructor(private api: ApiService, @Inject(DOCUMENT) document) {}
  ngOnInit() {
    this.hideOtherMenus();
  }
  hideOtherMenus() {
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
