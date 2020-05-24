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
  display: boolean;

  institutes: SafeUrl[];
  institute: any[] = [];

  images: number[] = [];
  STRING_CHAR: string;
  base64String: string;
  imageUrl: SafeUrl[] = [];

  students: any[] = [];
  studentReq: any[] = [];

  classes: any[] = [];
  fee = ['week', 'month'];

  studentPendingFee: any[] = [];

  messages: any[] = [];
  newLeads: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router,
    private active: ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.display = false;
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
    MENU_ITEMS[11].hidden = true;
    MENU_ITEMS[12].hidden = true;
  }

  getInstitutes() {
    this.api.getInstitutes().subscribe((data: any) => {
      this.institutes = data;

      this.institute = JSON.parse(JSON.stringify(this.institutes));

      if (this.institute.length) {
        this.display = true;
      }
      // tslint:disable-next-line: no-shadowed-variable
      this.institute.forEach((data, i, a) => {
        const TYPED_ARRAY = new Uint8Array(data.basicInfo.logo.data.data);
        this.STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        // tslint:disable-next-line: no-shadowed-variable
        this.STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        this.base64String = btoa(this.STRING_CHAR);
        this.imageUrl.push(
          this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + this.base64String),
        );
      }, this);
    });
  }

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
