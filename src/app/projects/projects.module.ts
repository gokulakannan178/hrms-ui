import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddprojectsComponent } from './addprojects/addprojects.component';
import { ProjectlistComponent } from './projectlist/projectlist.component';
import { ProjectgridComponent } from './projectgrid/projectgrid.component';
import { ProjectdetailComponent } from './projectdetail/projectdetail.component';
import { BoardListComponent } from './board-list/board-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListBoardComponent } from './list-board/list-board.component';


const routes: Routes = [
  {
    path: 'addprojects',
    component:AddprojectsComponent
  }, {
    path: 'board-list',
    component:BoardListComponent
  },
  {
    path: 'list-board',
    component:ListBoardComponent
  },
  {
    path: 'projectdetail',
    component:ProjectdetailComponent
  },
  {
    path: 'projectgrid',
    component:ProjectgridComponent
  },
  {
    path: 'projectlist',
    component:ProjectlistComponent

  },
]

@NgModule({
  declarations: [AddprojectsComponent, ProjectlistComponent, ProjectgridComponent, ProjectdetailComponent, BoardListComponent, ListBoardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectsModule { }
