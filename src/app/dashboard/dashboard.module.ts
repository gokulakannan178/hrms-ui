import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { EmployeeDashbaordComponent } from './employee-dashbaord/employee-dashbaord.component';

const routes: Routes = [
  {
    path: '',
    component:DashbaordComponent
  },
  {
    path: 'users',
    component:UsersComponent
  },
  {
    path: 'employee_dashbaord',
    component:EmployeeDashbaordComponent
  },
  
  
];

@NgModule({
  declarations: [DashbaordComponent, UsersComponent, EmployeeDashbaordComponent],
  imports: [
    CommonModule,
    FormsModule,
     ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
