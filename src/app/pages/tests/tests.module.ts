import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests/tests.component';
import { CreateTestComponent } from './tests/create-test/create-test.component';
import { NbCardModule, NbLayoutModule, NbInputModule, NbButtonModule, NbCheckboxModule, NbDatepickerModule, NbSelectModule, NbMenuModule, NbAccordionModule, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestsComponent, CreateTestComponent],
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
    NbListModule
    ]
})
export class TestsModule { }
