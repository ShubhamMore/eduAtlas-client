import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { MENU_ITEMS } from '../../../pages-menu';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ngx-pending-student',
  templateUrl: './pending-student.component.html',
  styleUrls: ['./pending-student.component.scss'],
})
export class PendingStudentComponent implements OnInit {
  students = [
    {
      active: false,
      basicDetails: { name: '', rollNumber: '', studentEmail: '', studentContact: '' },
      courseDetails: { course: '', batch: '', discount: '', nextPayble: '' },
      fee: { amountCollected: '', installmentNumber: '', mode: '', nextInstallment: '' },
      instituteId: '',
      parentdetails: { name: '', parentContact: '', parentEmail: '' },
      _id: '',
    },
  ];
  routerId: string;
  constructor(private api: ApiService, private router: Router, private active: ActivatedRoute) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getStudents(this.routerId);
  }
  getStudents(id) {
    this.api.getStudents(id).subscribe((data) => {
      // console.log(data);
      this.students = data;
      console.log('students =>', this.students);
    });
  }
  view(email: string) {
    console.log('from pending ', email);
    this.router.navigate([`/pages/institute/view-student/${this.routerId}`], {
      queryParams: { email: email },
    });
  }
  edit(email: string) {
    console.log('from manag edit => ', email);
    this.router.navigate([`/pages/institute/add-students/${this.routerId}`], {
      queryParams: { email: email, edit: 'true' },
    });
  }
  delete(email: string, id: string) {
    let param = new HttpParams();
    param = param.append('instituteId', this.routerId);
    param = param.append('studentEmail', email);

    this.api.deleteStudent(param).subscribe(() => console.log('success delete'));
    const i = this.students.findIndex((e) => e._id == id);
    if (i !== -1) {
      this.students.splice(i, 1);
    }
  }
}
