import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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
  studentId: string;
  instituteId: string;
  institute: any;
  students: any[];
  file: File;
  invalidFile: boolean;
  test: any;
  course: string;
  batch: string;
  display: boolean;
  studentScore: any[];
  batchId: string;
  @ViewChild('escClose', { read: TemplateRef, static: false }) escCloseTemplate: TemplateRef<HTMLElement>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: false }) disabledEscTemplate: TemplateRef<HTMLElement>;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private toasterService: NbToastrService,
  ) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 100
        }
      }]
    }
  };
  public barChartLabels = [];
  public barChartType = 'line';
  public barChartLegend = true;
  public barChartData = [];
  public chartColors: any[] = [
    {
      borderColor: ["#FFD500"],
      backgroundColor: ["rgba(250,214,1,0.1)"],
    }, {
      borderColor: ["#EA596B"],
      backgroundColor: ["rgba(239,86,107,0.1)"],
    }, {
      borderColor: ["#30BD9A"],
      backgroundColor: ["rgba(48,189,154,0.1)"],
    }, {
      borderColor: ["#009BCC"],
      backgroundColor: ["rgba(0,154,204,0.1)"],
    }];

  ngOnInit() {
    this.display = false;
    this.invalidFile = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((param) => {
      this.studentId = param.studentId;
      this.batchId = param.batchId;
    });
    this.getCourses(this.instituteId);
    this.students = [];
    this.studentScore = [];
  }



  getCourses(id: string) {
    this.api.getCourseTD(id).subscribe((data: any) => {
      this.institute = data;
      if (this.studentId) {
        this.getScoreOfStudentByBatch(this.studentId);
      } else {
        this.location.back();
      }
    });
  }

  getScoreOfStudentByBatch(id: string) {
    this.api.getScoreOfStudentByBatch({ 'studentId': id, 'batchId': this.batchId }).subscribe(
      (res: any) => {
        if (res) {
          this.test = res;
        }
        this.course = this.institute.course.find(
          (c: any) => c._id === this.test[0].courseId,
        ).courseCode;
        this.batch = this.institute.batch.find((b: any) => b._id === this.test[0].batchId).batchCode;

        this.display = true;
        res.sort((test1, test2) => {
          const test1Date = new Date(test1.date);
          const test2Date = new Date(test2.date);
          if (test1Date > test2Date) {
            return 1;
          } else {
            return -1;
          }
        })
        var percentageArray = [];
        var highestArray = [];
        var lowestArray = [];
        var averageArray = [];
        var labelsArray = [];
        res.forEach(test => {
          test.students.studentPercentage ? percentageArray.push(test.students.studentPercentage) : percentageArray.push(0)
          test.highestPercentage ? highestArray.push(test.highestPercentage) : highestArray.push(0);
          test.lowestPercentage ? lowestArray.push(test.lowestPercentage) : lowestArray.push(0);
          test.averagePercentage ? averageArray.push(test.averagePercentage) : averageArray.push(0);
          labelsArray.push(test.testName + "(" + test.date + ")");
        });
        this.barChartLabels = labelsArray;
        this.barChartType = 'line';
        this.barChartLegend = true;
        this.barChartData = [
          { data: highestArray, label: 'HIGHEST' },
          { data: lowestArray, label: 'LOWEST' },
          { data: averageArray, label: 'AVERAGE' },
          { data: percentageArray, label: 'STUDENT MARKS' },
        ];
      },
      (err) => { },
    );
  }




  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
