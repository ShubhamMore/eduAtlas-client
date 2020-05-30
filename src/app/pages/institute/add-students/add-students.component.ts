import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { generate } from 'rxjs';

@Component({
  selector: 'ngx-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss'],
})
export class AddStudentsComponent implements OnInit {
  // Student Form
  studentForm: FormGroup;
  // Fee Details Form
  feeDetailsForm: FormGroup;
  // Eduatlas Id Form
  eduAtlasStudentIdForm: FormGroup;

  // Institute/Branch Id
  instituteId: string;

  // Institute/Branch set when getCourseTD() called
  institute: any;

  // Mode of Payments
  modes = ['Cash', 'Cheque/DD', 'Card', 'Others'];

  // Institute Discount Array
  discounts: any[];
  // Institute Course Array
  courses: any[];
  // Course Batch Array
  batches: any[];

  // Course Duration in months (default 12)
  duration: number;
  // Check if Fees are updated or not only in editing mode
  feesUpdated: boolean;

  // Course set in editing Mode
  selectedCourse: any;
  // Selected Institute Discount
  selectedDiscount: any;
  // Total Net Payable Amount
  netPayable: number;
  // Total Pending Amount
  pendingAmount: number;
  // Total Amount Collected
  amountCollected: number;

  // Installment Type (0 => paid once and 1 => Custom)
  installmentType: string; //
  // No of INstallments
  noOfInstallments: string;

  // Set in editing Mode
  edit: string;
  // Student Eduatlas Id (set in editing mode or already registered mode)
  studentEduId: string;
  // set in editing mode
  courseId: string;

  // set in editing mode or already registered mode
  student: any;
  // set in editing mode
  studentFees: any;

  // set if student is already registered
  alreadyRegistered: boolean;

  // Date in milliseconds from 1 Jan, 1970
  date: number;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.alreadyRegistered = false;
    this.feesUpdated = false;
    this.installmentType = '0';
    this.netPayable = 0;
    this.pendingAmount = 0;
    this.amountCollected = 0;
    this.courses = [];
    this.batches = [];
    this.discounts = [];
    this.duration = 12;
    this.date = Date.now();

    // Set institute Id
    this.instituteId = this.route.snapshot.paramMap.get('id');

    // Get and set query parameters
    this.route.queryParams.subscribe((data) => {
      this.studentEduId = data.student;
      this.courseId = data.course;
      this.edit = data.edit;

      // Construct Eduatlas Id Form
      this.eduAtlasStudentIdForm = this.fb.group({
        idInput1: ['EDU', Validators.required],
        idInput2: ['', Validators.required],
        idInput3: ['ST', Validators.required],
        idInput4: ['', Validators.required],
      });

      // Construct Student Form
      this.studentForm = this.fb.group({
        // Student Basic Details
        name: ['', Validators.required],
        studentEmail: ['', Validators.compose([Validators.required, Validators.email])],
        contact: ['', Validators.compose([Validators.required])],

        // Student Parent Details
        parentName: [''],
        parentContact: [''],
        parentEmail: ['', Validators.email],
        address: [''],

        // Student Course Details
        courseDetails: this.fb.group({
          course: ['', Validators.required],
          batch: [''],
          rollNo: ['', Validators.required],
          discount: [''],
          additionalDiscount: [''],
          netPayable: [''],
        }),

        // Course Material Records
        materialRecord: [''],
      });

      // Fee Details Form
      this.feeDetailsForm = this.fb.group({
        installmentType: [this.installmentType],
        date: [this.constructDate(this.date)],
        noOfInstallments: ['1'],
        amountCollected: ['0'],
        totalAmount: ['0'],
        pendingAmount: ['0'],
        // Installments Form Array
        installments: this.fb.array([]),
      });

      // Initially Installment Type is Disabled
      this.feeDetailsForm.get('installmentType').disable();

      // Call onSelectInstallmentType() with initial Value i.e. 0
      this.onSelectInstallmentType(this.installmentType);
      // Call GetCourseTd() to get all courses related to Institute
      this.getCourseTd(this.instituteId);

      // Check Editing Mode
      if (this.edit === 'true') {
        // Already Registered is set to true
        this.alreadyRegistered = true;
        // get Student for Editing using studentEduId, instituteId and CourseId
        this.getStudent(this.studentEduId, this.instituteId, this.courseId);
      }
    });
  }

  // get Student Form
  get f() {
    return this.studentForm.controls;
  }

  // get Eduatlas Form
  get eduAtlasStudentIdControl() {
    return this.eduAtlasStudentIdForm.controls;
  }

  // Search Student By Eduatlas Id
  onStudentSearch() {
    if (this.eduAtlasStudentIdForm.valid) {
      // Construct Eduatlas Id to search student
      const studentEduId = `${this.eduAtlasStudentIdControl['idInput1'].value}-${this.eduAtlasStudentIdControl['idInput2'].value}-${this.eduAtlasStudentIdControl['idInput3'].value}-${this.eduAtlasStudentIdControl['idInput4'].value}`;
      this.api.getOneStudent(studentEduId).subscribe((data: any) => {
        if (data) {
          // Set Student Form Values
          this.studentForm.patchValue({
            name: data.basicDetails.name,
            studentEmail: data.basicDetails.studentEmail,
            contact: data.basicDetails.studentContact,

            parentName: data.parentDetails.name,
            parentContact: data.parentDetails.parentContact,
            parentEmail: data.parentDetails.parentEmail,

            address: data.parentDetails.address,
          });

          // IN editing Mode or Already Registered mode Student Email field is Disabled
          // (Enable Only in Add New Student Mode)
          this.studentForm.get('studentEmail').disable();
          // IN editing Mode or Already Registered mode Student Contact field is Disabled
          // (Enable Only in Add New Student Mode)
          this.studentForm.get('contact').disable();
          // Set Class Level Eduatlas Id
          this.studentEduId = studentEduId;
        } else {
          this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
        }
      });
    }
  }

  // Change if Student is Already Registered
  changeAlreadyRegistered(e: any) {
    // set true or false
    this.alreadyRegistered = e;
    if (!e) {
      // if False i.e. Student is New to Eduatlas
      // reset eduatlas form
      this.eduAtlasStudentIdForm.reset({ idInput1: 'EDU', idInput3: 'ST' });
      // reset Student Form
      this.studentForm.reset();
      // set to null if previously set
      this.studentEduId = null;
    }
  }

  // Get All Courses of Institute / Get one Institute
  getCourseTd(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      this.courses = data.course;
      this.discounts = data.discount;
    });
  }

  // Fee Details Form Date is Changed
  dateChanged(date: any) {
    this.date = new Date(date).getTime();
    // Set Installment Dates
    this.setDates();
  }

  // Construct date in yyyy-MM-dd format to set in DOM form field
  constructDate(dateInMillisecond: number) {
    const date = new Date(dateInMillisecond);
    return `${date.getFullYear()}-${this.appendZero(date.getMonth() + 1)}-${this.appendZero(
      date.getDate(),
    )}`;
  }

  // Append zero for single digit Date and Month
  appendZero(n: number): string {
    if (n < 10) {
      return '0' + n;
    }
    return '' + n;
  }

  // Change Course From DOM
  onSelectCourse(id: string) {
    // Find Batches of Selected Course
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
    // Set Selected Course
    this.selectedCourse = this.courses.find((course: any) => course.id === id);
    // Set Selected Course Duration
    this.duration = +this.selectedCourse.duration;
    // reset Course Details Batch in DOM
    this.studentForm.get('courseDetails').patchValue({ batch: '' });
    // reset Course Material Records
    this.studentForm.get('materialRecord').reset();
    // Enable Installment Type
    this.feeDetailsForm.get('installmentType').enable();

    this.installmentType = '0';
    this.feeDetailsForm.patchValue({ installmentType: this.installmentType });
    if (this.edit) {
      this.date = new Date().getTime();
      this.feeDetailsForm.get('date').enable();
      this.feeDetailsForm.patchValue({ date: this.constructDate(this.date) });
    }
    // Calculate Net Payable Amount
    this.calculateNetPayableAmount();
  }

  // Select Discount From DOM
  onSelectDiscount(id: string) {
    // Set Selected Discount
    this.selectedDiscount = this.discounts.find((dicount: any) => dicount.id === id);
    // Calculate Net Payable Amount
    this.calculateNetPayableAmount();
  }

  // Calculate Net Payable Amount
  calculateNetPayableAmount() {
    // Set Class Level netPayable to 0
    this.netPayable = 0;
    let calculatedAmount = 0;
    // Get Additional Discount
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

    // Set Class Level netPayable to Calculated Net PAyable
    this.netPayable = calculatedAmount;
    // Set netPayable in DOM
    this.studentForm.get('courseDetails').patchValue({ netPayable: calculatedAmount });
    this.feeDetailsForm.patchValue({ totalAmount: calculatedAmount });
    // Calculate Pending Amount
    this.calculatePendingAmount();
    // Call onSelectInstallmentType() for class level installmentType
    this.onSelectInstallmentType(this.installmentType);
  }

  // Calculate Pending Amount
  calculatePendingAmount() {
    // Set Class level pending amount to 0
    this.pendingAmount = 0;
    const amountPaid = this.feeDetailsForm.get('amountCollected').value;
    this.pendingAmount = +this.netPayable - (amountPaid ? amountPaid : 0);
    this.feeDetailsForm.patchValue({ pendingAmount: this.pendingAmount });
  }

  // Change paid amount from Fee Detail Form in DOM
  onPaidAmount(paid: any, i: number) {
    // Initially confirm is true
    let confirm = true;
    if (this.edit) {
      this.feesUpdated = true;
    }
    if (paid) {
      confirm = null;
      // Confirm if User really wants to make this installment as paid ot not
      confirm = window.confirm('Do you want to make this installment as Paid?');
    }
    // id confirm is true
    if (confirm) {
      // Get installment array from FeeDetails form
      const installment = this.feeDetailsForm.get('installments') as FormArray;
      // get selected installment amount
      const amount = +installment.controls[i].get('amount').value;
      // if paid = true i.e Checked in dom
      if (paid) {
        // Set paid Status to true
        installment.controls[i].patchValue({ paidStatus: true });
        // Calculate and set Amount collected
        this.amountCollected = +this.amountCollected + amount;
      } else {
        // Set paid Status to false i.e. Unchecked
        installment.controls[i].patchValue({ paidStatus: false });
        // Calculate and set Amount collected
        this.amountCollected = +this.amountCollected - amount;
      }
      // Set amount collected in DOM
      this.feeDetailsForm.patchValue({ amountCollected: this.amountCollected });
      // Calculate Pending Amount
      this.calculatePendingAmount();
    }
  }

  // Change Installment Type from DOM
  onSelectInstallmentType(installmentType: any) {
    // Initial amount collected is set to 0
    this.feeDetailsForm.patchValue({ amountCollected: '0' });
    this.installmentType = installmentType;
    if (installmentType === '0') {
      // on payment once installment Type noOfInstallments id disabled
      this.feeDetailsForm.get('noOfInstallments').disable();
      // call generateNoOfInstallments for only one installment
      this.generateNoOfInstallments('1');
    } else {
      // on custom installment Type noOfInstallments id enabled
      this.feeDetailsForm.get('noOfInstallments').enable();
      // call generateNoOfInstallments for noOfInstallments
      this.generateNoOfInstallments(this.noOfInstallments);
    }
  }

  // Generate No of installments
  generateNoOfInstallments(noOfInstallments: string) {
    this.noOfInstallments = noOfInstallments;

    // Set Initial Amount collected to 0
    this.amountCollected = 0;

    this.feeDetailsForm.patchValue({ noOfInstallments: this.noOfInstallments });
    const installment = this.feeDetailsForm.get('installments') as FormArray;
    installment.controls = [];
    // Generate installment form group in dom for no of installments
    for (let i = 0; i < +noOfInstallments; i++) {
      const installmentData = {
        installmentNo: (i + 1).toString(),
        paidStatus: false,
        paidOn: '',
        amount: '',
        paymentMode: '',
        amountPending: '',
      };
      this.addInstallment(installmentData);
    }
    // Construct and Set Dates for Fee Details Instalment
    this.setDates();
    // Calculate and Set fees for Fee Details Instalment
    this.setFees();
  }

  // Calculate and Set fees for Fee Details Instalment
  setFees() {
    const amount = this.netPayable / +this.noOfInstallments;
    const installments = this.feeDetailsForm.get('installments') as FormArray;
    installments.controls.forEach((installment, i) => {
      let amountPending = this.pendingAmount - +(amount * (i + 1));
      amountPending = amountPending < 0 ? 0 : amountPending;
      installment.patchValue({
        amount: amount.toFixed(2),
        amountPending: amountPending.toFixed(2),
      });
    });
  }

  // calculate and Set Dates for Fee Details Instalment
  setDates() {
    const interval = 2592000000; // 30 Days Interval in milliseconds
    // calculate next installment duration
    const installmentDuration = this.duration / +this.noOfInstallments;
    const installments = this.feeDetailsForm.get('installments') as FormArray;
    installments.controls.forEach((installment, i) => {
      // Construct next Installment Date (first installment date is current date)
      const date = this.constructDate(this.date + interval * (installmentDuration * i));
      // set next installment Date
      installment.patchValue({
        paidOn: date,
      });
    });
  }

  // Installment Form Group
  installment(installmentData: any) {
    // Construct and return Installment Form Group and set default control values to given values if provided
    return this.fb.group({
      installmentNo: [installmentData.installmentNo ? installmentData.installmentNo : ''],
      paidStatus: [installmentData.paidStatus === 'true' ? true : false],
      paidOn: [installmentData.paidOn ? installmentData.paidOn : ''],
      amount: [installmentData.amount ? installmentData.amount : ''],
      paymentMode: [installmentData.paymentMode ? installmentData.paymentMode : ''],
      amountPending: [installmentData.amountPending ? installmentData.amountPending : ''],
    });
  }

  // Add INstallment FormGroup to INstallment FormArray in fee details form
  addInstallment(installmentData: any) {
    const installment = this.feeDetailsForm.get('installments') as FormArray;
    installment.push(this.installment(installmentData));
  }

  // Remove INstallment FormGroup to INstallment FormArray from fee details form
  removeInstallment(i: number) {
    const installment = this.feeDetailsForm.get('installments') as FormArray;
    installment.removeAt(installment[i]);
  }

  // Get Student Function (call only in editing mode)
  getStudent(studentEduId: string, institute: string, course: string) {
    this.api
      .getOneStudentByInstitute({
        eduatlasId: studentEduId,
        instituteId: institute,
        courseId: course,
      })
      .subscribe((data: any) => {
        this.student = data[0];
        // Assign student fees (Later change)
        this.studentFees = this.student.fees;

        const eduAtlId = this.studentEduId.split('-');

        // Set Student EduAtlas Id
        this.eduAtlasStudentIdForm.patchValue({
          idInput1: eduAtlId[0],
          idInput2: eduAtlId[1],
          idInput3: eduAtlId[2],
          idInput4: eduAtlId[3],
        });

        // Disable Eduatlas Id Input fields in editing Mode
        this.eduAtlasStudentIdForm.get('idInput2').disable();
        this.eduAtlasStudentIdForm.get('idInput4').disable();

        // Set Student Form Values
        this.studentForm.patchValue({
          // Set Student Basic Details
          name: this.student.basicDetails.name,
          studentEmail: this.student.basicDetails.studentEmail,
          contact: this.student.basicDetails.studentContact,

          // Set Student Parent Details
          parentName: this.student.parentDetails.name,
          parentContact: this.student.parentDetails.parentContact,
          parentEmail: this.student.parentDetails.parentEmail,

          // Set Student address
          address: this.student.parentDetails.address,

          // Set Student Course Details
          courseDetails: {
            course: this.student.instituteDetails.courseId,
            discount: this.student.instituteDetails.discount,
            rollNo: this.student.instituteDetails.rollNumber,
            additionalDiscount: this.student.instituteDetails.additionalDiscount,
            netPayable: this.student.instituteDetails.netPayble,
          },
          materialRecord: this.student.instituteDetails.materialRecord,
        });

        // Disable Student email in editing mode
        this.studentForm.get('studentEmail').disable();
        // Disable Student contact in editing mode
        this.studentForm.get('contact').disable();
        // Select and set Student Course
        this.onSelectCourse(this.student.instituteDetails.courseId);

        // Select Student batch if assigned
        setTimeout(() => {
          this.studentForm
            .get('courseDetails')
            .patchValue({ batch: this.student.instituteDetails.batchId });
        }, 200);

        // Set Fee Details Form

        this.feeDetailsForm.patchValue({
          installmentType: this.studentFees.installmentType,
          noOfInstallments: this.studentFees.noOfInstallments,
          date: this.studentFees.date,
          totalAmount: this.studentFees.totalAmount,
          pendingAmount: this.studentFees.pendingAmount,
          amountCollected: this.studentFees.amountCollected,
        });

        this.feeDetailsForm.get('installmentType').disable();
        this.feeDetailsForm.get('noOfInstallments').disable();
        this.feeDetailsForm.get('date').disable();

        this.netPayable = this.studentFees.totalAmount;
        this.pendingAmount = this.studentFees.pendingAmount;
        this.amountCollected = this.studentFees.amountCollected;

        const installment = this.feeDetailsForm.get('installments') as FormArray;
        installment.controls = [];

        this.studentFees.installments.forEach((curInstallment: any, i: number) => {
          const installmentData = {
            installmentNo: curInstallment.installmentNo,
            paidStatus: curInstallment.paidStatus,
            paidOn: curInstallment.paidOn,
            amount: curInstallment.amount,
            paymentMode: curInstallment.paymentMode,
            amountPending: curInstallment.amountPending,
          };
          this.addInstallment(installmentData);

          // if (curInstallment.paidStatus === 'true') {
          //   installment.controls[i].get('paidStatus').disable();
          //   installment.controls[i].get('paymentMode').disable();
          // }
        });
      });
  }

  addFees(studentId: string, studentEduatlasId: string) {
    this.feeDetailsForm.value.noOfInstallments = this.noOfInstallments;
    this.api
      .addStudentFees(
        studentId,
        this.instituteId,
        studentEduatlasId,
        this.studentForm.get('courseDetails').value.course,
        this.feeDetailsForm.value,
      )
      .subscribe(
        (res: any) => {
          this.showToaster('top-right', 'success', 'New Student Course Added Successfully!');
          this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
        },
        (err: any) => {
          this.showToaster('top-right', 'danger', err.error.message);
        },
      );
  }

  onSelectPaymentMode() {
    if (this.edit) {
      this.feesUpdated = true;
    }
  }

  updateFees(studentId: string, feeId: string) {
    this.feeDetailsForm.value.noOfInstallments = this.noOfInstallments;
    this.api.updateStudentFees(this.studentFees._id, this.feeDetailsForm.value).subscribe(
      (res: any) => {
        this.showToaster('top-right', 'success', 'Student Fees Successfully!');
        this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
      },
      (err: any) => {
        this.showToaster('top-right', 'danger', err.error.message);
      },
    );
  }

  // Submit form From DOM
  onSubmit() {
    if (this.studentForm.invalid) {
      // If Form is invalid then return
      return;
    }

    // Check if batch is null then  set course Details batch to '' (to store in DB)
    if (this.studentForm.value.courseDetails.batch === null) {
      this.studentForm.value.courseDetails.batch = '';
    }

    // In editing Mode
    if (this.edit === 'true') {
      if (this.student.instituteDetails.courseId !== this.studentForm.value.courseDetails.course) {
        // If Course Changed add course to student course
        this.api
          .addStudentCourse(this.studentForm.value, this.instituteId, this.studentEduId)
          .subscribe(
            (res: any) => {
              // Call Student Add Fees Api
              this.addFees(this.student._id, this.studentEduId);
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
      } else if (
        this.student.instituteDetails.batchId !== this.studentForm.value.courseDetails.batch ||
        this.student.instituteDetails.rollNumber !== this.studentForm.value.courseDetails.rollNo
      ) {
        // If Batch changed then update student batch in student Course
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
              if (this.feesUpdated) {
                this.updateFees(this.student._id, this.studentFees._id);
              } else {
                this.showToaster('top-right', 'success', 'Student Course Updated Successfully!');
                this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
              }
            },
            (err) => this.showToaster('top-right', 'danger', err.error.message),
          );
      } else if (this.feesUpdated) {
        this.updateFees(this.student._id, this.studentFees._id);
      } else {
        // Student Personal Details Changed
        //   this.api
        //     .updateStudentPersonalDetails(
        //       this.student._id,
        //       this.studentForm.value,
        //       this.studentEduId,
        //       this.student.basicDetails.studentContact,
        //       this.student.basicDetails.studentEmail,
        //     )
        //     .subscribe(
        //       (res: any) => {
        //         this.showToaster('top-right', 'success', 'Student Personal details Updated!');
        //         this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
        //       },
        //       (err) => this.showToaster('top-right', 'danger', err.error.message),
        //     );
        this.router.navigate([`/pages/institute/manage-students/${this.instituteId}`]);
      }
    }

    // If not Editing Mode
    if (!this.edit) {
      if (!this.alreadyRegistered) {
        // If student is not already registered then Add new Student in DB
        this.api.addStudent(this.studentForm.value, this.instituteId).subscribe(
          (res: any) => {
            this.addFees(res._id, res.eduAtlasId);
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
          // If Student is Already registered then add new course to Student Course
          this.api
            .addStudentCourse(this.studentForm.value, this.instituteId, this.studentEduId)
            .subscribe(
              (res: any) => {
                // Call Student Add Fees Api
                this.addFees(this.student._id, this.studentEduId);
              },
              (err) => this.showToaster('top-right', 'danger', err.error.message),
            );
        } else {
          this.showToaster('top-right', 'danger', 'Invalid Eduatlas ID');
        }
      }
    }
  }

  // Show Toaster
  showToaster(position: any, status: any, message: any) {
    this.toasterService.show(status, message, {
      position,
      status,
    });
  }
}
