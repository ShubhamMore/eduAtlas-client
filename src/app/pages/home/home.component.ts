import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MENU_ITEMS } from '../pages-menu';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { HostListener } from '@angular/core';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  institutes: SafeUrl[];
  institute: any[] = [];

  images: number[] = [];
  STRING_CHAR: string;
  base64String: string;
  students: any[] = [];
  display: boolean = false;
  studentReq: any[] = [];
  imageUrl: SafeUrl[] = [];
  classes = [];
  fee = ['week', 'month'];
  studentPendingFee = [];
  messages = [];
  newLeads = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.getInstitutes();

    MENU_ITEMS[1].hidden = false;
    MENU_ITEMS[2].hidden = true;
    MENU_ITEMS[3].hidden = true;
    MENU_ITEMS[4].hidden = true;
    MENU_ITEMS[5].hidden = true;
    MENU_ITEMS[6].hidden = true;
    MENU_ITEMS[7].hidden = true;
    MENU_ITEMS[8].hidden = true;
    MENU_ITEMS[9].hidden = true;
    MENU_ITEMS[10].hidden = true;
  }

  getInstitutes() {
    setTimeout(() => {
      this.api.getInstitutes().subscribe((data) => {
        this.institutes = data;

        // console.log('institutes - ' + JSON.stringify(this.institutes));
        this.institute = JSON.parse(JSON.stringify(this.institutes));
        // console.log('from home===============>',this.institute);

        if (this.institute.length) {
          this.display = true;
          // console.log(this.display);
        }
        // tslint:disable-next-line: no-shadowed-variable
        this.institute.forEach((data, i, a) => {
          // console.log('=>' ,data.basicInfo.logo.data.data)
          const TYPED_ARRAY = new Uint8Array(data.basicInfo.logo.data.data);
          this.STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
          // console.log('string char => ', i , '  ', this.STRING_CHAR);
          // tslint:disable-next-line: no-shadowed-variable
          this.STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');

          this.base64String = btoa(this.STRING_CHAR);
          // console.log('base64'+ i, this.base64String);
          this.imageUrl.push(
            this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.base64String),
          );

          // console.log('imageUrls => ', this.imageUrl);
        }, this);
      });
    }, 0);
  }

  // getInstitutes(){
  // 	this.api.getInstitutes().subscribe(data => {
  // 		this.institutes = data;
  // 			console.log(this.institutes);
  // 			if(this.institutes[1])
  // 		{
  // 			this.display = true;
  // 			console.log(this.display);

  // 		}
  // 	},err=>console.error(err))

  // }

  onClick() {
    this.router.navigate(['/pages/membership']);
  }
  viewInstitute(id: string, name: string) {
    this.router.navigate(['/pages/dashboard', id]);
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    setTimeout(() => {
      this.institutes = null;
    }, 0);
  }
}
