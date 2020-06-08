import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-online-class',
  templateUrl: './add-online-class.component.html',
  styleUrls: ['./add-online-class.component.scss'],
})
export class AddOnlineClassComponent implements OnInit {
  onlineClassForm: FormGroup;
  instituteId: string;

  institute: any;

  batches: any[] = [];
  teachers: any[] = [];

  display: boolean;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.display = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');

    this.onlineClassForm = this.fb.group({
      teacherId: ['', Validators.required],
      instituteId: [this.instituteId],
      courseId: ['', Validators.required],
      batchId: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['', Validators.required], // Num in Min
      topic: ['', Validators.required],
      agenda: [''],
      password: ['', Validators.required],
    });
    console.log(this.instituteId);
    this.getCourses(this.instituteId);
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      console.log(data);
      this.institute = data;
      this.getEmployees(this.instituteId);
    });
  }

  onSelectCourse(id: string) {
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }

  getEmployees(instituteId: string) {
    this.api.getEmployeesByInstituteId(instituteId).subscribe((data: any) => {
      this.teachers = data;
      console.log(data);
      this.display = true;
    });
  }

  saveOnlineClass() {
    if (this.onlineClassForm.valid) {
      const date =
        this.onlineClassForm.value.startDate + 'T' + this.onlineClassForm.value.startTime + ':00Z';
      const onlineClass = {
        teacherId: this.onlineClassForm.value.teacherId,
        instituteId: this.instituteId,
        batchId: this.onlineClassForm.value.batchId,
        courseId: this.onlineClassForm.value.courseId,
        startTime: date,
        duration: this.onlineClassForm.value.duration,
        topic: this.onlineClassForm.value.topic,
        agenda: this.onlineClassForm.value.agenda,
        password: this.onlineClassForm.value.password,
      };

      // console.log(onlineClass);
      this.api.createMeeting(onlineClass).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
