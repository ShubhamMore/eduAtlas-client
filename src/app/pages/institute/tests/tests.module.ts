import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { ManageTestsComponent } from './manage-tests/manage-tests.component';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageTestsScoreComponent } from './manage-tests-score/manage-tests-score.component';
import { CreateTestsScoreComponent } from './create-tests-score/create-tests-score.component';

@NgModule({
  declarations: [
    TestsComponent,
    CreateTestComponent,
    CreateTestsScoreComponent,
    ManageTestsComponent,
    ManageTestsScoreComponent,
  ],
  imports: [
    CommonModule,
    TestsRoutingModule,
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
export class TestsModule {}
