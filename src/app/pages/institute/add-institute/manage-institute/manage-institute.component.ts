import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { instituteData } from '../../../../../assets/dataTypes/dataType';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MENU_ITEMS } from '../../../pages-menu';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../../@core/data/smart-table';

@Component({
  selector: 'ngx-manage-institute',
  templateUrl: './manage-institute.component.html',
  styleUrls: ['./manage-institute.component.scss'],
})
export class ManageInstituteComponent implements OnInit {
  confirmDelete: boolean;
  institutes: any;

  institute = [
    {
      address: { addressLine: '', locality: '', state: '', city: '' },
      attendance: [],
      basicInfo: { logo: null, name: '', instituteContact: '' },
      batch: [],
      category: [],
      course: [],
      discount: [],
      _id: '',
      metaTag: [],
    },
  ];

  instituteUser: instituteData;
  displayData: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastrService: NbToastrService,
  ) {}

  getInstitutes() {
    this.api.getInstitutes().subscribe((data) => {
      this.institutes = data;
      this.institute = JSON.parse(JSON.stringify(this.institutes));
      MENU_ITEMS[2].hidden = true;
      MENU_ITEMS[3].hidden = true;
      MENU_ITEMS[4].hidden = true;
    });
  }

  getInstitute(id: string) {
    this.router.navigate(['/pages/dashboard', id]);
  }

  ngOnInit() {
    this.getInstitutes();
  }

  updateInstitute(id: string) {
    this.router.navigate(['/pages/institute/add-institute'], {
      queryParams: { instituteId: id, edit: 'true' },
    });
  }

  delete(id: string) {
    const confirm = window.confirm('Are u sure, You want to delete this Institute/Branch?');
    if (confirm) {
      this.api.deleteInstitute(id).subscribe(
        (res) => {
          const i = this.institute.findIndex((inst) => inst._id === id);
          if (i !== -1) {
            this.institute.splice(i, 1);
            this.showToast('top-right', 'danger', 'Institute Successfully deleted.');
          }
          if (this.institutes.length < 2) {
            MENU_ITEMS[2].hidden = true;
            MENU_ITEMS[3].hidden = true;
            MENU_ITEMS[4].hidden = true;
          }
        },
        (err) => {
          this.showToast('top-right', 'danger', 'Institute deletion Failed.');
        },
      );
    }
  }

  showToast(position: any, status: any, message: any) {
    this.toastrService.show(status, message, {
      position,
      status,
    });
  }
}
