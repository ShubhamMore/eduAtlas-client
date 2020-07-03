import { EaLiveGuard } from './../../../services/auth-services/auth-guards/ea-live.guard';
import { OnlineClassesUpgradeComponent } from './online-classes-upgrade/online-classes-upgrade.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlineClassesConfComponent } from './online-classes-conf/online-classes-conf.component';
import { AddOnlineClassComponent } from './online-classes-conf/add-online-class/add-online-class.component';
// tslint:disable-next-line: max-line-length
import { OnlineClassSettingsComponent } from './online-classes-conf/online-class-settings/online-class-settings.component';
import { ManageOnlineClassComponent } from './online-classes-conf/manage-online-class/manage-online-class.component';

const routes = [
  {
    path: '',
    component: OnlineClassesConfComponent,
    children: [
      { path: 'settings/:id', component: OnlineClassSettingsComponent, canActivate: [EaLiveGuard] },
      { path: 'create-class/:id', component: AddOnlineClassComponent, canActivate: [EaLiveGuard] },
      {
        path: 'create-class/:id/edit',
        component: AddOnlineClassComponent,
        canActivate: [EaLiveGuard],
      },
      {
        path: 'manage-class/:id',
        component: ManageOnlineClassComponent,
        canActivate: [EaLiveGuard],
      },
      { path: ':id', component: OnlineClassesUpgradeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineClassesRoutingModule {}
