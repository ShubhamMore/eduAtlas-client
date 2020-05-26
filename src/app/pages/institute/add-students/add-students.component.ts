import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {
  studentForm: FormGroup;
  eduAtlasStudentIdForm: FormGroup;

  instituteId: string;
  institute: any;

  modes = ['Cash', 'Cheque/DD', 'Card', 'Others'];

  discounts: any[];
  courses: any[];
  batches: any[];

  selectedCourse: any;
  selectedDiscount: any;
  amountPending: number;

  edit: string;
  studentEduId: string;
  courseId: string;

  student: any;

  alreadyRegistered: boolean;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.alreadyRegistered = false;
    this.amountPending = 0;
    this.courses = [];
    this.batches = [];
    this.discounts = [];

    this.instituteId = this.route.snapshot.paramMap.get('id');

    this.route.queryParams.subscribe((data) => {
      this.studentEduId = data.student;
      this.courseId = data.course;
      this.edit = data.edit;

      this.studentForm = this.fb.group({
        name: ['', Validators.required],
        rollNo: ['', Validators.required],
        studentEmail: ['', Validators.compose([Validators.required, Validators.email])],
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

      this.eduAtlasStudentIdForm = this.fb.group({
        idInput1: ['EDU', Validators.required],
        idInput2: ['', Validators.required],
        idInput3: ['ST', Validators.required],
        idInput4: ['', Validators.required],
      });

      this.getCourseTd(this.instituteId);

      if (this.edit === 'true') {
        this.alreadyRegistered = true;
        this.getStudent(this.studentEduId, this.instituteId, this.courseId);
      }
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  get eduAtlasStudentIdControl() {
    return this.eduAtlasStudentIdForm.controls;
  }

  onStudentSearch() {
    if (this.eduAtlasStudentIdForm.valid) {
      const studentEduId = `${this.eduAtlasStudentIdControl['idInput1'].value}-${this.eduAtlasStudentIdControl['idInput2'].value}-${this.eduAtlasStudentIdControl['idInput3'].value}-${this.eduAtlasStudentIdControl['idInput4'].value}`;
      this.api.getOneStudent(studentEduId).subscribe((data: any) => {
        if (data) {
          this.studentForm.patchValue({
            name: data.basicDetails.name,
            rollNo: data.basicDetails.rollNumber,
            studentEmail: data.basicDetails.studentEmail,
            contact: data.basicDetails.studentContact,

            parentName: data.parentDetails.name,
            parentContact: data.parentDetails.parentContact,
            parentEmail: data.parentDetails.parentEmail,

            address: data.parentDetails.address,
          });

          this.studentForm.get('studentEmail').disable();
          this.studentForm.get('contact').disable();

          this.studentEduId = studentEduId;
        } else {
          this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
        }
      });
    }
  }

  changeAlreadyRegistered(e: any) {
    this.alreadyRegistered = e;
    if (!e) {
      this.eduAtlasStudentIdForm.reset({ idInput1: 'EDU', idInput3: 'ST' });
      this.studentForm.reset();
      this.studentEduId = null;
    }
  }

  getCourseTd(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.courses = data.course;
      this.discounts = data.discount;
    });
  }

  onSelectCourse(id: string) {
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
    this.selectedCourse = this.courses.find((course: any) => course.id === id);
    this.studentForm.get('courseDetails').patchValue({ batch: '' });
    this.studentForm.get('feeDetails').reset();
    this.studentForm.get('materialRecord').reset();
    this.calculateNetPayableAmount();
  }

  onSelectDiscount(id: string) {
    this.selectedDiscount = this.discounts.find((dicount: any) => dicount.id === id);
    this.calculateNetPayableAmount();
  }

  calculateNetPayableAmount() {
    let calculatedAmount = 0;
    const additionalDiscount = this.studentForm.get(['courseDetails', 'additionalDiscount']).value;
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
    this.studentForm.get('courseDetails').patchValue({ netPayable: calculatedAmount });
    this.calculateAmountPending();
  }

  calculateAmountPending() {
    const netPayableAmount = this.studentForm.get(['courseDetails', 'netPayable']).value;
    const amountCollected = this.studentForm.get(['feeDetails', 'amountCollected']).value;

    if (amountCollected && netPayableAmount) {
      this.amountPending = netPayableAmount - amountCollected;
    } else {
      this.amountPending = netPayableAmount;
    }
  }

  getStudent(studentEduId: string, institute: string, course: string) {
    this.api
      .getOneStudentByInstitute({
        eduatlasId: studentEduId,
        instituteId: institute,
        courseId: course,
      })
      .subscribe((data: any) => {
        this.student = data[0];

        const eduAtlId = this.studentEduId.split('-');

        this.eduAtlasStudentIdForm.patchValue({
          idInput1: eduAtlId[0],
          idInput2: eduAtlId[1],
          idInput3: eduAtlId[2],
          idInput4: eduAtlId[3],
        });

        this.eduAtlasStudentIdForm.get('idInput2').disable();
        this.eduAtlasStudentIdForm.get('idInput4').disable();
        this.studentForm.patchValue({
          name: this.student.basicDetails.name,
          rollNo: this.student.basicDetails.rollNumber,
          studentEmail: this.student.basicDetails.studentEmail,
          contact: this.student.basicDetails.studentContact,

          parentName: this.student.parentDetails.name,
          parentContact: this.student.parentDetails.parentContact,
          parentEmail: this.student.parentDetails.parentEmail,

          address: this.student.parentDetails.address,

          courseDetails: {
            course: this.student.instituteDetails.courseId,
            discount: this.student.instituteDetails.discount,
            additionalDiscount: this.student.instituteDetails.additionalDiscount,
            netPayable: this.student.instituteDetails.nextPayble,
          },
          feeDetails: {
            installments: this.student.fee.installmentNumber,
            nextInstallment: this.student.fee.nextInstallment,
            amountCollected: this.student.fee.amountCollected,
            mode: this.student.fee.mode,
          },
          materialRecord: this.student.instituteDetails.materialRecord,
        });

        this.studentForm.get('studentEmail').disable();
        this.studentForm.get('contact').disable();

        this.onSelectCourse(this.student.instituteDetails.courseId);

        setTimeout(() => {
          this.studentForm
            .get('courseDetails')
            .patchValue({ batch: this.student.instituteDetails.batchId });
        }, 200);

        this.calculateAmountPending();
      });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      return;
    }

    if (
      this.studentForm.value.courseDetails.batch === null ||
      this.studentForm.value.courseDetails.course === null
    ) {
      this.studentForm.value.courseDetails.batch = '';
      this.studentForm.value.courseDetails.course = '';
    }

    if (this.edit === 'true') {
      if (this.student.instituteDetails.courseId !== this.studentForm.value.courseDetails.course) {
        this.api
          .addStudentCourse(this.studentForm.value, this.instituteId, this.studentEduId)
          .subscribe(
            (res) => {
              this.showToaster('top-right', 'success', 'New Student Course Added Successfully!');
              this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
      } else if (
        this.student.instituteDetails.batchId !== this.studentForm.value.courseDetails.batch
      ) {
        this.api
          .updateStudentCourse(
            this.studentForm.value,
            this.student._id,
            this.student.instituteDetails._id,
            this.instituteId,
            this.studentEduId,
          )
          .subscribe(
            (res) => {
              this.showToaster('top-right', 'success', 'Student Course Updated Successfully!');
              this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
      } else {
        this.api
          .updateStudentPersonalDetails(
            this.student._id,
            this.studentForm.value,
            this.studentEduId,
            this.student.basicDetails.studentContact,
            this.student.basicDetails.studentEmail,
          )
          .subscribe(
            (res: any) => {
              this.showToaster('top-right', 'success', 'Student Personal details Updated!');
              this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
      }
    }

    if (!this.edit) {
      if (!this.alreadyRegistered) {
        this.api.addStudent(this.studentForm.value, this.instituteId).subscribe(
          (data) => {
            this.showToaster('top-right', 'success', 'New Student Added Successfully!');
            setTimeout(() => {
              this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
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
            this.alreadyRegistered = true;
            this.showToaster('top-right', 'danger', err.error.message);
          },
        );
      } else {
        if (this.studentEduId) {
          this.api
            .addStudentCourse(this.studentForm.value, this.instituteId, this.studentEduId)
            .subscribe(
              (res) => {
                this.showToaster('top-right', 'success', 'Student Course Added Successfully!');
                this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
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
