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
  instituteId: string;
  batchId: string;
  edit: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toasterService: NbToastrService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((data) => {
      this.batchId = data.batchId;
      this.edit = data.edit;
    });

    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getBatch(this.batchId, this.instituteId);
    this.getCourses(this.instituteId);
    this.batch = this.fb.group({
      course: ['', Validators.required],
      batchCode: ['', Validators.required],
      description: [''],
    });
  }

  getBatch(id, instituteId) {
    let param = new HttpParams();
    param = param.append('instituteId', instituteId);
    param = param.append('batchId', id);
    this.api.getBatch(param).subscribe((data) => {
      this.batchUpdate = JSON.parse(JSON.stringify(data[0]));
    });
  }
  getCourses(id) {
    this.api.getCourses(id).subscribe((data) => {
      this.courses = JSON.parse(JSON.stringify(data));
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
      param = param.append('instituteId', this.instituteId);
      param = param.append('batchId', this.batchId);
      this.api.updateBatch(param, this.batch.value).subscribe(
        (res) => {
          this.showToast('top-right', 'success', 'Successfully Updated');
          this.router.navigate(['/pages/institute/branch-config/manage-batch/', this.instituteId]);
        },
        (error) => {
          this.showToast('top-right', 'danger', error.error.message);
        },
      );
    }

    if (!this.edit) {
      this.api.addBatch(this.instituteId, this.batch.value).subscribe(
        () => {
          this.showToast('top-right', 'success', 'Successfully Added');
          setTimeout(() => {
            this.router.navigate([
              '/pages/institute/branch-config/manage-batch/',
              this.instituteId,
            ]);
          }, 1000);
        },
        (err) => {
          console.error(err);
          this.showToast('top-right', 'danger', err.error.message);
        },
      );
    }
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }

  goManage() {
    this.location.back();
  }
}
