import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestsComponent } from './tests/tests.component';
import { CreateTestComponent } from './tests/create-test/create-test.component';

const routes: Routes = [
{
  path:'',
  component:TestsComponent,
  children:[
    {path:'create-test/:id',component:CreateTestComponent}
  ]
}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
