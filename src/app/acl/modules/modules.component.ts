import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as myGlobals from '../../shared/globals';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {
  useracl:any;
  dataList1: any = [];
  dataList2: any = [];
  departmentId: string;
  checkList: any = [];
  st: boolean = false;
  admin_attendence:any
  admin_attendencewrite:string=""
  admin_leave:string=""
  admin_leavewrite:string=""
  asst_mgmt:string=""
  asst_mgmtwrite:string=""
  attendence:string=""
  attendencewrite:string=""
  billclaim:string=""
  billclaimwrite:string=""
  branch:string=""
  branchwrite:string=""
  department:string=""
  departmentwrite:string=""
  designation:string=""
  designationwrite:string=""
  doc_mgmt:string=""
  doc_mgmtwrite:string=""
  employee:string=""
  employeewrite:string=""
  leave:string=""
  leavewrite:string=""
  leave_setting:string=""
  leave_settingwrite:string=""
  organisation:string=""
  organisationwrite:string=""
  payroll:string=""
  payrollwrite:string=""
  policy:string=""
  policywrite:string=""
  report:string=""
  reportwrite:string=""
  news:string=""
  newswrite:string=""
  aclname:any="Super Admin"
  constructor(public apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getList1()
  }

  getList1() {
    let body = {
      "status": ["Active"]
    }
    this.apiService.postMethod("/usertype/filter?pageno=no", body).subscribe(
      data => {
        this.dataList1 = data.response.data.userType;
        console.log("DataList1", this.dataList1)
        // this.departmentId = this.dataList1[0].uniqueId;
        // this.getList2(this.dataList1[0].uniqueId);
      },
      err => {
        alert(err)
      }
    )
  }

  getList2(name) {
    this.aclname=name
    this.apiService.getMethod3("/useracl/usertype?id=" + name).subscribe(
      
      data => {

        sessionStorage.setItem("Usertype",name)
        this.dataList2 = data.response.data.useracl;

        if(this.dataList2){
          console.log("setting acl");          
          this.admin_attendence=this.dataList2.adminAttendance.read;
          this.admin_attendencewrite=this.dataList2.adminAttendance.write;
          this.admin_leave=this.dataList2.adminLeave.read;
          this.admin_leavewrite=this.dataList2.adminLeave.write;
          this.asst_mgmt=this.dataList2.assetManagment.read;
          this.asst_mgmtwrite=this.dataList2.assetManagment.write;
          this.attendence=this.dataList2.attendance.read;
          this.attendencewrite=this.dataList2.attendance.write;
          this.billclaim=this.dataList2.billClaim.read;
          this.billclaimwrite=this.dataList2.billClaim.write;
          this.branch=this.dataList2.branch.read;
          this.branchwrite=this.dataList2.branch.write;
          this.department=this.dataList2.department.read;
          this.departmentwrite=this.dataList2.department.write;
          this.designation=this.dataList2.designation.read;
          this.designationwrite=this.dataList2.designation.write;
          this.doc_mgmt=this.dataList2.documentManagement.read;
          this.doc_mgmtwrite=this.dataList2.documentManagement.write;
          this.employee=this.dataList2.employee.read;
          this.employeewrite=this.dataList2.employee.write;
          this.leave=this.dataList2.leave.read;
          this.leavewrite=this.dataList2.leave.write;
          this.leave_setting=this.dataList2.leaveSettings.read;
          this.leave_settingwrite=this.dataList2.leaveSettings.write;
          this.organisation=this.dataList2.organisation.read;
          this.organisationwrite=this.dataList2.organisation.write;
          this.payroll=this.dataList2.payRoll.read;
          this.payrollwrite=this.dataList2.payRoll.write;
          this.policy=this.dataList2.policy.read;
          this.policywrite=this.dataList2.policy.write;
          this.report=this.dataList2.reports.read;
          this.reportwrite=this.dataList2.reports.write;
          this.news=this.dataList2.news.read;
          this.newswrite=this.dataList2.news.write
        }
      },
      err => {
        alert(err)
      }
    )
  }

  saveFeatureArr(event,checkboxname) {
    if(checkboxname=='admin_attendence'){
      if(event.target.checked==true){
         this.admin_attendence='Yes'
         console.log("toggle", this.admin_attendence)
      }else{
        this.admin_attendence='No'
      }
    }else if(checkboxname=='admin_attendencewrite'){
      if(event.target.checked==true){
         this.admin_attendencewrite='Yes'
      }else{
        this.admin_attendencewrite='No'
      }
    }else if(checkboxname=='admin_leave'){
      if(event.target.checked==true){
         this.admin_leave='Yes'
      }else{
        this.admin_leave='No'
      }
    }else if(checkboxname=='admin_leavewrite'){
      if(event.target.checked==true){
         this.admin_leavewrite='Yes'
      }else{
        this.admin_leavewrite='No'
      }
    }
    else if(checkboxname=='asst_mgmt'){
      if(event.target.checked==true){
         this.asst_mgmt='Yes'
      }else{
        this.asst_mgmt='No'
      }
    }else if(checkboxname=='asst_mgmtwrite'){
      if(event.target.checked==true){
         this.asst_mgmtwrite='Yes'
      }else{
        this.asst_mgmtwrite='No'
      }
    }
    else if(checkboxname=='attendence'){
      if(event.target.checked==true){
         this.attendence='Yes'
      }else{
        this.attendence='No'
      }
    }else if(checkboxname=='attendencewrite'){
      if(event.target.checked==true){
         this.attendencewrite='Yes'
      }else{
        this.attendencewrite='No'
      }
    }
    else if(checkboxname=='billclaim'){
      if(event.target.checked==true){
         this.billclaim='Yes'
      }else{
        this.billclaim='No'
      }
    }else if(checkboxname=='billclaimwrite'){
      if(event.target.checked==true){
         this.billclaimwrite='Yes'
      }else{
        this.billclaimwrite='No'
      }
    }
    else if(checkboxname=='branch'){
      if(event.target.checked==true){
         this.branch='Yes'
      }else{
        this.branch='No'
      }
    }else if(checkboxname=='branchwrite'){
      if(event.target.checked==true){
         this.branchwrite='Yes'
      }else{
        this.branchwrite='No'
      }
    }
    else if(checkboxname=='department'){
      if(event.target.checked==true){
         this.department='Yes'
      }else{
        this.department='No'
      }
    }else if(checkboxname=='departmentwrite'){
      if(event.target.checked==true){
         this.departmentwrite='Yes'
      }else{
        this.departmentwrite='No'
      }
    }
    else if(checkboxname=='designation'){
      if(event.target.checked==true){
         this.designation='Yes'
      }else{
        this.designation='No'
      }
    }else if(checkboxname=='designationwrite'){
      if(event.target.checked==true){
         this.designationwrite='Yes'
      }else{
        this.designationwrite='No'
      }
    }
    else if(checkboxname=='doc_mgmt'){
      if(event.target.checked==true){
         this.doc_mgmt='Yes'
      }else{
        this.doc_mgmt='No'
      }
    }else if(checkboxname=='doc_mgmtwrite'){
      if(event.target.checked==true){
         this.doc_mgmtwrite='Yes'
      }else{
        this.doc_mgmtwrite='No'
      }
    }
    else if(checkboxname=='employee'){
      if(event.target.checked==true){
         this.employee='Yes'
      }else{
        this.employee='No'
      }
    }else if(checkboxname=='employeewrite'){
      if(event.target.checked==true){
         this.employeewrite='Yes'
      }else{
        this.employeewrite='No'
      }
    }
    else if(checkboxname=='leave'){
      if(event.target.checked==true){
         this.leave='Yes'
      }else{
        this.leave='No'
      }
    }else if(checkboxname=='leavewrite'){
      if(event.target.checked==true){
         this.leavewrite='Yes'
      }else{
        this.leavewrite='No'
      }
    }
    else if(checkboxname=='leave'){
      if(event.target.checked==true){
         this.leave='Yes'
      }else{
        this.leave='No'
      }
    }else if(checkboxname=='leavewrite'){
      if(event.target.checked==true){
         this.leavewrite='Yes'
      }else{
        this.leavewrite='No'
      }
    }
    else if(checkboxname=='leave_setting'){
      if(event.target.checked==true){
         this.leave_setting='Yes'
      }else{
        this.leave_setting='No'
      }
    }else if(checkboxname=='leave_settingwrite'){
      if(event.target.checked==true){
         this.leave_settingwrite='Yes'
      }else{
        this.leave_settingwrite='No'
      }
    }
    else if(checkboxname=='organisation'){
      if(event.target.checked==true){
         this.organisation='Yes'
      }else{
        this.organisation='No'
      }
    }else if(checkboxname=='organisationwrite'){
      if(event.target.checked==true){
         this.organisationwrite='Yes'
      }else{
        this.organisationwrite='No'
      }
    }
    else if(checkboxname=='payroll'){
      if(event.target.checked==true){
         this.payroll='Yes'
      }else{
        this.payroll='No'
      }
    }else if(checkboxname=='payrollwrite'){
      if(event.target.checked==true){
         this.payrollwrite='Yes'
      }else{
        this.payrollwrite='No'
      }
    }
    else if(checkboxname=='policy'){
      if(event.target.checked==true){
         this.policy='Yes'
      }else{
        this.policy='No'
      }
    }else if(checkboxname=='policywrite'){
      if(event.target.checked==true){
         this.policywrite='Yes'
      }else{
        this.policywrite='No'
      }
    }
    else if(checkboxname=='report'){
      if(event.target.checked==true){
         this.report='Yes'
      }else{
        this.report='No'
      }
    }else if(checkboxname=='reportwrite'){
      if(event.target.checked==true){
         this.reportwrite='Yes'
      }else{
        this.reportwrite='No'
      }
    }
    else if(checkboxname=='news'){
      if(event.target.checked==true){
         this.news='Yes'
      }else{
        this.news='No'
      }
    }else if(checkboxname=='newswrite'){
      if(event.target.checked==true){
         this.newswrite='Yes'
      }else{
        this.newswrite='No'
      }
    }
    
  }
 
  // changeDept(index) {
  //   this.checkList[index].val = this.checkList[index].val == "Yes" ? "No" : "Yes";
  // }

  save() {
   
    this.useracl= sessionStorage.getItem('Usertype')
  
    let body = {
      "userType":   this.useracl,
      "adminAttendance": {
          "read": this.admin_attendence,
          "write": this.admin_attendencewrite
      },
      "adminLeave": {
          "read":this.admin_leave,
          "write": this.admin_leavewrite
      },
      "assetManagment":{
        "read":this.asst_mgmt,
          "write": this.asst_mgmtwrite
      },
      "attendance": {
        "read":this.attendence,
        "write": this.attendencewrite
    },
    "billClaim": {
      "read":this.billclaim,
      "write": this.billclaimwrite
  },
      "branch": {
        "read":this.branch,
        "write": this.branchwrite
    },
    "department": {
      "read":this.department,
      "write": this.departmentwrite
    },
    "designation": {
      "read":this.designation,
      "write": this.designationwrite
    },
    "documentManagement": {
      "read":this.doc_mgmt,
      "write": this.doc_mgmtwrite
    },
    "employee": {
      "read":this.employee,
      "write": this.employeewrite
    },
    "leave": {
      "read":this.leave,
      "write": this.leavewrite
    },
    "leaveSettings": {
      "read":this.leave_setting,
      "write": this.leave_settingwrite
    },
    "organisation": {
      "read":this.organisation,
      "write": this.organisationwrite
    },
    "payRoll": {
      "read":this.payroll,
      "write": this.payrollwrite
    },
    "policy": {
      "read":this.policy,
      "write": this.policywrite
    },
    "reports": {
      "read":this.report,
      "write": this.reportwrite
    },
    "news": {
      "read":this.news,
      "write": this.newswrite
    },
    }
    this.apiService.postMethod("/useracl/usertype",body).subscribe(data => {
      console.log("Success");   
      alert("Added Successfully")  
    },err=>{
      console.log("error");
      console.log(err);
      
    })
  }

  checkAll() {
    this.st = true;
    for (let i = 0; i < this.checkList.length; i++) {
      this.checkList[i].val = "Yes";
    }
  }
  unCheckAll() {
    this.st = false;
    for (let i = 0; i < this.checkList.length; i++) {
      this.checkList[i].val = "No";
    }
  }

}
