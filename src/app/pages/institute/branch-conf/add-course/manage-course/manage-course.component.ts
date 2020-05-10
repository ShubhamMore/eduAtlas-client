import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../../services/api.service';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {MENU_ITEMS} from '../../../../pages-menu';

@Component({
  selector: 'ngx-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.scss']
})
export class ManageCourseComponent implements OnInit {
courses = {course:[{courseCode: '', discription: '', fees: '', gst: '', name: '', totalFee: '', _id: '' }]};
institutes:any[] = [];
institute:any[] = [];
routerId:string;

// students:any[]=[];
display:boolean = false;
  constructor(private api:ApiService,private router:Router, private active: ActivatedRoute) { }

  ngOnInit() {
	  this.routerId = this.active.snapshot.paramMap.get('id');
    this.getCourses(this.routerId);

  }
getCourses(id){
this.api.getCourses(id).subscribe(data => {
//console.log(data);
//this.courses = JSON.stringify(data);
const course = JSON.stringify(data)
this.courses = JSON.parse(course);
console.log('=======> ', this.courses);
});
}

delete(id){
  console.log(id);
  let param = new HttpParams();
  param = param.append('instituteId', this.routerId);
	param = param.append('courseId', id); 
  this.api.deleteCourse(param).subscribe( res => console.log(res),
   error => console.log(error));

   const i = this.courses.course.findIndex(e => e._id == id)
	if(i !== -1){
	this.courses.course.splice(i,1);
	}
};
edit(id: string){
	this.router.navigate([`/pages/institute/branch-config/add-courses/${this.routerId}`],{queryParams: {courseId: id, edit: true}});
}
onClick(){this.router.navigate(['/pages/institute/branch-config/add-courses/', this.routerId])}
// delete(id:string){
// this.api.deleteCourse(id).subscribe(
// 	() => console.log('successfully delete'),
// 	err=>console.error(err)
// 	)
// const i = this.courses.course.findIndex(e => e.id == id)
// 	if(i !== -1){
// 	this.courses.splice(i,1);
// 	}
// }
// getInstitutes(){
// 	this.api.getInstitutes().subscribe(
// 		data => {
			
// 		  this.institutes = data;

// 		console.log('institutes - ' + JSON.stringify(this.institutes));
// 		this.institute = JSON.parse(JSON.stringify(this.institutes));
// 		console.log(this.institute);


// 	  });
// 	this.display = true;
// 	MENU_ITEMS[1].hidden = true;
//    		 MENU_ITEMS[2].hidden = false;
//        MENU_ITEMS[3].hidden = false;
// 	   MENU_ITEMS[4].hidden = false;
// 	   MENU_ITEMS[5].hidden = false;
// 	   MENU_ITEMS[6].hidden =false;
// 	   MENU_ITEMS[7].hidden =false;
// 	   MENU_ITEMS[8].hidden =false;
// 	   MENU_ITEMS[9].hidden =false;
// 	   MENU_ITEMS[10].hidden =false;
//  }
}
