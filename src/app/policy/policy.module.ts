import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NoticepolicyComponent } from './noticepolicy/noticepolicy.component';
import { LeavepolicyComponent } from './leavepolicy/leavepolicy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AddnoticepolicyComponent } from './noticepolicy/addnoticepolicy/addnoticepolicy.component';
import { ViewnoticepolicyComponent } from './noticepolicy/viewnoticepolicy/viewnoticepolicy.component';
import { EditnoticepolicyComponent } from './noticepolicy/editnoticepolicy/editnoticepolicy.component';
import { EditleavepolicyComponent } from './leavepolicy/editleavepolicy/editleavepolicy.component';
import { AddleavepolicyComponent } from './leavepolicy/addleavepolicy/addleavepolicy.component';
import { ViewleavepolicyComponent } from './leavepolicy/viewleavepolicy/viewleavepolicy.component';
import { OnboardpolicycheckmasterComponent } from './onboardpolicycheckmaster/onboardpolicycheckmaster.component';
import { OnboardpolicyComponent } from './onboardpolicy/onboardpolicy.component';
import { OnboardpolicycheckmasteraddComponent } from './onboardpolicycheckmaster/onboardpolicycheckmasteradd/onboardpolicycheckmasteradd.component';
import { OnboardpolicycheckmastereditComponent } from './onboardpolicycheckmaster/onboardpolicycheckmasteredit/onboardpolicycheckmasteredit.component';
import { OnboardpolicycheckmasterviewComponent } from './onboardpolicycheckmaster/onboardpolicycheckmasterview/onboardpolicycheckmasterview.component';
import { OnboardpolicyaddComponent } from './onboardpolicy/onboardpolicyadd/onboardpolicyadd.component';
import { OnboardpolicyeditComponent } from './onboardpolicy/onboardpolicyedit/onboardpolicyedit.component';
import { OnboardpolicyviewComponent } from './onboardpolicy/onboardpolicyview/onboardpolicyview.component';
import { WorkscheduleComponent } from './workschedule/workschedule.component';
import { WorkscheduleaddComponent } from './workschedule/workscheduleadd/workscheduleadd.component';
import { WorkscheduleeditComponent } from './workschedule/workscheduleedit/workscheduleedit.component';
import { WorkscheduleviewComponent } from './workschedule/workscheduleview/workscheduleview.component';
import { OffboardpolicyComponent } from './offboardpolicy/offboardpolicy.component';
import { OffboardpolicyaddComponent } from './offboardpolicy/offboardpolicyadd/offboardpolicyadd.component';
import { OffboardpolicyeditComponent } from './offboardpolicy/offboardpolicyedit/offboardpolicyedit.component';
import { OffboardpolicyviewComponent } from './offboardpolicy/offboardpolicyview/offboardpolicyview.component';
import { DocumentPolicyComponent } from './document-policy/document-policy.component';
import { DocumentPolicyMasterComponent } from './document-policy-master/document-policy-master.component';
import { DocumentPolicyAddComponent } from './document-policy-add/document-policy-add.component';
import { DocumentPolicyEditComponent } from './document-policy-edit/document-policy-edit.component';
import { DocumentPolicyViewComponent } from './document-policy-view/document-policy-view.component';
import { DocumentMasterAddComponent } from './document-master-add/document-master-add.component';
import { DocumentMasterEditComponent } from './document-master-edit/document-master-edit.component';
import { DocumentMasterViewComponent } from './document-master-view/document-master-view.component';
import { LeavemasterComponent } from './leavemaster/leavemaster.component';
import { AddleavemasterComponent } from './addleavemaster/addleavemaster.component';
import { EditleavemasterComponent } from './editleavemaster/editleavemaster.component';
import { ViewleavemasterComponent } from './viewleavemaster/viewleavemaster.component';
import { OffboardpolicycheckmasterComponent } from './offboardpolicycheckmaster/offboardpolicycheckmaster.component';
import { OffboardcheckmasteraddComponent } from './offboardpolicycheckmaster/offboardcheckmasteradd/offboardcheckmasteradd.component';
import { OffboardcheckmastereditComponent } from './offboardpolicycheckmaster/offboardcheckmasteredit/offboardcheckmasteredit.component';
import { OffboardcheckmasterviewComponent } from './offboardpolicycheckmaster/offboardcheckmasterview/offboardcheckmasterview.component';
import{EarningmasterComponent}from './earningmaster/earningmaster.component';
import{AddearningmasterComponent} from './addearningmaster/addearningmaster.component';
import{EditearningmasterComponent} from './editearningmaster/editearningmaster.component';
import{ViewearningmasterComponent}from './viewearningmaster/viewearningmaster.component';
import { DetectionmasterComponent } from './detectionmaster/detectionmaster.component';
import{AddDetectionmasterComponent}from './detectionmaster/add-detectionmaster/add-detectionmaster.component';
import{EditdetectionmasterComponent}from './detectionmaster/editdetectionmaster/editdetectionmaster.component';
import{ViewdetectionmasterComponent} from './detectionmaster/viewdetectionmaster/viewdetectionmaster.component';
import { PayrollComponent } from './payroll/payroll.component';
import { AddpayrollComponent } from './payroll/addpayroll/addpayroll.component';
import { EditpayrollComponent } from './payroll/editpayroll/editpayroll.component';
import { ViewpayrollComponent } from './payroll/viewpayroll/viewpayroll.component';


const routes: Routes = [
  {
    path: 'noticepolicy',
    component: NoticepolicyComponent
  },
  {
    path:'addnoticepolicy',
    component: AddnoticepolicyComponent
  },
  {
    path:'editnoticepolicy',
    component: EditnoticepolicyComponent
  },
  {
    path:'viewnoticepolicy',
    component: ViewnoticepolicyComponent
  },
  {
    path: 'leavepolicy',
    component: LeavepolicyComponent
  },
  {
    path: 'addleavepolicy',
    component: AddleavepolicyComponent
  },{
    path: 'editleavepolicy',
    component: EditleavepolicyComponent
  },
  {
    path: 'viewleavepolicy',
    component: ViewleavepolicyComponent
  },
  {
    path: 'onboardpolicycheckmaster',
    component: OnboardpolicycheckmasterComponent
  },
  {
    path: 'onboardpolicycheckmasteradd',
    component: OnboardpolicycheckmasteraddComponent
  },
  {
    path: 'onboardpolicycheckmasteredit',
    component: OnboardpolicycheckmastereditComponent
  },
  {
    path: 'onboardpolicycheckmasterview',
    component: OnboardpolicycheckmasterviewComponent
  },
  {
    path: 'onboardpolicy',
    component: OnboardpolicyComponent
  },
  {
    path: 'onboardpolicyadd',
    component: OnboardpolicyaddComponent
  },
  {
    path: 'onboardpolicyedit',
    component: OnboardpolicyeditComponent
  },
  {
    path: 'onboardpolicyview',
    component: OnboardpolicyviewComponent
  },
  {
    path: 'workschedule',
    component: WorkscheduleComponent
  },
  {
    path: 'workscheduleadd',
    component: WorkscheduleaddComponent
  },
  {
    path: 'workscheduleedit',
    component: WorkscheduleeditComponent
  },
  {
    path: 'workscheduleview',
    component: WorkscheduleviewComponent
  },
  {
    path: 'offboardpolicy',
    component: OffboardpolicyComponent
  },
  {
    path: 'offboardpolicyadd',
    component: OffboardpolicyaddComponent
  },
  {
    path: 'offboardpolicyedit',
    component: OffboardpolicyeditComponent
  },
  {
    path: 'offboardpolicyview',
    component: OffboardpolicyviewComponent
  },
  {
    path: 'offboardcheckmaster',
    component: OffboardpolicycheckmasterComponent
  },
  {
    path: 'offboardcheckmasteradd',
    component: OffboardcheckmasteraddComponent
  },
  {
    path: 'offboardcheckmasteredit',
    component: OffboardcheckmastereditComponent
  },
  {
    path: 'offboardcheckmasterview',
    component: OffboardcheckmasterviewComponent
  },
  {
    path: 'documentpolicy',
    component: DocumentPolicyComponent
  },
  {
    path: 'documentpolicyadd',
    component: DocumentPolicyAddComponent
  },
  {
    path: 'documentpolicyview',
    component: DocumentPolicyViewComponent
  },
  {
    path: 'documentpolicyedit',
    component: DocumentPolicyEditComponent
  },
   {
    path: 'documentmasterpolicy',
    component: DocumentPolicyMasterComponent
  },
  {
    path: 'documentmasteradd',
    component: DocumentMasterAddComponent
  },
  {
    path: 'documentmasteredit',
    component: DocumentMasterEditComponent
  },
  {
    path: 'documentmasterview',
    component: DocumentMasterViewComponent
  },
  {
    path: 'leavemaster',
    component: LeavemasterComponent
  },
  {
  path: 'addleavemaster',
  component: AddleavemasterComponent
},
{
  path: 'editleavemaster',
  component: EditleavemasterComponent
},
{
  path: 'viewleavemaster',
  component: ViewleavemasterComponent
},
{
  path:'Earningmaster',
  component:EarningmasterComponent
},
{
  path:'addearningmaster',
  component: AddearningmasterComponent
},
{
  path:'editearningmaster',
   component:EditearningmasterComponent
},
{
  path:'viewearningmaster',
  component:ViewearningmasterComponent
},
{path:'detectionmaster',
component:DetectionmasterComponent 
},
{
  path:'addDetectionmaster',
  component:AddDetectionmasterComponent
},
{
  path:'editdetectionmaster',
  component:EditdetectionmasterComponent
},
{
path:'viewdetectionmaster',
component:ViewdetectionmasterComponent
},
 {
  path:'payroll',
  component:PayrollComponent
 },
 {
  path:'addpayroll',
  component:AddpayrollComponent
 },
 {
  path:'editpayroll',
  component:EditpayrollComponent
 },
 {path:'viewpayroll',
 component:ViewpayrollComponent
 }
]; 

@NgModule({
  declarations: [NoticepolicyComponent, LeavepolicyComponent, AddnoticepolicyComponent, ViewnoticepolicyComponent, 
    EditnoticepolicyComponent, EditleavepolicyComponent, AddleavepolicyComponent, ViewleavepolicyComponent, 
    OnboardpolicycheckmasterComponent, OnboardpolicyComponent, OnboardpolicycheckmasteraddComponent, OnboardpolicycheckmastereditComponent, 
    OnboardpolicycheckmasterviewComponent,OnboardpolicyaddComponent, OnboardpolicyeditComponent, OnboardpolicyviewComponent, 
    WorkscheduleComponent, WorkscheduleaddComponent, WorkscheduleeditComponent, WorkscheduleviewComponent, OffboardpolicyComponent, 
    OffboardpolicyaddComponent, OffboardpolicyeditComponent, OffboardpolicyviewComponent, DocumentPolicyComponent, DocumentPolicyMasterComponent,
     DocumentPolicyAddComponent, DocumentPolicyEditComponent, DocumentPolicyViewComponent, DocumentMasterAddComponent, DocumentMasterEditComponent,
      DocumentMasterViewComponent, LeavemasterComponent, AddleavemasterComponent, EditleavemasterComponent, ViewleavemasterComponent, OffboardpolicycheckmasterComponent, 
      OffboardcheckmasteraddComponent, OffboardcheckmastereditComponent, OffboardcheckmasterviewComponent,EarningmasterComponent,AddearningmasterComponent,EditearningmasterComponent,ViewearningmasterComponent, 
      DetectionmasterComponent,AddDetectionmasterComponent,EditdetectionmasterComponent,ViewdetectionmasterComponent, PayrollComponent, AddpayrollComponent, EditpayrollComponent, ViewpayrollComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class PolicyModule { }
