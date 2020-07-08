import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-student-forums-chats',
  templateUrl: './student-forums-chats.component.html',
  styleUrls: ['./student-forums-chats.component.scss'],
})
export class StudentForumsChatsComponent implements OnInit {
  instituteId: string;
  selectedCourseId: string;
  courses: any[] = [];
  allForums: any[] = [];
  display: boolean;
  constructor(
    private api: ApiService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.display = false;
    this.instituteId = this.route.snapshot.paramMap.get('id');
    this.getCourses();
  }

  getCourses() {
    this.studentService.getStudentCoursesByInstitutes(this.instituteId).subscribe(
      (data: any) => {
        this.courses = data;
        this.display = true;
      },
      (err: any) => console.error(err),
    );
  }

  onSelectCourse(courseId: any) {
    if (courseId !== '') {
      this.selectedCourseId = courseId;
      this.getForums();
    }
  }

  getForums() {
    this.api
      .getForumsByInstitute({ instituteId: this.instituteId, courseId: this.selectedCourseId })
      .subscribe((res: any) => {
        this.allForums = res;
        this.allForums.map((myForum) => {
          const date = new Date(myForum.date);
          myForum.date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
          return myForum;
        });
      });
  }

  comment(id: string) {
    this.router.navigate([`/student/forumsAndChats/comments/${this.instituteId}`], {
      queryParams: { forumId: id, edit: true },
    });
  }
}
