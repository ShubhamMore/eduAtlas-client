import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ButtonModule } from 'primeng/button';
import { ThemeModule } from './../../../@theme/theme.module';
import { ManageAnnouncementsComponent } from '../announcements/manage-announcements/manage-announcements.component';
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
  NbMenuModule,
  NbTabsetModule,
  NbIconModule,
  NbListModule,
  NbDatepickerModule,
  NbButtonModule,
} from '@nebular/theme';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';

@NgModule({
  declarations: [
    CommunicationComponent,
    AnnouncementsComponent,
    ManageAnnouncementsComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    CommRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    AngularEditorModule,
    NbLayoutModule,

    ThemeModule,
    NbMenuModule,
    ButtonModule,
    NbLayoutModule,
    NbTabsetModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbListModule,
    NbSelectModule,
    NbDatepickerModule,

    NbButtonModule,
  ],
})
export class CommunicationModule {}
