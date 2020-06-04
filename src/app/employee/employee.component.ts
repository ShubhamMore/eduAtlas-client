import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './employee-menu';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  menu: any;
  institutes: any[];
  constructor() {}

  ngOnInit() {
    this.menu = MENU_ITEMS;
    this.institutes = [];
  }
}
