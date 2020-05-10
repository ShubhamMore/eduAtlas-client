import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {CommunicationComponent} from '../communication.component';
import {AnnouncementsComponent} from '../announcements/announcements.component'
const routes:Routes = [
    {
        path:'', component: CommunicationComponent,
        children:[
            {path:'announcements/:id', component:AnnouncementsComponent},
        ]
        
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CommRoutingModule {
  }
  