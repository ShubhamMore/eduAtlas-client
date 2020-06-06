import { InstituteService } from './../../services/institute.service';
import { EmployeeService } from './../../services/employee.service';
import { AuthService } from './../../services/auth-services/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss'],
})
export class EmployeeHomeComponent implements OnInit {
  constructor(
    private api: ApiService,
    private authService: AuthService,
    private instService: InstituteService,
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    this.api.getEmployeeInstitutes({ email: user.email }).subscribe((inst: any) => {
      this.instService.setInstitutes(inst);
    });
  }
}
