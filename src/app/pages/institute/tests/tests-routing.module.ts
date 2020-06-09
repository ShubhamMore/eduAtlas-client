import { TestsComponent } from './tests.component';
import { ManageTestsComponent } from './manage-tests/manage-tests.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './create-test/create-test.component';

const routes: Routes = [
  {
    path: '',
    component: TestsComponent,
    children: [
      { path: 'create-test/:id', component: CreateTestComponent },
      { path: 'create-test/:id/edit', component: CreateTestComponent },
      { path: 'manage-test/:id', component: ManageTestsComponent },

      { path: 'add-test-score/:id', component: ManageTestsComponent },
      { path: 'add-test-score/:id/edit', component: ManageTestsComponent },
      { path: 'manage-test-score/:id', component: ManageTestsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestsRoutingModule {}
