import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { NbWindowService } from '@nebular/theme';

declare var $: any;

@Component({
  selector: 'ngx-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss'],
})
export class ViewReportComponent implements OnInit {
  testId: string;
  instituteId: string;
  institute: any;
  students: any[];
  file: File;
  fileUpload: boolean;
  invalidFile: boolean;
  test: any;
  course: string;
  batch: string;
  display: boolean;
  studentScore: any[];
  @ViewChild('escClose', { read: TemplateRef, static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              max:100
          }
      }]
  }
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit() {
    this.display = false;
    this.invalidFile = false;
    this.fileUpload = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((param) => {
      this.testId = param.testId;
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
      (err) => { },
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

  getStudentTestReport(studentId,dialog: TemplateRef<any>) {

    
    this.api.getScoresOfStutdentByInstitute({ 'studentId': studentId, 'instituteId': this.instituteId }).subscribe((res: any) => {

      res.sort((test1,test2)=>{
        const test1Date = new Date(test1.date);
        const test2Date = new Date(test2.date);
        if(test1Date>test2Date){
          return 1;
        }else{
          return -1;
        }
      })

      var percentageArray = res.map((test)=>{
        return test.students.percentage;
      })
      var labelsArray = res.map((test)=>{
        return test.testName+"("+test.date+")";
      })

      this.barChartLabels = labelsArray;
      this.barChartType = 'line';
      this.barChartLegend = true;
      this.barChartData = [
        { data: percentageArray, label: res[0].students.studentName },
      ];
      this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
    }, (err) => {
        this.showToast('top-right','danger',err.error.message );
    })
    
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
