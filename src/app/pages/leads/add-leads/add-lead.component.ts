import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Location } from '@angular/common';
import { courseData } from '../../../../assets/dataTypes/dataType';

@Component({
  selector: 'ngx-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
})
export class AddLeadComponent implements OnInit {
  leadForm: FormGroup;
  submitted = false;
  instituteId: string;
  leadId: string;
  edit: string;
  message: string;
  courses: courseData;
  status = ['Pending', 'Contacted', 'Lead Won', 'Lead Lost'];
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private active: ActivatedRoute,
    private router: Router,
    private toasterService: NbToastrService,
    private location: Location,
  ) {}

  ngOnInit() {
    this.instituteId = this.active.snapshot.paramMap.get('id');
    this.active.queryParams.subscribe((data) => {
      this.leadId = data.leadId;
      this.edit = data.edit;
      if (this.edit === 'true') {
        this.getLead(this.leadId);
      }
    });
    this.leadForm = this.fb.group({
      leadName: [''],
      leadContact: [''],
      leadEmail: ['', Validators.email],
      date: [''],
      course: [''],
      status: [''],
      comment: [''],
      source: [''],
    });
    this.getCourses();
  }

  getCourses() {
    this.api.getCourseTD(this.instituteId).subscribe(
      (data: any) => {
        this.courses = data.course;
      },
      (err) => console.error(err),
    );
  }
  get f() {
    return this.leadForm.controls;
  }

  getLead(id: string) {
    this.api.getSingleLead({ _id: id }).subscribe(
      (data: any) => {
        this.leadForm.patchValue({
          leadName: data.leadName,
          leadContact: data.leadContact,
          leadEmail: data.leadEmail,
          date: data.addedDate,
          course: data.courseId,
          status: data.status,
          comment: data.comment,
          source: data.source,
        });
      },
      (err) => console.error(err),
    );
  }

  onSubmit() {
    this.submitted = true;
    this.leadForm.markAllAsTouched();
    if (this.leadForm.invalid) {
      return;
    }
    const data = {
      leadName: this.leadForm.get('leadName').value,
      leadContact: this.leadForm.get('leadContact').value,
      leadEmail: this.leadForm.get('leadEmail').value,
      addedDate: this.leadForm.get('date').value,
      courseId: this.leadForm.get('course').value,
      status: this.leadForm.get('status').value,
      comment: this.leadForm.get('comment').value,
      source: this.leadForm.get('source').value,
      instituteId: this.instituteId,
      _id: this.leadId,
    };

    if (this.edit === 'true') {
      this.api.updateLead(data).subscribe(
        (res: any) => {
          this.showToast('top-right', 'success', 'Lead Updated Successfully');
          this.router.navigate(['/pages/institute/manage-leads/', this.instituteId]);
        },
        (err) => {
          this.showToast('top-right', 'danger', err.error.message);
        },
      );
    }

    if (!this.edit) {
      this.api.addLead(data).subscribe(
        () => {
          this.showToast('top-right', 'success', 'Lead Added Successfully');
          this.router.navigate(['/pages/institute/manage-leads/', this.instituteId]);
        },
        (err) => {
          this.showToast('top-right', 'danger', err.error.message);
        },
      );
    }
  }

  back() {
    let confirm = true;
    if (this.leadForm.touched) {
      confirm = window.confirm('If you go back the data will be lost.');
    }
    if (confirm) {
      this.location.back();
    }
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }
}
