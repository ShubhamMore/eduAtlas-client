import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../../../../../services/api.service';
import { MENU_ITEMS } from '../../../../pages-menu';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-manage-batch',
  templateUrl: './manage-batch.component.html',
  styleUrls: ['./manage-batch.component.scss'],
})
export class ManageBatchComponent implements OnInit {
  batches = { batch: [{ _id: '', course: '', batchCode: '', description: '' }] };
  routerId: string;
  params = new HttpParams();
  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.routerId = this.active.snapshot.paramMap.get('id');
    this.getBatches(this.routerId);
  }

  getBatches(id) {
    this.api.getBatches(id).subscribe((data) => {
      this.batches = JSON.parse(JSON.stringify(data));
      console.dir('my batch' + this.batches);
    });
  }
  edit(id: string) {
    this.router.navigate([`/pages/institute/branch-config/add-batch/${this.routerId}`], {
      queryParams: { batchId: id, edit: true },
    });
  }
  delete(id) {
    console.log(id);
    this.params = this.params.append('instituteId', this.routerId);
    this.params = this.params.append('batchId', id);
    this.api.deleteBatch(this.params).subscribe(
      () => console.log('successfully delete'),
      (err) => console.error(err)
    );
    const i = this.batches.batch.findIndex((e) => e._id == id);
    if (i !== -1) {
      this.batches.batch.splice(i, 1);
    }
  }
  onClick() {
    this.router.navigate(['/pages/institute/branch-config/add-batch', this.routerId]);
  }
}
