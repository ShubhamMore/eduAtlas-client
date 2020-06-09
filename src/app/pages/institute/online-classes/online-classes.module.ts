import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineClassesRoutingModule } from './online-classes-routing.module';
import { OnlineClassSettingsComponent } from './online-classes-conf/online-class-settings/online-class-settings.component';
import { ManageOnlineClassComponent } from './online-classes-conf/manage-online-class/manage-online-class.component';
import { AddOnlineClassComponent } from './online-classes-conf/add-online-class/add-online-class.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbLayoutModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbSelectModule,
  NbMenuModule,
  NbAccordionModule,
  NbListModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { OnlineClassesConfComponent } from './online-classes-conf/online-classes-conf.component';

@NgModule({
  declarations: [
    OnlineClassesConfComponent,
    OnlineClassSettingsComponent,
    ManageOnlineClassComponent,
    AddOnlineClassComponent,
  ],
  imports: [
    CommonModule,
    OnlineClassesRoutingModule,
    ReactiveFormsModule,
    NbCardModule,
    NbLayoutModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbSelectModule,
    NbMenuModule,
    NbAccordionModule,
    NbEvaIconsModule,
    NbListModule,
  ],
})
export class OnlineClassesModule {}
