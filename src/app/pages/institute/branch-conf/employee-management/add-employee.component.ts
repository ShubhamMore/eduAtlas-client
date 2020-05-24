import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployee implements OnInit {
  employees: FormGroup;
  eduAtlasEmployeeForm: FormGroup;
  routerId: string;
  institute: any;
  edit: string;
  employeeEduId: string;
  employee: any;
  alreadyRegistered: boolean;

  roles = ['Teacher', 'Manager', 'Counselor '];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');

    this.active.queryParams.subscribe((data) => {
      this.alreadyRegistered = false;
      this.employeeEduId = data.eduAtlasId;
      var employeeObjId = data.employeeObjId;
      this.edit = data.edit;

      this.employees = this.fb.group({
        name: ['', Validators.required],
        employeeEmail: ['', Validators.compose([Validators.required, Validators.email])],
        contact: ['', Validators.compose([Validators.required])],
        address: [''],
        role: ['', Validators.required],
      });

      this.eduAtlasEmployeeForm = this.fb.group({
        idInput1: ['EDU', Validators.required],
        idInput2: ['', Validators.required],
        idInput3: ['EMP', Validators.required],
        idInput4: ['', Validators.required],
      });

      if (this.edit === 'true') {
        this.alreadyRegistered = true;
        this.getOneEmployeeByInstitute(employeeObjId, this.routerId);
      }
    });
  }

  changeAlreadyRegistered(e: any) {
    this.alreadyRegistered = e;
    if (!e) {
      this.eduAtlasEmployeeForm.reset();
      this.employees.reset();
    }
  }

  onEmployeeSearch() {
    if (this.eduAtlasEmployeeForm.valid) {
      const employeeEduId = `${this.eduAtlasEmployeeFormControl['idInput1'].value}-${this.eduAtlasEmployeeFormControl['idInput2'].value}-${this.eduAtlasEmployeeFormControl['idInput3'].value}-${this.eduAtlasEmployeeFormControl['idInput4'].value}`;
      this.api.getOneEmployee(employeeEduId).subscribe((data: any) => {
        if (data) {
          this.employeeEduId = employeeEduId;
          this.edit = 'true';
          this.employees.patchValue({
            name: data[0].basicDetails.name,
            employeeEmail: data[0].basicDetails.employeeEmail,
            contact: data[0].basicDetails.employeeContact,
            address: data[0].basicDetails.employeeAddress,
            role: data[0].instituteDetails[0].role,
          });
          this.employeeEduId = data[0].eduAtlasId;
          this.employee._id = data[0]._id;
        } else {
          this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
        }
      });
    }
    if (additionalDiscount) {
      calculatedAmount = calculatedAmount - (additionalDiscount / 100) * calculatedAmount;
    }
  }

  getOneEmployeeByInstitute(employeeObjId: string, institute: string) {
    this.api
      .getOneEmployeeByInstitute({
        empId: employeeObjId,
        instituteId: institute,
      })
      .subscribe((data: any) => {
        this.employee = data[0];
        // console.log(this.employee);
        const eduAtlId = this.employeeEduId.split('-');

        this.eduAtlasEmployeeForm.patchValue({
          idInput1: eduAtlId[0],
          idInput2: eduAtlId[1],
          idInput3: eduAtlId[2],
          idInput4: eduAtlId[3],
        });

        this.eduAtlasEmployeeForm.get('idInput2').disable();
        this.eduAtlasEmployeeForm.get('idInput4').disable();

        this.employees.patchValue({
          name: this.employee.basicDetails.name,
          employeeEmail: this.employee.basicDetails.employeeEmail,
          contact: this.employee.basicDetails.employeeContact,
          address: this.employee.basicDetails.employeeAddress,
          role: this.employee.instituteDetails[0].role,
        });
        this.employees.get('name').disable();
        this.employees.get('address').disable();
        this.employees.get('employeeEmail').disable();
        this.employees.get('contact').disable();
      });
  }

  onSubmit() {
    if (this.employees.invalid) {
      return;
    }

    if (this.edit === 'true') {
      this.api
        .updateEmployeeInstitueDetails(this.employee._id, this.routerId, this.f['role'].value)
        .subscribe(
          (res) => {
            this.showToaster('top-right', 'success', 'Employee Updated Successfully!');
            this.router.navigate([
              `/pages/institute/branch-config/manage-employee/${this.routerId}`,
            ]);
          },
          (err) => this.showToaster('top-right', 'danger', err.error.message),
        );
    }

    if (!this.edit) {
      if (!this.alreadyRegistered) {
        this.api.addEmployee(this.employees.value, this.routerId).subscribe(
          (data) => {
            this.showToaster('top-right', 'success', 'New Employee Added Successfully!');
            setTimeout(() => {
              this.router.navigate([
                `/pages/institute/branch-config/manage-employee/${this.routerId}`,
              ]);
            }, 1000);
          },
          (err) => {
            if (err.error.message.includes('User Already Exists')) {
              this.showToaster(
                'top-right',
                'danger',
                'This Employee Already Exist, Please Search Employee By EDU-Atlas ID',
              );
              this.alreadyRegistered = true;
              return;
            }
            this.showToaster('top-right', 'danger', err.error.message);
          },
        );
      }
    }
  }
  showToaster(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
}
