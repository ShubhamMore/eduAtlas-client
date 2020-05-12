import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.scss'],
})
export class AttandanceComponent implements OnInit {
  attandance: FormGroup;
  courses = { course: [{ discription: '', gst: '', _id: '', name: '', totalFee: '' }] };
  batches = { batch: [{ batchCode: '', course: '', description: '', _id: '' }] };
  students = [
    {
      active: false,
      anouncement: '',
      basicDetails: { name: '', rollNumber: '', studentContact: '', studentEmail: '' },
      courseDetails: { course: '', batch: '' },
    },
  ];
  constructor(private api: ApiService, private active: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.getCourses(this.active.snapshot.paramMap.get('id'));
    this.getBatches(this.active.snapshot.paramMap.get('id'));
    this.getStudents(this.active.snapshot.paramMap.get('id'));
    this.attandance = this.fb.group({
      // course: ['', Validators.required],
      batchId: ['', Validators.required],
      allStudentsPresent: [],
      absentees: [['']],
    });
  }
  getCourses(id) {
    this.api.getCourses(id).subscribe((data) => {
      this.courses = JSON.parse(JSON.stringify(data));
      console.log('courses=> ', this.courses);
    });
  }
  getBatches(id) {
    this.api.getBatches(id).subscribe((data) => {
      this.batches = JSON.parse(JSON.stringify(data));
      console.log('batches=> ', this.batches);
    });
  }
  getStudents(id) {
    this.api.getStudents(id).subscribe((res) => {
      this.students = res;
      console.log('students=> ', this.students);
    });
  }
  present(check) {
    this.attandance.patchValue({
      allStudentsPresent: check,
    });
  }
  clone(check) {
    console.log(check);
  }
}
