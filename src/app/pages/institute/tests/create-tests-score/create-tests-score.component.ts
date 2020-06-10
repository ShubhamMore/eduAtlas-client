import { NbToastrService } from '@nebular/theme';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-create-tests-score',
  templateUrl: './create-tests-score.component.html',
  styleUrls: ['./create-tests-score.component.scss'],
})
export class CreateTestsScoreComponent implements OnInit {
  testId: string;
  instituteId: string;
  institute: any;
  students: any[];
  test: any;
  course: string;
  batch: string;
  display: boolean;
  studentScore: any[];
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.display = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((param) => {
      this.testId = param.test;
    });
    this.getCourses(this.instituteId);
    this.students = [];
    this.studentScore = [];
  }

  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      if (this.testId) {
        this.getTest(this.testId);
      } else {
        this.location.back();
      }
    });
  }

  getTest(id: string) {
    this.api.getSingleTest({ _id: id }).subscribe(
      (res: any) => {
        this.test = res;
        this.course = this.institute.course.find(
          (c: any) => c._id === this.test.courseId,
        ).courseCode;
        this.batch = this.institute.batch.find((b: any) => b._id === this.test.batchId).batchCode;
        if (this.test.students.length > 0) {
          this.studentScore = this.test.students;
        } else {
          this.getStudents(res.instituteId, res.batchId, res.courseId);
        }
        this.display = true;
      },
      (err) => {},
    );
  }

  getStudents(instituteID: string, batchId: string, courseId: string) {
    this.api.getStudentsByBatch(instituteID, courseId, batchId).subscribe((res: any[]) => {
      this.students = res;
      this.students.sort((student1, student2) => {
        if (+student1.instituteDetails.rollNumber >= +student2.instituteDetails.rollNumber) {
          return 1;
        } else {
          return -1;
        }
      });

      this.students.forEach((student) => {
        const scoreData = {
          studentId: student._id,
          rollNo: student.instituteDetails.rollNumber,
          marks: '',
        };

        this.studentScore.push(scoreData);
      });
    });
  }

  addMarks(event: any, i: number) {
    const mark = event.target.value;
    this.studentScore[i].marks = mark;
  }

  addScore() {
    this.api.addTestScore({ _id: this.test._id, scores: this.studentScore }).subscribe(
      (res) => {
        this.showToast('top right', 'success', 'Score Updated Successfully');
        this.location.back();
      },
      (err) => {
        this.showToast('top right', 'danger', err.err.message);
      },
    );
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
