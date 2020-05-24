import { Component, OnInit } from "@angular/core";
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
    eduIdForm: FormGroup;
  
    routerId: string;
    institute: any;
  
    modes = ['Cash', 'Chaque/DD', 'Card', 'Others'];
  
    discounts: any[];
    courses: any[];
    batches: any[];
  
    selectedCourse: any;
    selectedDiscount: any;
    amountPending: number = 0;
  
    edit: string;
    employeeEduId: string;
    courseId: string;
  
    employee: any;
  
    alreadyRegistered: boolean;
  
    constructor(
      private fb: FormBuilder,
      private api: ApiService,
      private router: Router,
      private active: ActivatedRoute,
      private toasterService: NbToastrService,
    ) {}
  
    ngOnInit() {
      this.courses = [];
      this.batches = [];
      this.discounts = [];
  
      this.alreadyRegistered = false;
  
      this.routerId = this.active.snapshot.paramMap.get('id');
  
      this.active.queryParams.subscribe((data) => {
        this.employeeEduId = data.student;
        this.courseId = data.course;
        this.edit = data.edit;
  
        this.employees = this.fb.group({
          name: ['', Validators.required],
          rollNo: ['', Validators.required],
          employeeEmail: ['', Validators.compose([Validators.required, Validators.email])],
          contact: ['', Validators.compose([Validators.required])],
  
          parentName: [''],
          parentContact: [''],
          parentEmail: ['', Validators.email],
  
          address: [''],
  
          courseDetails: this.fb.group({
            course: ['', Validators.required],
            batch: [''],
            discount: [''],
            additionalDiscount: [''],
            netPayable: [''],
          }),
  
          feeDetails: this.fb.group({
            installments: [''],
            nextInstallment: [''],
            amountCollected: [''],
            mode: [''],
          }),
  
          materialRecord: [''],
        });
  
        this.eduAtlasEmployeeForm = this.fb.group({
          idInput1: ['EDU', Validators.required],
          idInput2: ['', Validators.required],
          idInput3: ['EMP', Validators.required],
          idInput4: ['', Validators.required],
        });
  
        this.getCourseTd(this.routerId);
  
        if (this.edit === 'true') {
          this.alreadyRegistered = true;
          this.getStudent(this.employeeEduId, this.routerId, this.courseId);
        }
      });
    }
  
    get f() {
      return this.employees.controls;
    }
  
    get eduAtlasEmployeeFormControl() {
      return this.eduAtlasEmployeeForm.controls;
    }
  
    onStudentSearch() {
      if (this.eduAtlasEmployeeForm.valid) {
        const employeeEduId = `${this.eduAtlasEmployeeFormControl['idInput1'].value}-${this.eduAtlasEmployeeFormControl['idInput2'].value}-${this.eduAtlasEmployeeFormControl['idInput3'].value}-${this.eduAtlasEmployeeFormControl['idInput4'].value}`;
        this.api.getOneStudent(employeeEduId).subscribe((data: any) => {
          if (data) {
            this.employees.patchValue({
              name: data.basicDetails.name,
              rollNo: data.basicDetails.rollNumber,
              employeeEmail: data.basicDetails.employeeEmail,
              contact: data.basicDetails.studentContact,
  
              parentName: data.parentDetails.name,
              parentContact: data.parentDetails.parentContact,
              parentEmail: data.parentDetails.parentEmail,
  
              address: data.parentDetails.address,
            });
            this.employeeEduId = employeeEduId;
          } else {
            this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
          }
        });
      }
    }
  
    changeAlreadyRegistered(e: any) {
      this.alreadyRegistered = e;
      if (!e) {
        this.eduAtlasEmployeeForm.reset();
        this.employees.reset();
      }
    }
  
    getCourseTd(id: string) {
      this.api.getCourseTD(id).subscribe((data: any) => {
        this.institute = data;
        this.courses = data.course;
        // this.onSelectCourse(this.courses[0]._id);
        this.discounts = data.discount;
      });
    }
  
    onSelectCourse(id: string) {
      this.batches = this.institute.batch.filter((b: any) => b.course === id);
      this.selectedCourse = this.courses.find((course: any) => course.id === id);
      this.employees.get('courseDetails').patchValue({ batch: '' });
      this.employees.get('feeDetails').reset();
      this.employees.get('materialRecord').reset();
      this.calculateNetPayableAmount();
    }
  
    onSelectDiscount(id: string) {
      this.selectedDiscount = this.discounts.find((dicount: any) => dicount.id === id);
      this.calculateNetPayableAmount();
    }
  
    calculateNetPayableAmount() {
      let calculatedAmount = 0;
      const additionalDiscount = this.employees.get(['courseDetails', 'additionalDiscount']).value;
      if (this.selectedCourse && this.selectedCourse.fees) {
        calculatedAmount = this.selectedCourse.fees;
  
        if (this.selectedDiscount && this.selectedDiscount.amount) {
          calculatedAmount =
            this.selectedCourse.fees -
            (this.selectedDiscount.amount / 100) * this.selectedCourse.fees;
        }
        if (additionalDiscount) {
          calculatedAmount = calculatedAmount - (additionalDiscount / 100) * calculatedAmount;
        }
      }
      this.employees.get('courseDetails').patchValue({ netPayable: calculatedAmount });
      this.calculateAmountPending();
    }
  
    calculateAmountPending() {
      const netPayableAmount = this.employees.get(['courseDetails', 'netPayable']).value;
      const amountCollected = this.employees.get(['feeDetails', 'amountCollected']).value;
  
      if (amountCollected && netPayableAmount) {
        this.amountPending = netPayableAmount - amountCollected;
      } else {
        this.amountPending = netPayableAmount;
      }
    }
  
    getStudent(employeeEduId: string, institute: string, course: string) {
      this.api
        .getOneStudentByInstitute({
          eduatlasId: employeeEduId,
          instituteId: institute,
          courseId: course,
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
            rollNo: this.employee.basicDetails.rollNumber,
            employeeEmail: this.employee.basicDetails.employeeEmail,
            contact: this.employee.basicDetails.studentContact,
  
            parentName: this.employee.parentDetails.name,
            parentContact: this.employee.parentDetails.parentContact,
            parentEmail: this.employee.parentDetails.parentEmail,
  
            address: this.employee.parentDetails.address,
  
            courseDetails: {
              course: this.employee.instituteDetails.courseId,
              discount: this.employee.instituteDetails.discount,
              additionalDiscount: this.employee.instituteDetails.additionalDiscount,
              netPayable: this.employee.instituteDetails.nextPayble,
            },
            feeDetails: {
              installments: this.employee.fee.installmentNumber,
              nextInstallment: this.employee.fee.nextInstallment,
              amountCollected: this.employee.fee.amountCollected,
              mode: this.employee.fee.mode,
            },
            materialRecord: this.employee.instituteDetails.materialRecord,
          });
  
          this.employees.get('employeeEmail').disable();
          this.employees.get('contact').disable();
  
          this.onSelectCourse(this.employee.instituteDetails.courseId);
  
          setTimeout(() => {
            this.employees
              .get('courseDetails')
              .patchValue({ batch: this.employee.instituteDetails.batchId });
          }, 200);
  
          this.calculateAmountPending();
        });
    }
  
    onSubmit() {
      if (this.employees.invalid) {
        return;
      }
  
      if (
        this.employees.value.courseDetails.batch === null ||
        this.employees.value.courseDetails.course === null
      ) {
        this.employees.value.courseDetails.batch = '';
        this.employees.value.courseDetails.course = '';
      }
  
      if (this.edit === 'true') {
        if (this.employee.instituteDetails.courseId !== this.employees.value.courseDetails.course) {
          // console.log('addStudentCourse');
          this.api.addStudentCourse(this.employees.value, this.routerId, this.employeeEduId).subscribe(
            (res) => {
              this.showToaster('top-right', 'success', 'New Student Course Added Successfully!');
              this.router.navigate([`/pages/institute/manage-employees/${this.routerId}`]);
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
        } else if (
          this.employee.instituteDetails.batchId !== this.employees.value.courseDetails.batch
        ) {
          // console.log('updateStudentCourse');
          this.api
            .updateStudentCourse(
              this.employees.value,
              this.employee._id,
              this.employee.instituteDetails._id,
              this.routerId,
              this.employeeEduId,
            )
            .subscribe(
              (res) => {
                this.showToaster('top-right', 'success', 'Student Course Updated Successfully!');
                this.router.navigate([`/pages/institute/manage-employees/${this.routerId}`]);
              },
              (err) => this.showToaster('top-right', 'danger', err.error.message),
            );
        } else {
          // console.log('updateStudentPersonalDetails');
          this.api
            .updateStudentPersonalDetails(this.employee._id, this.employees.value, this.employeeEduId)
            .subscribe(
              (res: any) => {
                this.showToaster('top-right', 'success', 'Student Personal details Updated!');
                this.router.navigate([`/pages/institute/manage-employees/${this.routerId}`]);
              },
              (err) => this.showToaster('top-right', 'danger', err.error.message),
            );
        }
      }
  
      if (!this.edit) {
        if (!this.alreadyRegistered) {
          this.api.addStudent(this.employees.value, this.routerId).subscribe(
            (data) => {
              this.showToaster('top-right', 'success', 'New Employee Added Successfully!');
              setTimeout(() => {
                this.router.navigate([`/pages/institute/manage-employees/${this.routerId}`]);
              }, 1000);
            },
            (err) => {
              if (err.error.message.includes('E11000 duplicate key error collection')) {
                this.showToaster(
                  'top-right',
                  'danger',
                  'This Student Already Exist, Please Search Student By EDU-Atlas ID',
                );
                this.alreadyRegistered = true;
                return;
              }
              this.showToaster('top-right', 'danger', err.error.message);
            },
          );
        } else {
          if (this.employeeEduId) {
            this.api
              .addStudentCourse(this.employees.value, this.routerId, this.employeeEduId)
              .subscribe(
                (res) => {
                  this.showToaster('top-right', 'success', 'Student Course Added Successfully!');
                  this.router.navigate([`/pages/institute/manage-employees/${this.routerId}`]);
                },
                (err) => this.showToaster('top-right', 'danger', err.error.message),
              );
          } else {
            this.showToaster('top-right', 'danger', 'Invalud Eduatlas ID');
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