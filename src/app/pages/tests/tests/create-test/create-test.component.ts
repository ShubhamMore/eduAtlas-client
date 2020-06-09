import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {

  createTestForm:FormGroup;
  instituteId: string;
  institute: any;

  batches: any[] = [];


  constructor(private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.instituteId = this.route.snapshot.paramMap.get('id')

    this.createTestForm = this.fb.group({
      batchId:['',Validators.required],
      courseId:['',Validators.required],
      instituteId:[this.instituteId],
      date:['',Validators.required],
      
    })
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      console.log(data);
      this.institute = data;
    });
  }

  onSelectCourse(id: string) {
    this.batches = this.institute.batch.filter((b: any) => b.course === id);
  }
}
