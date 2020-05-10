import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationComponent } from '../communication.component';
import { CommRoutingModule } from './comm-routing.module';
import {AnnouncementsComponent} from '../announcements/announcements.component';
import {NbCardModule, NbInputModule, NbSelectModule, NbCheckboxModule, NbLayoutModule} from '@nebular/theme';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommunicationComponent, AnnouncementsComponent],
  imports: [
    CommonModule,
    CommRoutingModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    AngularEditorModule,
    NbLayoutModule
  ]
})
export class CommunicationModule { }
