import { Component, OnInit } from '@angular/core';
import {instituteData} from '../../../../../assets/dataTypes/dataType';
import {ApiService} from '../../../../services/api.service';
import {ActivatedRoute,Router} from '@angular/router'
import {MENU_ITEMS} from '../../../pages-menu';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';


@Component({
  selector: 'ngx-manage-institute',
  templateUrl: './manage-institute.component.html',
  styleUrls: ['./manage-institute.component.scss']
})
export class ManageInstituteComponent implements OnInit {

confirmDelete:boolean;
institutes:any;
institute = [{address:{addressLine: '', locality: '', state: '', city: ''},
	attendance: [], basicInfo: {logo: null, name: '', instituteContact: ''},
	batch: [], category: [], course: [], discount: [], _id: '', metaTag: [], 

}];
user:instituteData;
displayData:boolean;



  constructor(private api:ApiService, private router:Router) { 

  }
 getInstitutes(){
	this.api.getInstitutes().subscribe(
		data => {
			
		  this.institutes = data;

		//console.log('institutes - ' + JSON.stringify(this.institutes));
		this.institute = JSON.parse(JSON.stringify(this.institutes));
		console.log(this.institute);
	   MENU_ITEMS[2].hidden = true;
	   MENU_ITEMS[3].hidden = true;
	   MENU_ITEMS[4].hidden = true;

	  });

 }

  getInstitute(id:string){

  	// this.api.getInstitute(id).subscribe(data=>{
  	// 	this.user = data;
  	// 	this.displayData = true;
  	
  	// });
  	this.router.navigate(['/pages/dashboard',id]);
  }
  ngOnInit() {
		this.getInstitutes();
  }
updateInstitute(id:string){

this.router.navigate(['/pages/institute/add-institute'],{queryParams:{instituteId:id, edit:'true'}});
} 

delete(id:string){

	this.api.deleteInstitute(id)
	.subscribe(() => console.log(`institute with id ${id} deleted`),
		(err)=>console.log(err))
	const i = this.institute.findIndex(e => e._id === id)
	if(i !== -1){
	this.institute.splice(i, 1);
	}
	   if(this.institutes.length < 2){
       MENU_ITEMS[2].hidden = true;
       MENU_ITEMS[3].hidden = true;
       MENU_ITEMS[4].hidden = true;
     }
}
confirm(value:boolean){
  this.confirmDelete = value;
}
}
