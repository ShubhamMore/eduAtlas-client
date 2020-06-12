import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationComponent } from '../communication.component';
import { CommRoutingModule } from './comm-routing.module';
import { AnnouncementsComponent } from '../announcements/announcements.component';
import {
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbCheckboxModule,
  NbLayoutModule,
  NbButtonModule,
} from '@nebular/theme';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';
import { ForumComponent } from '../forum/forum.component';
import { AddForumComponent } from '../forum/add-forum/add-forum.component';
import { MyForumComponent } from '../forum/my-forum/my-forum.component';
import { ForumDetailsComponent } from '../forum/forum-details/forum-details.component';

@NgModule({
  declarations: [CommunicationComponent, AnnouncementsComponent, SafeHtmlPipe,ForumComponent,AddForumComponent,MyForumComponent,ForumDetailsComponent],
  imports: [
    CommonModule,
    CommRoutingModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    AngularEditorModule,
    NbLayoutModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
  ],
})
export class CommunicationModule {}
