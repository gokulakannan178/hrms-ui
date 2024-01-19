import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AllemployeeComponent } from './allemployee/allemployee.component';
import { LeaverequestComponent } from './leaverequest/leaverequest.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DepartmentComponent } from './department/department.component';
import { AdminAttendanceComponent } from './admin-attendance/admin-attendance.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { LeaverequestadminComponent } from './leaverequestadmin/leaverequestadmin.component';
import { LeavesettingsComponent } from './leavesettings/leavesettings.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { BrowserModule } from '@angular/platform-browser';



 import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DirectoryComponent } from './directory/directory.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { AddemployeeComponent } from './allemployee/addemployee/addemployee.component';
import { EditemployeeComponent } from './allemployee/editemployee/editemployee.component';
import { ViewemployeeComponent } from './allemployee/viewemployee/viewemployee.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { IndividualAttendanceComponent } from './individual-attendance/individual-attendance.component';
import { OnboardingeditComponent } from './allemployee/onboardingedit/onboardingedit.component';
import { OnboardingviewComponent } from './allemployee/onboardingview/onboardingview.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { OrganisationchartComponent } from './organisationchart/organisationchart.component';
import { UploademployeeComponent } from './uploademployee/uploademployee.component';
import { OrgchartComponent } from './orgchart/orgchart.component';


const routes: Routes = [
  {
    path: 'allemployee',
    component:AllemployeeComponent
  },
  {
    path: 'add_employee',
    component:AddemployeeComponent
  },
  {
    path: 'edit_employee',
    component:EditemployeeComponent
  },
  {
    path: 'view_employee',
    component:ViewemployeeComponent
  },
  {
    path: 'onboard_employeeedit',
    component:OnboardingeditComponent
  },
  {
    path: 'onboard_employeeview',
    component:OnboardingviewComponent
  },
  {
    path: 'employee_profile',
    component:EmployeeProfileComponent
  },
  {
    path: 'my_profile',
    component:MyProfileComponent
  },
  {
    path: 'leaverequest',
    component:LeaverequestComponent
  },
  {
    path: 'leaverequest_admin',
    component:LeaverequestadminComponent
  },
  {
    path: 'leave_settings',
    component:LeavesettingsComponent
  },
  {
    path: 'attendance',
    component:AttendanceComponent
  },
  {
    path: 'individual_attendance',
    component:IndividualAttendanceComponent
  },
  {
    path: 'admin_attendance',
    component:AdminAttendanceComponent
  },
  {
    path: 'department',
    component:DepartmentComponent
  },
  {
    path: 'directory',
    component:DirectoryComponent
  },
  {
    path: 'org_chart',
    component:OrgChartComponent
  },
  {
    path: 'employee-attendance',
    component:EmployeeAttendanceComponent
  },
  {
    path: 'organisation-chart',
    component:OrganisationchartComponent
  },
  {
    path: 'uploademployee',
    component:UploademployeeComponent 
  },
  {
    path: 'orgchart',
    component:OrgchartComponent 
  },
];
@NgModule({
  declarations: [AllemployeeComponent, LeaverequestComponent, AttendanceComponent, DepartmentComponent, AdminAttendanceComponent, EmployeeProfileComponent, LeaverequestadminComponent, LeavesettingsComponent, DirectoryComponent, OrgChartComponent, AddemployeeComponent, EditemployeeComponent, ViewemployeeComponent, MyProfileComponent, IndividualAttendanceComponent, OnboardingeditComponent, OnboardingviewComponent, EmployeeAttendanceComponent, OrganisationchartComponent, UploademployeeComponent, OrgchartComponent],
  imports: [
    CommonModule,
    // BrowserModule,
     FormsModule,
     
     ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgMultiSelectDropDownModule.forRoot(),
    // BED3OrgchartModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeeModule { }
