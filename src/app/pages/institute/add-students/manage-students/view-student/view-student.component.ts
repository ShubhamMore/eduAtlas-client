import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { MENU_ITEMS } from '../../../../pages-menu';
@Component({
  selector: 'ngx-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss'],
})
export class ViewStudentComponent implements OnInit {
  student = {
    active: false,
    basicDetails: { name: '', rollNumber: '', studentEmail: '', studentContact: '' },
    courseDetails: { course: '', batch: '', discount: '', nextPayble: '', additionalDiscount: '' },
    fee: { amountCollected: '', installmentNumber: '', mode: '', nextInstallment: '' },
    instituteId: '',
    parentDetails: { name: '', parentContact: '', parentEmail: '', address: '' },
    _id: '',
  };
  routerId: string;
  studentEmail: string;
  constructor(private api: ApiService, private active: ActivatedRoute) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((data) => {
      console.log(data);
      this.studentEmail = data.email;
      console.log('studentId ' + this.studentEmail);
    });
    this.getStudent(this.routerId);
  }
  getStudent(id: string) {
    let param = new HttpParams();
    param = param.append('instituteId', this.routerId);
    param = param.append('studentEmail', this.studentEmail);

    this.api.getStudent(param).subscribe((data) => {
      this.student = data;
      console.log('student ', this.student);
    });
  }
}
