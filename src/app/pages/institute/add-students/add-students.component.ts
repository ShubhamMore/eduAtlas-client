import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { MENU_ITEMS } from '../../pages-menu';

@Component({
  selector: 'ngx-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {
  students: FormGroup;
  eduAtlasStudentForm: FormGroup;

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

    this.alreadyRegistered = false;

    this.routerId = this.active.snapshot.paramMap.get('id');

    this.active.queryParams.subscribe((data) => {
      this.studentEduId = data.student;
      this.courseId = data.course;
      this.edit = data.edit;
    });

    this.getCourseTd(this.routerId);

    if (this.edit === 'true') {
      this.alreadyRegistered = true;
      this.getStudent(this.studentEduId, this.routerId, this.courseId);
    }

    this.eduAtlasStudentForm = this.fb.group({
      idInput1: ['', Validators.required],
      idInput2: ['', Validators.required],
      idInput3: ['', Validators.required],
      idInput4: ['', Validators.required],
    });

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
  }

  get f() {
    return this.students.controls;
  }

  get eduAtlasStudentFormControl() {
    return this.eduAtlasStudentForm.controls;
  }

  onStudentSearch() {
    if (this.eduAtlasStudentForm.valid) {
      const studentEduId = `${this.eduAtlasStudentForm.value.idInput1}-${this.eduAtlasStudentForm.value.idInput2}-${this.eduAtlasStudentForm.value.idInput3}-${this.eduAtlasStudentForm.value.idInput4}`;
      this.api.getOneStudent(studentEduId).subscribe((data: any) => {
        if (data) {
          this.students.patchValue({
            name: data.basicDetails.name,
            rollNo: data.basicDetails.rollNumber,
            studentEmail: data.basicDetails.studentEmail,
            contact: data.basicDetails.studentContact,

            parentName: data.parentDetails.name,
            parentContact: data.parentDetails.parentContact,
            parentEmail: data.parentDetails.parentEmail,

            address: data.parentDetails.address,
          });
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
      this.eduAtlasStudentForm.reset();
      this.students.reset();
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
    this.students.get('courseDetails').patchValue({ batch: '' });
    this.students.get('feeDetails').reset(),
      this.students.get('materialRecord').reset(),
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
    this.students.get('courseDetails').patchValue({ netPayable: calculatedAmount });
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
        // console.log(this.student);
        const eduAtlId = this.studentEduId.split('-');

        this.eduAtlasStudentForm.patchValue({
          idInput1: eduAtlId[0],
          idInput2: eduAtlId[1],
          idInput3: eduAtlId[2],
          idInput4: eduAtlId[3],
        });

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
      if (this.student.instituteDetails.courseId !== this.students.value.courseDetails.course) {
        // console.log('addStudentCourse');
        this.api.addStudentCourse(this.students.value, this.routerId, this.studentEduId).subscribe(
          (res) => {
            this.showToaster('top-right', 'success', 'New Student Course Added Successfully!');
            this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
          },
          (err) => this.showToaster('top-right', 'danger', err.error.message),
        );
      } else if (
        this.student.instituteDetails.batchId !== this.students.value.courseDetails.batch
      ) {
        // console.log('updateStudentCourse');
        this.api
          .updateStudentCourse(
            this.students.value,
            this.student._id,
            this.student.instituteDetails._id,
            this.routerId,
            this.studentEduId,
          )
          .subscribe(
            (res) => {
              this.showToaster('top-right', 'success', 'Student Course Updated Successfully!');
              this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
      } else {
        // console.log('updateStudentPersonalDetails');
        this.api
          .updateStudentPersonalDetails(this.student._id, this.students.value, this.studentEduId)
          .subscribe(
            (res: any) => {
              this.showToaster('top-right', 'success', 'Student Personal details Updated!');
              this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
      }
    }

    if (!this.edit) {
      if (!this.alreadyRegistered) {
        this.api.addStudent(this.students.value, this.routerId).subscribe(
          (data) => {
            this.showToaster('top-right', 'success', 'New Student Added Successfully!');
            setTimeout(() => {
              this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
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
        this.api.addStudentCourse(this.students.value, this.routerId, this.studentEduId).subscribe(
          (res) => {
            this.showToaster('top-right', 'success', 'Student Course Added Successfully!');
            this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
          },
          (err) => this.showToaster('top-right', 'danger', err.error.message),
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
