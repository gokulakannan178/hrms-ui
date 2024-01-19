import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddclientsComponent } from './addclients/addclients.component';
import { ClientlistComponent } from './clientlist/clientlist.component';
import { ClientdetailComponent } from './clientdetail/clientdetail.component';
import { TeamComponent } from './team/team.component';
import { TaskboardComponent } from './taskboard/taskboard.component';

const routes: Routes = [
  {
    path: 'addclients',
    component:AddclientsComponent
  },
  {
    path: 'clientlist',
    component:ClientlistComponent
  },
  {
    path: 'clientdetail',
    component:ClientdetailComponent
  },
  {
    path: 'team',
    component:TeamComponent
  },
  {
    path: 'taskboard',
    component:TaskboardComponent
  },
];

@NgModule({
  declarations: [AddclientsComponent, ClientlistComponent, ClientdetailComponent, TeamComponent, TaskboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientsModule { }
