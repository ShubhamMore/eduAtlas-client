import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests/tests.component';
import { CreateTestComponent } from './tests/create-test/create-test.component';

@NgModule({
  declarations: [TestsComponent, CreateTestComponent],
  imports: [
    CommonModule,
    TestsRoutingModule
  ]
})
export class TestsModule { }
