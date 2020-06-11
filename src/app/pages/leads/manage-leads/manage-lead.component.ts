import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-manage-lead',
  templateUrl: './manage-lead.component.html',
  styleUrls: ['./manage-lead.component.scss'],
})

export class ManageLeadComponent implements OnInit {
  leads: any;
  instituteId: string;
  status : string;
  batchId:string;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) { }
  ngOnInit(): void {
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getLeads(this.instituteId);
  }

  getLeads(id: string) {
    this.api.getLeadsByOfInstitute({ 'instituteId': this.instituteId, 'status':this.status,'batchId':this.batchId}).subscribe((data) => {
      this.leads = JSON.parse(JSON.stringify(data));
    });
  }
  edit(id: string) {
    this.router.navigate([`/pages/institute/add-leads/${this.instituteId}`], {
      queryParams: { leadId: id, edit: true },
    });
  }

  delete(id: string, index) {
   
      this.api.deleteLead({'_id':id}).subscribe(
        () => {
          this.leads.splice(index, 1);
          this.showToast('top-right', 'success', 'Lead Deleted Successfully');
        },
        (err) => console.error(err),
      );
  }
  addLead() {
    this.router.navigate([`/pages/institute/add-leads/${this.instituteId}`]);
  }

  showToast(position: any, status: any, message: any) {
    this.toasterService.show(status, message, { position, status });
  }

}