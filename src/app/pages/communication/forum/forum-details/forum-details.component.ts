import { Component, OnInit } from "@angular/core";
import { ApiService } from '../../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { courseData } from '../../../../../assets/dataTypes/dataType';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-forum',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss'],
})

export class ForumDetailsComponent implements OnInit {
  instituteId: string;
  forumId: string;
  allForums: any;
  forumCommentData :any;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: NbToastrService,
  ) { }
  ngOnInit(): void {
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe((data) => {
      this.forumId = data.forumId;

      this.getForum();

    });
  }
  getForum() {
    this.api.getSingleForum({ '_id': this.forumId }).subscribe(
      (data: any) => {
        this.forumCommentData=data;
       
      },
      (err) => console.error(err),
    );
  }

  messages: any[] = [];



  submitComment(){
    console.log(this.messages); 
    
  }
  back(id: string) {
    this.router.navigate([`/pages/communication/forum/${this.instituteId}`], {
      queryParams: { forumId: id, edit: true },
    });
  }

} 