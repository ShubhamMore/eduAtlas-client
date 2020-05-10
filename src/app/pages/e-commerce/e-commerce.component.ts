import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MENU_ITEMS} from '../pages-menu'

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent {
institutes:any[]=[];
institute:any[] = [];
myInstitute = {institute:{basicInfo:{name:'', logo: null, instituteContact: ''}, 
              address:{addressLine:'', city:'', state:'',pincode:''},
              category:[''], instituteMetaTag: ['']
            }};
students:any[]=[];
display:boolean = false;
routerId: string;

studentReq:any[]=[];

classes=[];
studentPendingFee=[]

study = []
  constructor(private api:ApiService, private router:Router, private active: ActivatedRoute) { }

  ngOnInit() {
  	this.getInstitutes();

	this.routerId = this.active.snapshot.paramMap.get('id');
	this.getStudents(this.routerId);
	this.getInstitute(this.routerId);
	MENU_ITEMS[11].link = '/pages/institute/manage-schedule/' + this.routerId;
	MENU_ITEMS[12].link = '/pages/institute/attandance/' + this.routerId;
	MENU_ITEMS[2].link = '/pages/dashboard/' + this.routerId;
	 MENU_ITEMS[5].children[0].link = '/pages/institute/add-students/' + this.routerId;
	 MENU_ITEMS[5].children[1].link = '/pages/institute/manage-students/' + this.routerId;
	 MENU_ITEMS[5].children[2].link = '/pages/institute/pending-students/' + this.routerId;
	 MENU_ITEMS[4].children[0].link = '/pages/institute/branch-config/manage-course/' + this.routerId;
	 MENU_ITEMS[4].children[1].link = '/pages/institute/branch-config/manage-batch/' + this.routerId;
	 MENU_ITEMS[4].children[2].link = '/pages/institute/branch-config/manage-discount/' + this.routerId;
	 MENU_ITEMS[4].children[3].link = '/pages/institute/branch-config/manage-receipt/' + this.routerId;
	 MENU_ITEMS[4].children[4].link = '/pages/institute/branch-config/manage-role-management/' + this.routerId;
	MENU_ITEMS[6].children[0].link = '/pages/communication/announcements/'	+ this.routerId;





  }
getInstitutes(){
	this.api.getInstitutes().subscribe(
		data => {
			
		  this.institutes = data;

		//console.log('institutes - ' + JSON.stringify(this.institutes));
		this.institute = JSON.parse(JSON.stringify(this.institutes));
		// console.log(this.institute);


	  });
	this.display = true;
	MENU_ITEMS[1].hidden = true;
   		 MENU_ITEMS[2].hidden = false;
       MENU_ITEMS[3].hidden = false;
	   MENU_ITEMS[4].hidden = false;
	   MENU_ITEMS[5].hidden = false;
	    MENU_ITEMS[6].hidden =false;
	//    MENU_ITEMS[7].hidden =false;
	//    MENU_ITEMS[8].hidden =false;
	//    MENU_ITEMS[9].hidden =false;
	//    MENU_ITEMS[10].hidden =false;
		MENU_ITEMS[11].hidden = false;
		MENU_ITEMS[12].hidden = false;
 }
 getInstitute(id){
	 this.api.getInstitute(id).subscribe(
		 res => {
			const inst = JSON.stringify(res);
			this.myInstitute = JSON.parse(inst);
			console.log(this.myInstitute);
		 });
 }
getStudents(id){
		this.api.getStudents(id).subscribe(data => {
			this.students = data;
			console.log('students =>', this.students);
		},err=>console.error(err))
	}  

onClick(){
	this.router.navigate(['/pages/institute/add-institute']);
}	
}

