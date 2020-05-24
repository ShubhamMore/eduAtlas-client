import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'ngx-manage-employee',
    templateUrl: './manage-employee.component.html',
    styleUrls: ['./manage-employee.component.scss'],
  })
  export class ManageEmployee implements OnInit {
    institute: any;
    form: FormGroup;
  
    courses: any[];
    course: string;
  
    batches: any[];
  
    employees = [];
    routerId: string;
  
    constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}
  
    ngOnInit() {
      this.employees = [];
      this.course = '';
      this.form = new FormGroup({
        course: new FormControl('', { validators: [] }),
        batch: new FormControl('', { validators: [] }),
      });
      this.routerId = this.active.snapshot.paramMap.get('id');
      this.getPendingEmployees(this.routerId);
    }
  
    getPendingEmployees(instituteId: string) {
      this.api.getPendingEmployees(instituteId).subscribe((data: any) => {
        console.log(data);
        this.employees = data;
      });
    }
  
  
    view(eduAtlasId: string,employeeObjId: string) {
      this.router.navigate([`/pages/institute/branch-config/view-employee/${this.routerId}`], {
        queryParams: { eduAtlasId,employeeObjId},
      });
    }
  
    edit(eduAtlasId: string,employeeObjId: string) {
      // console.log('from manag edit => ', email);
      this.router.navigate([`/pages/institute/branch-config/add-employee/${this.routerId}/edit`], {
        queryParams: { eduAtlasId,employeeObjId, edit: 'true' },
      });
    }
  
    delete(employeeObjId: string) {
      this.api.deleteEmployeeInstitute(this.routerId, employeeObjId).subscribe(() => {
        const i = this.employees.findIndex((employee) => employee._id === employeeObjId);
        if (i !== -1) {
          this.employees.splice(i, 1);
        }
      });
    }
  }