import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ngx-add-employee',
    templateUrl: './view-employee.component.html',
    styleUrls: ['./view-employee.component.scss'],
  })

  export class ViewEmployee implements OnInit{
    employee: any;
    instituteId: string;
    employeeEduId: string;
    employeeObjId:string;

    constructor(private api: ApiService, private route: ActivatedRoute) {}
  
    ngOnInit() {
      this.instituteId = this.route.snapshot.paramMap.get('id');
  
      this.route.queryParams.subscribe((data) => {
        this.employeeEduId = data.eduAtlasId;
        this.employeeObjId = data.employeeObjId;
      });
  
      this.getEmployee(this.employeeObjId);
    }
    getEmployee(employeeObjId: string) {
      this.api
        .getOneEmployeeByInstitute({
            empId: employeeObjId,
            instituteId: this.instituteId,
          })
        .subscribe((data) => {
          this.employee = data[0];
        });
    }
  }