import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { ExpenseComponent } from './expense/expense.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { BillClaimComponent } from './bill-claim/bill-claim.component';
import { AddBillclaimComponent } from './add-billclaim/add-billclaim.component';
import { ViewBillclaimComponent } from './view-billclaim/view-billclaim.component';
import { EditBillclaimComponent } from './edit-billclaim/edit-billclaim.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ExpenseCategoryComponent } from './expense-category/expense-category.component';
import { SubExpenseCategoryComponent } from './sub-expense-category/sub-expense-category.component';
import { TeamBillClaimComponent } from './team-bill-claim/team-bill-claim.component';
import { GradeComponent } from './grade/grade.component';
import { BillConfigurationComponent } from './bill-configuration/bill-configuration.component';



const routes: Routes = [
  {
    path: 'payments',
    component:PaymentsComponent
  },
  {
    path: 'expense',
    component:ExpenseComponent
  },
  {
    path: 'invoice',
    component:InvoiceComponent
  },
  {
    path: 'bill_claim',
    
    component:BillClaimComponent
  },
  {
    path: 'team-bill-claim',
    
    component:TeamBillClaimComponent
  },
  {
    path: 'add_billclaim',
    component:AddBillclaimComponent
  },
  {
    path: 'edit_billclaim',
    component:EditBillclaimComponent
  },
  {
    path: 'view_billclaim',
    component:ViewBillclaimComponent
  },
  {
    path: 'expense-category',
    component:ExpenseCategoryComponent
  },
  {
    path: 'sub-expense-category',
    component:SubExpenseCategoryComponent
  },
  {
    path: 'grade',
    component:GradeComponent
  },
  {
    path: 'bill-configuration',
    component:BillConfigurationComponent
  },
]

@NgModule({
  declarations: [PaymentsComponent, ExpenseComponent, InvoiceComponent, BillClaimComponent, AddBillclaimComponent, ViewBillclaimComponent, EditBillclaimComponent, ExpenseCategoryComponent, SubExpenseCategoryComponent, TeamBillClaimComponent, GradeComponent, BillConfigurationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountsModule { }
