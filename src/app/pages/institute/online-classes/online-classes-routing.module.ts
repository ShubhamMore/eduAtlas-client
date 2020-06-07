import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnlineClassesConfComponent } from './online-classes-conf/online-classes-conf.component';
import { AddOnlineClassComponent } from './online-classes-conf/add-online-class/add-online-class.component';
import { OnlineClassSettingsComponent } from './online-classes-conf/online-class-settings/online-class-settings.component';
import { ManageOnlineClassComponent } from './online-classes-conf/manage-online-class/manage-online-class.component';

const routes = [
  {
    path: '',
    component: OnlineClassesConfComponent,
    children: [
      { path: 'settings/:id', component: OnlineClassSettingsComponent },
      { path: 'create-class/:id', component: AddOnlineClassComponent },
      { path: 'manage-class/:id', component: ManageOnlineClassComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineClassesRoutingModule {}
