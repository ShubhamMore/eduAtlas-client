import { HeaderComponent } from './../../../../@theme/components/header/header.component';
import { NbToastrService } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { instituteData } from '../../../../../assets/dataTypes/dataType';
import { ApiService } from '../../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MENU_ITEMS } from '../../../pages-menu';

@Component({
  selector: 'ngx-manage-institute',
  templateUrl: './manage-institute.component.html',
  styleUrls: ['./manage-institute.component.scss'],
})
export class ManageInstituteComponent implements OnInit {
  confirmDelete: boolean;

  institutes: any[];

  instituteUser: instituteData;
  displayData: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    this.institutes = [];
    this.getInstitutes();
  }

  getInstitutes() {
    this.api.getInstitutes().subscribe((institutes: any) => {
      this.institutes = institutes;
      if (institutes.length > 0) {
        MENU_ITEMS[2].hidden = true;
        MENU_ITEMS[3].hidden = true;
        MENU_ITEMS[4].hidden = true;
      }
    });
  }

  getInstitute(id: string) {
    this.router.navigate(['/pages/dashboard', id]);
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
          const i = this.institutes.findIndex((inst) => inst._id === id);
          if (i !== -1) {
            this.institutes.splice(i, 1);
            this.showToast('top-right', 'success', 'Institute Successfully deleted.');
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

  onClick() {
    this.router.navigate(['/pages/membership']);
  }
}
