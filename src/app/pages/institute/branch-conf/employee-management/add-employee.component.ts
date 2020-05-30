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
  employeeForm: FormGroup;
  eduAtlasEmployeeForm: FormGroup;
  instituteId: string;
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
    this.alreadyRegistered = false;

    this.instituteId = this.active.snapshot.paramMap.get('id');

    this.active.queryParams.subscribe((data) => {
      this.employeeEduId = data.eduAtlasId;
      const employeeObjId = data.employeeObjId;
      this.edit = data.edit;

      this.employeeForm = this.fb.group({
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
        this.getOneEmployeeByInstitute(employeeObjId, this.instituteId);
      }
    });
  }

  get f() {
    return this.employeeForm.controls;
  }

  get eduAtlasEmployeeFormControl() {
    return this.eduAtlasEmployeeForm.controls;
  }

  onEmployeeFormSearch() {
    this.employeeForm.reset();
    if (this.eduAtlasEmployeeForm.valid) {
      const employeeEduId = `${this.eduAtlasEmployeeFormControl['idInput1'].value}-${this.eduAtlasEmployeeFormControl['idInput2'].value}-${this.eduAtlasEmployeeFormControl['idInput3'].value}-${this.eduAtlasEmployeeFormControl['idInput4'].value}`;
      this.api.getOneEmployee(employeeEduId).subscribe(
        (data: any) => {
          if (data) {
            this.employeeEduId = employeeEduId;
            this.employee = data[0];
            console.log(this.employee);
            this.employeeForm.patchValue({
              name: this.employee.basicDetails.name,
              employeeEmail: this.employee.basicDetails.employeeEmail,
              contact: this.employee.basicDetails.employeeContact,
              address: this.employee.basicDetails.employeeAddress,
            });
          } else {
            this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
          }
        },
        (error: any) => {
          this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
        },
      );
    }
  }

  changeAlreadyRegistered(e: any) {
    this.alreadyRegistered = e;
    if (!e) {
      this.eduAtlasEmployeeForm.reset({ idInput1: 'EDU', idInput3: 'EMP' });
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

        this.employeeForm.patchValue({
          name: this.employee.basicDetails.name,
          employeeEmail: this.employee.basicDetails.employeeEmail,
          contact: this.employee.basicDetails.employeeContact,
          address: this.employee.basicDetails.employeeAddress,
          role: this.employee.instituteDetails[0].role,
        });

        this.employeeForm.get('name').disable();
        this.employeeForm.get('address').disable();
        this.employeeForm.get('employeeEmail').disable();
        this.employeeForm.get('contact').disable();
      });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    if (this.edit === 'true') {
      this.api
        .updateEmployeeInstituteDetails(this.employee._id, this.instituteId, this.f['role'].value)
        .subscribe(
          (res) => {
            this.showToaster('top-right', 'success', 'Employee Updated Successfully!');
            this.router.navigate([
              `/pages/institute/branch-config/manage-employee/${this.instituteId}`,
            ]);
          },
          (err) => this.showToaster('top-right', 'danger', err.error.message),
        );
    }

    if (!this.edit) {
      if (!this.alreadyRegistered) {
        this.api.addEmployee(this.employeeForm.value, this.instituteId).subscribe(
          (data) => {
            this.showToaster('top-right', 'success', 'New Employee Added Successfully!');
            setTimeout(() => {
              this.router.navigate([
                `/pages/institute/branch-config/manage-employee/${this.instituteId}`,
              ]);
            }, 1000);
          },
          (err) => {
            if (err.error.message.includes('E11000 duplicate key error collection')) {
              this.showToaster(
                'top-right',
                'danger',
                'This Employee Already Exist, Please Search Employee By EDU-Atlas ID',
              );
              this.alreadyRegistered = true;
              return;
            }
            this.alreadyRegistered = true;
            this.showToaster('top-right', 'danger', err.error.message);
          },
        );
      } else {
        if (this.employeeEduId) {
          this.api
            .addEmployeeInstitute(this.employeeEduId, this.instituteId, this.employeeForm.value)
            .subscribe(
              (res) => {
                this.showToaster(
                  'top-right',
                  'success',
                  'Employee Added to Institute Successfully!',
                );
                this.router.navigate([
                  `/pages/institute/branch-config/manage-employee/${this.instituteId}`,
                ]);
              },
              (err) => this.showToaster('top-right', 'danger', err.error.message),
            );
        } else {
          this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
        }
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
