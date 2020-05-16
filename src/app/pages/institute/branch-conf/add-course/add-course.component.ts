import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { MENU_ITEMS } from '../../../pages-menu';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  course: FormGroup;
  submitted = false;
  institutes: any[] = [];
  institute: any[] = [];
  // students:any[]=[];
  display: boolean = false;
  routerId: string;
  edit: string;
  courseId: string;
  exclusiveGst: number = null;
  fees: number = null;
  gstCheckBox:boolean;
  updateCourse = {
    courseCode: '',
    name: '',
    fees: '',
    gst: '',
    gstValue: '',
    discription: '',
    totalFee: '',
  };
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private active: ActivatedRoute,
    private location: Location,
    private toasterService: NbToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((data) => {
      console.log(data);
      this.courseId = data.courseId;
      this.edit = data.edit;
    });
    if (this.edit === 'true') {
      this.getCourse(this.courseId);
    }
    this.course = this.fb.group({
      name: ['', Validators.required],
      courseCode: ['', Validators.required],
      fees: [''],
      gst: [''],
      gstValue:[''],
      discription: [''],
      totalFee: [''],
    });
    this.inclusiveGst(false);
  }
  getCourse(id) {
    let param = new HttpParams();
    param = param.append('instituteId', this.routerId);
    param = param.append('courseId', id);
    this.api.getCourse(param).subscribe(
      (data) => {
        console.log('getCourse ' + JSON.stringify(data[0]));
        this.updateCourse = JSON.parse(JSON.stringify(data[0]));
        console.log('getOcurse ' + this.updateCourse.courseCode);

        console.log(this.updateCourse);
        this.course.patchValue({
          name: this.updateCourse.name,
          courseCode: this.updateCourse.courseCode,
          fees: this.updateCourse.fees,
          gst: this.updateCourse.gst,
          gstValue:this.updateCourse.gstValue,
          discription: this.updateCourse.discription,
          totalFee: this.updateCourse.totalFee,
        });
        if(this.updateCourse.gst=='Inclusive'){
         this.gstCheckBox = true;
         this.course.get('gstValue').disable();
        }else{
          this.gstCheckBox = false;
          this.exclusiveGst = Number(this.updateCourse.gstValue);
        }
        this.fees = Number(this.updateCourse.fees);
      },
      (error) => console.log(error),
    );
  }
  getInstitutes() {
    this.api.getInstitutes().subscribe((data) => {
      this.institutes = data;

      console.log('institutes - ' + JSON.stringify(this.institutes));
      this.institute = JSON.parse(JSON.stringify(this.institutes));
      console.log(this.institute);
    });
    this.display = true;
  }
  get f() {
    return this.course.controls;
  }
  back() {
    this.location.back();
  }
  onSubmit() {
    this.submitted = true;
    if (this.course.invalid) {
      return;
    }
    console.log('editMode ' + this.edit);
    if (this.edit === 'true') {
      let param = new HttpParams();
      param = param.append('instituteId', this.routerId);
      param = param.append('courseId', this.courseId);
      this.api.updateCourse(param, this.course.value).subscribe(
        (res) => {
          console.log(res);
          this.showToast('top-right', 'success', 'Course Updated');
          setTimeout(() => {
            this.router.navigate(['/pages/institute/branch-config/manage-course/', this.routerId]);
          }, 1000);
        },
        (error) => {
          console.log(error);
          this.showToast('top-right', 'danger', 'Course Updation Failed');
        },
      );
    }

    console.log(this.course.value);
    if (!this.edit) {
      this.api.addCourse(this.routerId, this.course.value).subscribe(
        (data) => {
          console.log(data);
          this.showToast('top-right', 'success', 'Course Added Successfully');
          setTimeout(() => {
            this.router.navigate(['/pages/institute/branch-config/manage-course/', this.routerId]);
          }, 1000);
        },
        (err) => {
          console.error(err);
          this.invalid('top-right', 'danger',err.error.message);
        }
      );
    }
  }
  inclusiveGst(event) {
    var inclusive = event;
    if (inclusive) {
      this.course.get('gstValue').disable();
      this.course.patchValue({
        gst: 'Inclusive',
      });
    }
    if (!inclusive || null) {
      this.course.get('gstValue').enable();
      this.course.patchValue({
        gst: 'Exclusive',
      });
    }
    this.calculateTotalFees();
  }

  calculateTotalFees(){
    let total = 0;
    if(this.course.get('gst').value=='Inclusive'){
     total = this.fees;
    }else{
     if(this.exclusiveGst==null){
        total = this.fees;
      }else{
        total = this.fees + (this.exclusiveGst / 100) * this.fees;
      }
    }
    this.course.get('totalFee').setValue(total.toString());
  }

  exclusive(event) {
    this.exclusiveGst = +event;
    console.log('exclusiv ', this.exclusiveGst);
    let total = this.fees + (this.exclusiveGst / 100) * this.fees;
    console.log('type ', typeof this.fees, this.fees);
    this.course.patchValue({
      totalFee: total + '',
      gstValue:this.exclusiveGst
    });
    this.calculateTotalFees();
  }
  courseFee(event) {
    this.fees = +event;
    this.calculateTotalFees();
  }

  showToast(position, status,message) {
    this.toasterService.show(status || 'Success', message, {
      position,
      status,
    });
  }
  invalid(position, status,errorMessage) {
    if(errorMessage){
      this.toasterService.show(status || 'Danger', errorMessage, {
        position,
        status,
      });
    }else{
      this.toasterService.show(status || 'Danger', 'This course id already added', {
        position,
        status,
      });
    }
  }
}
