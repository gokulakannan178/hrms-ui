import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllorganisationComponent } from './allorganisation/allorganisation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
// import { RatingModule } from 'ng-starrating';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';


import { OrgbranchComponent } from './orgbranch/orgbranch.component';
import { OrgdeptComponent } from './orgdept/orgdept.component';
import { ProbitionComponent } from './probition/probition.component';
import { AddprobitionComponent } from './probition/addprobition/addprobition.component';
import { EditprobitionComponent } from './probition/editprobition/editprobition.component';
import { ViewprobitionComponent } from './probition/viewprobition/viewprobition.component';
import { DesignationComponent } from './designation/designation.component';
import { AdddesignationComponent } from './designation/adddesignation/adddesignation.component';
import { EditdesignationComponent } from './designation/editdesignation/editdesignation.component';
import { ViewdesignationComponent } from './designation/viewdesignation/viewdesignation.component';

const routes: Routes = [
  {
    path: 'allorg',
    component: AllorganisationComponent
  },
  {
    path: 'orgbranch',
    component: OrgbranchComponent
  },
  {
    path: 'orgdept',
    component: OrgdeptComponent
  },
  {
    path: 'probition',
    component: ProbitionComponent
  },
  {
    path: 'addprobition',
    component: AddprobitionComponent
  },
  {
    path: 'edit_probition',
    component: EditprobitionComponent
  },
  {
    path: 'view_probition',
    component: ViewprobitionComponent
  },
  {
    path: 'designation',
    component: DesignationComponent
  },
  {
    path: 'add_designation',
    component: AdddesignationComponent
  },
  {
    path: 'edit_designation',
    component: EditdesignationComponent
  },
  {
    path: 'view_designation',
    component: ViewdesignationComponent
  },
];

@NgModule({
  declarations: [AllorganisationComponent, OrgdeptComponent, OrgbranchComponent, ProbitionComponent, AddprobitionComponent, EditprobitionComponent, ViewprobitionComponent, DesignationComponent, AdddesignationComponent, EditdesignationComponent, ViewdesignationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule
  ]
})
export class OrganisationModule { }
