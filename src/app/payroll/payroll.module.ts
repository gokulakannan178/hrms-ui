import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PayslipComponent } from './payslip/payslip.component';
import { EmployeesalaryComponent } from './employeesalary/employeesalary.component';

const routes: Routes = [
  {
    path: 'payslip',
    component:PayslipComponent
  },
  {
    path: 'employeesalary',
    component:EmployeesalaryComponent
  },

]

@NgModule({
  declarations: [PayslipComponent, EmployeesalaryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PayrollModule { }
