import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../../../services/api.service';
import {instituteData} from '../../../../../../assets/dataTypes/dataType';
import {MENU_ITEMS} from '../../../../pages-menu';
@Component({
  selector: 'ngx-view-institute',
  templateUrl: './view-institute.component.html',
  styleUrls: ['./view-institute.component.scss']
})
export class ViewInstituteComponent implements OnInit {

institute = {institute: 
  {
     basicInfo: {logo: '', name: '', contactNumber: null},
    address: {addressLine: '', locality:'', state:'', city:''},
    category: [''],
    metaTag: [''],


  },
  

};
user:any;
routerId:string;
  constructor(private api:ApiService, private router:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.router.snapshot.paramMap.get('id'))
    this.routerId = this.router.snapshot.paramMap.get('id');
    
  		this.getInstitute(this.routerId);
    this.api.display(true);  
    
    MENU_ITEMS[2].hidden = false;
    MENU_ITEMS[3].hidden = false;
    MENU_ITEMS[4].hidden = false;
  }

  getInstitute(id:string){

  	this.api.getInstitute(id).subscribe(data => {
			
		  this.institute = JSON.parse(JSON.stringify(data));

		console.log(this.institute);
    
    MENU_ITEMS[3].children[0].link = '/pages/institute/add-students/' + id;
  	MENU_ITEMS[2].link = '/pages/dashboard/' + id;
  	});

  }


}
