import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExpensereportComponent } from './expensereport/expensereport.component';
import { InvoicereportComponent } from './invoicereport/invoicereport.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { SalaryComponent } from './salary/salary.component';
import { PayslipComponent } from './payslip/payslip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'expensereport',
    component:ExpensereportComponent
  },
  {
    path: 'invoicereport',
    component:InvoicereportComponent
  },
  {
    path: 'holidays',
    component:HolidaysComponent
  },
  {
    path: 'departments',
    component:DepartmentComponent
  },
  {
    path: 'designation',
    component:DesignationComponent
  },
  {
    path: 'salary',
    component:SalaryComponent
  },
  {
    path: 'payslip',
    component:PayslipComponent
  },
  
]

@NgModule({
  declarations: [ExpensereportComponent, InvoicereportComponent, HolidaysComponent, DepartmentComponent, DesignationComponent, SalaryComponent, PayslipComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
