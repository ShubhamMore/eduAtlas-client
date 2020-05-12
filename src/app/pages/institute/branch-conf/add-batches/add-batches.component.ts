import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-add-batches',
  templateUrl: './add-batches.component.html',
  styleUrls: ['./add-batches.component.scss'],
})
export class AddBatchesComponent implements OnInit {
  courses = { course: [] };
  batchUpdate = { batchCode: '', description: '', course: '' };
  linearMode = true;
  batch: FormGroup;
  submitted = false;
  routerId: string;
  batchId: string;
  edit: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private active: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toasterService: NbToastrService
  ) {}

  ngOnInit() {
    this.active.queryParams.subscribe((data) => {
      console.log(data);
      this.batchId = data.batchId;
      this.edit = data.edit;
    });

    this.routerId = this.active.snapshot.paramMap.get('id');
    console.log('institute Id ' + this.routerId);
    this.getBatch(this.batchId, this.routerId);
    this.getCourses(this.routerId);
    this.batch = this.fb.group({
      course: ['', Validators.required],
      batchCode: ['', Validators.required],
      description: [''],
    });

    console.log('===============>', this.courses);
  }
  getBatch(id, instituteId) {
    let param = new HttpParams();
    param = param.append('instituteId', instituteId);
    param = param.append('batchId', id);
    this.api.getBatch(param).subscribe((data) => {
      console.log(data);
      this.batchUpdate = JSON.parse(JSON.stringify(data[0]));
      console.log('batchInfo' + this.batchUpdate.batchCode);
    });
  }
  getCourses(id) {
    this.api.getCourses(id).subscribe((data) => {
      this.courses = JSON.parse(JSON.stringify(data));
      console.log(this.courses);
      this.batch.patchValue({
        course: this.batchUpdate.course,
        batchCode: this.batchUpdate.batchCode,
        description: this.batchUpdate.description,
      });
    });
  }
  get f() {
    return this.batch.controls;
  }
  onSubmit() {
    this.submitted = true;

    if (this.batch.invalid) {
      return;
    }
    if (this.edit === 'true') {
      let param = new HttpParams();
      param = param.append('instituteId', this.routerId);
      param = param.append('batchId', this.batchId);
      this.api.updateBatch(param, this.batch.value).subscribe(
        (res) => console.log(res),
        (error) => console.log(error)
      );
    }
    console.log('batch => ', this.batch.value);
    if (!this.edit) {
      this.api.addBatch(this.routerId, this.batch.value).subscribe(
        () => {
          console.log('successfully added');

          this.showToast('top-right', 'success');
          setTimeout(() => {
            this.router.navigate(['/pages/institute/branch-config/manage-batch/', this.routerId]);
          }, 1000);
        },
        (err) => {
          console.error(err);
          this.invalid('top-right', 'danger');
        }
      );
    }
  }
  showToast(position, status) {
    this.toasterService.show(status || 'Success', 'Successfully Added', { position, status });
  }
  invalid(position, status) {
    this.toasterService.show(status || 'Danger', 'This Batch code already exists', {
      position,
      status,
    });
  }
  goManage() {
    this.location.back();
  }
}
