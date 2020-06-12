import { ManageAnnouncementsComponent } from '../announcements/manage-announcements/manage-announcements.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommunicationComponent } from '../communication.component';
import { AnnouncementsComponent } from '../announcements/announcements.component';
const routes: Routes = [
  {
    path: '',
    component: CommunicationComponent,
    children: [
      { path: 'manage-announcements/:id', component: ManageAnnouncementsComponent },
      { path: 'add-announcements/:id', component: AnnouncementsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommRoutingModule {}
