import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { TashboardComponent } from './tashboard/tashboard.component';

const routes: Routes = [
  {
    path: 'alltask',
    component:AddtaskComponent
  },
  {
    path: 'taskBoard',
    component:TashboardComponent
  },
]


@NgModule({
  declarations: [AddtaskComponent, TashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TasksModule { }
