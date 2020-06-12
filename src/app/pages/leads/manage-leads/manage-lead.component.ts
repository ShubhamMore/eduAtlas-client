import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { courseData } from '../../../../assets/dataTypes/dataType';


@Component({
  selector: 'ngx-manage-lead',
  templateUrl: './manage-lead.component.html',
  styleUrls: ['./manage-lead.component.scss'],
})

export class ManageLeadComponent implements OnInit {
  leads: any;
  instituteId: string;
  courses: courseData;
  selectedCourseId : string;
  selectedStatus : string;
  status = ['Pending', 'Contacted','Lead Won','Lead Lost'];
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) { }
  ngOnInit(): void {
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getLeads();
    this.getCourses();
  }

  getCourses(){
    this.api.getCourseTD(this.instituteId).subscribe(
      (data: any) => {
        this.courses = data.course;
      },
      (err) => console.error(err),
    );
  }
  onSelectCourse(courseId){
    this.selectedCourseId = courseId;
    this.getLeads();
  }
  onSelectStatus(status){
    this.selectedStatus = status;
    this.getLeads();
  }
  getLeads() {
    this.api.getLeadsByOfInstitute({ 'instituteId': this.instituteId, 'status':this.selectedStatus,'courseId':this.selectedCourseId}).subscribe((data) => {
      this.leads = data;
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