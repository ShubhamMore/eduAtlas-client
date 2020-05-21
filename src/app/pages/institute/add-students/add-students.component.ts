import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HttpParams } from '@angular/common/http';
import { MENU_ITEMS } from '../../pages-menu';

@Component({
  selector: 'ngx-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {
  students: FormGroup;

  eduIdForm: FormGroup;

  routerId: string;
  submitted = false;

  institute: any;

  modes = ['Cash', 'Chaque/DD', 'Card', 'Others'];

  discounts: any[];
  courses: any[];
  batches: any[];

  selectedCourse: any;
  selectedDiscount: any;
  amountPending: number = 0;

  edit: string;
  studentEduId: string;
  courseId: string;

  student: any;

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

    this.routerId = this.active.snapshot.paramMap.get('id');

    this.active.queryParams.subscribe((data) => {
      this.studentEduId = data.student;
      this.courseId = data.course;
      this.edit = data.edit;
    });

    this.getCourseTd(this.routerId);

    if (this.edit === 'true') {
      this.getStudent(this.studentEduId, this.routerId, this.courseId);
    }

    this.students = this.fb.group({
      name: ['', Validators.required],
      rollNo: ['', Validators.required],
      studentEmail: ['', Validators.compose([Validators.required, Validators.email])],
      contact: ['', Validators.compose([Validators.required])],

      parentName: [''],
      parentContact: [''],
      parentEmail: ['', Validators.email],

      address: [''],

      courseDetails: this.fb.group({
        course: [''],
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
    // console.log(this.mode[1].name)
  }

  get f() {
    return this.students.controls;
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
    this.students.get('courseDetails').patchValue({ batch: '' });
    this.calculateNetPayableAmount();
  }

  onSelectDiscount(id: string) {
    this.selectedDiscount = this.discounts.find((dicount: any) => dicount.id === id);
    this.calculateNetPayableAmount();
  }

  calculateNetPayableAmount() {
    let calculatedAmount = 0;
    const additionalDiscount = this.students.get(['courseDetails', 'additionalDiscount']).value;
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
    this.students.get("courseDetails").patchValue({netPayable: calculatedAmount})
    this.calculateAmountPending();
  }

  calculateAmountPending() {
    const netPayableAmount = this.students.get(['courseDetails', 'netPayable']).value;
    const amountCollected = this.students.get(['feeDetails', 'amountCollected']).value;

    if (amountCollected && netPayableAmount) {
      this.amountPending = netPayableAmount - amountCollected;
    } else {
      this.amountPending = netPayableAmount;
    }
  }

  getStudent(student: string, institute: string, course: string) {
    this.api
      .getOneStudentByInstitute({ eduatlasId: student, instituteId: institute, courseId: course })
      .subscribe((data: any) => {
        this.student = data[0];
        this.students.patchValue({
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

        this.onSelectCourse(this.student.instituteDetails.courseId);

        this.students
          .get('courseDetails')
          .patchValue({ batch: this.student.instituteDetails.batchId });

        this.calculateAmountPending();
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.students.invalid) {
      return;
    }

    if (
      this.students.value.courseDetails.batch === null ||
      this.students.value.courseDetails.course === null
    ) {
      this.students.value.courseDetails.batch = '';
      this.students.value.courseDetails.course = '';
    }

    if (this.edit === 'true') {
      const studentMetaData = {};

      if (this.student.instituteDetails.courseId !== this.students.value.courseDetails.course) {
        this.api
          .updateStudentCourse(this.students.value, this.routerId, this.studentEduId)
          .subscribe(
            (res) => {
              this.updateToaster('top-right', 'success');
              this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
            },
            (err) => this.invalidToast('top-right', 'danger', err.error.message),
          );
      } else {
        this.api.updateStudent(this.students.value, studentMetaData).subscribe(
          (res) => {
            this.updateToaster('top-right', 'success');
            this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
          },
          (err) => this.invalidToast('top-right', 'danger', err.error.message),
        );
      }
    }

    if (!this.edit) {
      this.api.addStudent(this.students.value, this.routerId).subscribe(
        (data) => {
          this.showToaster('top-right', 'success');
          setTimeout(() => {
            this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
          }, 1000);
        },
        (err) => this.invalidToast('top-right', 'danger', err.error.message),
      );
    }
  }

  showToaster(position, status) {
    this.toasterService.show(status || 'Success', `Student successfully added`, {
      position,
      status,
    });
  }

  updateToaster(position, status) {
    this.toasterService.show(status || 'Success', `Student successfully Updated`, {
      position,
      status,
    });
  }

  invalidToast(position, status, message) {
    this.toasterService.show(status || 'Danger', message, { position, status });
  }
}
