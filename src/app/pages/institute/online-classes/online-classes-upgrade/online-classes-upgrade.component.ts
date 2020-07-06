import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoleAssignService } from '../../../../services/role/role-assign.service';

@Component({
  selector: 'ngx-online-classes-upgrade',
  templateUrl: './online-classes-upgrade.component.html',
  styleUrls: ['./online-classes-upgrade.component.scss'],
})
export class OnlineClassesUpgradeComponent implements OnInit {
  instituteId: string;
  role: any;
  constructor(
    private roleService: RoleAssignService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.role = this.roleService.getRole();
    this.route.params.subscribe((param: Params) => {
      this.instituteId = param.id;
    });
  }

  upgrade() {
    if (this.role === 'institute') {
      this.router.navigate(['/pages/membership'], {
        relativeTo: this.route,
        queryParams: { type: 'upgrade', id: this.instituteId },
      });
    }
  }
}
