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
  routerId: string;
  submitted = false;
  modes = ['Cash', 'Chaque/DD', 'Card', 'Others'];
  selectedItem = '1';
  studentEmail: string;
  discounts: { discount: [{ _id: ''; code: ''; description: ''; amount: '' }] };
  courses = { course: [{ discription: '', fee: '', gst: '', name: '', totalFee: '' }] };
  batches = { batch: [{ _id: '', course: '', batchCode: '', description: '' }] };
  edit: string;
  student = {
    active: false,
    basicDetails: { name: '', rollNumber: '', studentEmail: '', studentContact: '' },
    courseDetails: { course: '', batch: '', discount: '', nextPayble: '', additionalDiscount: '' },
    fee: { amountCollected: '', installmentNumber: '', mode: '', nextInstallment: '' },
    instituteId: '',
    parentDetails: { name: '', parentContact: '', parentEmail: '', address: '' },
    _id: '',
  };
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
      this.studentEmail = data.email;
      this.edit = data.edit;
      console.log('query param  ', this.studentEmail, this.edit);
      this.getStudent(this.studentEmail);
    });
    this.getCourses(this.routerId);
    this.getBatches(this.routerId);
    this.getDiscounts(this.routerId);
    this.students = this.fb.group({
      id: [this.routerId],
      name: ['', Validators.required],
      rollNo: ['', Validators.required],
      studentEmail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ]),
      ],

      contact: [
        '',
        Validators.compose([Validators.pattern(/^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/)]),
      ],
      parentName: [''],
      parentContact: [
        '',
        Validators.compose([Validators.pattern(/^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/)]),
      ],
      parentEmail: [
        '',
        Validators.compose([Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
      ],
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
  getBatches(id) {
    this.api.getBatches(id).subscribe((data) => {
      this.batches = JSON.parse(JSON.stringify(data));
      console.log('my batch', this.batches.batch);
    });
  }

  getCourses(id) {
    this.api.getCourses(id).subscribe((data) => {
      //this.courses = JSON.stringify(data);
      const course = JSON.stringify(data);
      this.courses = JSON.parse(course);
      console.log('===============>', this.courses.course[0]);
    });
  }
  getDiscounts(id) {
    this.discounts = { discount: [{ _id: '', code: '', description: '', amount: '' }] };
    this.api.getDiscounts(id).subscribe(
      (data) => {
        console.log(data);
        const dis = JSON.stringify(data);
        this.discounts = JSON.parse(dis);
        console.log('Discount ====>', this.discounts.discount);
      },
      (err) => console.error(err),
    );
  }
  getStudent(email: string) {
    let param = new HttpParams();
    param = param.append('instituteId', this.routerId);
    param = param.append('studentEmail', email);
    this.api.getStudent(param).subscribe((data) => {
      this.student = data;
      console.log('student ', this.student);
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
          course: this.student.courseDetails.course,
          batch: this.student.courseDetails.batch,
          discount: this.student.courseDetails.discount,
          additionalDiscount: this.student.courseDetails.additionalDiscount,
          netPayable: this.student.courseDetails.nextPayble,
        },

        feeDetails: {
          installments: this.student.fee.installmentNumber,
          nextInstallment: this.student.fee.nextInstallment,
          amountCollected: this.student.fee.amountCollected,
          mode: this.student.fee.mode,
        },
      });
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.students.invalid) {
      return;
    }
    console.log('===============>', this.students.value);
    if (
      this.students.value.courseDetails.batch === null ||
      this.students.value.courseDetails.course === null
    ) {
      this.students.value.courseDetails.batch = '';
      this.students.value.courseDetails.course = '';
    }
    if (this.edit === 'true') {
      let param = new HttpParams();
      param = param.append('instituteId', this.routerId);
      param = param.append('studentEmail', this.studentEmail);
      this.api.updateStudent(param, this.students.value).subscribe(
        (res) => {
          console.log(res), this.updateToaster('top-right', 'success');
        },
        (err) => console.log(err),
      );
    }

    if (!this.edit) {
      this.api.addStudent(this.students.value).subscribe((data) => {
        console.log(data);
        this.showToaster('top-right', 'success');
        setTimeout(() => {
          this.router.navigate([`/pages/institute/manage-students/${this.routerId}`]);
        }, 1000);
      });
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
  invalidToast(position, status) {
    this.toasterService.show(
      status || 'Danger',
      'Student Email and Student Contact must be unique',
      { position, status },
    );
  }
}
