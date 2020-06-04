import { NgModule } from '@angular/core';
import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbButtonModule,
  NbDatepickerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ButtonModule } from 'primeng/button';

import { HomeComponent } from './home/home.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { MembershipComponent } from './membership/membership.component';

// import { InstAddDialogComponent } from './institute/add-institute/inst-add-dialog/inst-add-dialog.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    ButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbEvaIconsModule,
    NbIconModule,
    NbListModule,
    NbSelectModule,
    NbDatepickerModule,

    NbButtonModule,
  ],
  declarations: [
    PagesComponent,
    HomeComponent,
    ECommerceComponent,
    MembershipComponent,

    // ClassifiedComponent,
    // CreateClassifiedComponent,
    // ManageClassifiedComponent,
    // BusinessComponent,
    // CreateBusinessComponent,
    // ManageBusinessComponent,
  ],
})
export class PagesModule {}
