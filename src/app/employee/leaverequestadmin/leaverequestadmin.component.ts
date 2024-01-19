import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-leaverequestadmin',
  templateUrl: './leaverequestadmin.component.html',
  styleUrls: ['./leaverequestadmin.component.css']
})
export class LeaverequestadminComponent implements OnInit {
  leavemaster:any
  emptimeofflist:any
  searchform:FormGroup
  updateleaveform:FormGroup
  activebody:any={}
  revokebody:any={}
  emptimeoff:any
  remarksapprove:any
  remarksreject:any
  userObj:any
  singleuniqueid:any
  activeBody: any = {};
  showItemActive: number = 10;
  showRevokeActive:number=10;
  active_count: 0
  pager: any = {};
  pagen: any = {};
  pagerevoke: any = {};
  pagenrevoke: any = {};
  attendancedata:any={};
  revokelist:any
  revoke_count:any
  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.todayemployees()
    this.getleavemaster()
    this.revokefilter(null,1)
    //this.getempofflist(null,1)
   
    this.searchform = new FormGroup({
      'empname': new FormControl("", Validators.required),
      'leavetype': new FormControl("", Validators.required),
      'leavestatus': new FormControl("", Validators.required),
      'datefrom': new FormControl("", Validators.required),
      'dateto': new FormControl("", Validators.required)

    });
    this.updateleaveform = new FormGroup({
      // 'leaves': new FormControl("", Validators.required),
      'leavetype': new FormControl("", Validators.required),
      'numberOfDays': new FormControl("", Validators.required),
      'datefrom': new FormControl("", Validators.required),
      'dateto': new FormControl("", Validators.required),
      'reason': new FormControl("", Validators.required)
    });
    this.activebody ={
      "status":['Request'],
    }
    this.search()
   
  }


  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getempofflist(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getempofflist(null, this.pager.currentPage);
  }

  setrevokePage(page: number) {
    if (page < 1 || page > this.pagenrevoke.totalPage) {
      return;
    }
    this.revokefilter( null,page);
  }
  saveRevoketems(number) {
    this.showRevokeActive = number;
    this.revokefilter( null,this.pagerevoke.currentPage);
  }
  singleempdata(id){
    this.apiService.getMethod2("/employeetimeoff" ,id).subscribe( data => {
      // console.log('organisation filter',data);
      this.emptimeoff = data.response.data.EmployeeTimeOff;
      this.updateleaveform.controls['leavetype'].setValue(this.emptimeoff.ref.leaveType.uniqueId)
      this.updateleaveform.get('numberOfDays').setValue(this.emptimeoff.numberOfDays)
      this.updateleaveform.get('datefrom').setValue(this.apiService.getDate1(this.emptimeoff.startDate))
      this.updateleaveform.get('dateto').setValue(this.apiService.getDate1(this.emptimeoff.endDate))
      this.updateleaveform.get('reason').setValue(this.emptimeoff.description)

    })
  }

  singleid(id){
    this.singleuniqueid=id
  }

  getleavemaster(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/leavemaster/filter?pageno=no" ,body).subscribe( data => {
      // console.log('organisation filter',data);
      this.leavemaster = data.response.data.LeaveMaster;
    })
  }


  todayemployees(){
 
    this.apiService.getMethod3("/attendance/todayemployees/leave").subscribe( data => {
      // console.log('organisation filter',data);
      this.attendancedata = data.response.data.TodayEmployessLeave;
      console.log("AAA",this.attendancedata.todayPresent)
    })
  }

  getempofflist(search,pageno){
    //  this.activebody =
    this.activeBody["sortBy"]="_id",
         this.activeBody["sortOrder"]=-1
         console.log("this.activeBody===",this.activeBody)

    if (search)
    {

       if(search!="")
       {
         this.activebody["regex"]=
         {
          employeeName:search
         }
         this.activeBody["sortBy"]="_id",
         this.activeBody["sortOrder"]=-1
       }
    }
    
    this.apiService.postMethod("/employeetimeoff/filter?pageno=" + pageno + "&limit=" + this.showItemActive,this.activebody).subscribe( data => {
      // console.log('organisation filter',data);
      this.emptimeofflist = data.response.data.EmployeeTimeOff;
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.emptimeofflist.length)) {
        this.getempofflist(null, pageno - 1)
      }
    })
  }

  // revokepage
revokefilter(search,pageno){
  this.revokebody["sortBy"]="_id",
  this.revokebody["sortOrder"]=-1,
  this.revokebody["revokeRequest"]=['RevokeRequest']
  console.log("this.revokebody===",this.revokebody)

if (search)
{

if(search!="")
{
  this.revokebody["regex"]=
  {
   employeeName:search
  }
  this.revokebody["sortBy"]="_id",
  this.revokebody["sortOrder"]=-1,
  this.revokebody["revokeRequest"]=['RevokeRequest']
}
}
this.apiService.postMethod("/employeetimeoff/filter?pageno=" + pageno + "&limit=" + this.showRevokeActive,this.revokebody).subscribe( data =>{
  this.revokelist = data.response.data.EmployeeTimeOff;
  this.revoke_count = data.response.data.pagination.count;
  this.pagenrevoke.totalUsers = data.response.data.pagination.count;
  this.pagenrevoke.totalPage = data.response.data.pagination.totalPage;
  this.pagenrevoke.currentPage = data.response.data.pagination.pageNum;
  this.pagerevoke = this.pagerservice.getPager(this.pagenrevoke.totalUsers, pageno, this.showRevokeActive);
  if ((pageno > 1) && (!this.revokelist.length)) {
    this.revokefilter(null, pageno - 1)
  }
})
}

  empsearch(){
    this.getempofflist(this.searchform.value.empname,1)
  }
  revokedata(data){
    console.log("datauni==>",data.uniqueId)
    console.log("datastatu==>",data.status)
    this.apiService.putMethod7('/employeetimeoff/revoke/request',data.uniqueId,data.status).subscribe(data => {
      $("#revokemodal").modal("hide");
  
      this.search()
    })
  }
  search(){
    this.activebody ={
      "status":this.searchform.value.leavestatus?[this.searchform.value.leavestatus]:[],
      "leaveType":this.searchform.value.leavetype?[this.searchform.value.leavetype]:[],
      "dateRange":{
        "from":this.searchform.value.datefrom?new Date(this.searchform.value.datefrom).toJSON():null,
        "to":this.searchform.value.dateto?new Date(this.searchform.value.dateto).toJSON():null
        },
        "omitRevokeRequest":["RevokeRequest"],
        "manager":this.userObj.userName,
        "regex":{
          "employeeName":this.searchform.value.empname?this.searchform.value.empname:"",
        },
        "sortBy":"_id",
        "sortOrder":-1,
        "dataAccess": {
          "isAccess": true,
          "userName":this.userObj.userName
        },
    }
    this.revokebody ={
      "status":this.searchform.value.leavestatus?[this.searchform.value.leavestatus]:[],
      "leaveType":this.searchform.value.leavetype?[this.searchform.value.leavetype]:[],
      "dateRange":{
        "from":this.searchform.value.datefrom?new Date(this.searchform.value.datefrom).toJSON():null,
        "to":this.searchform.value.dateto?new Date(this.searchform.value.dateto).toJSON():null
        },
        "manager":this.userObj.userName,
        "regex":{
          "employeeName":this.searchform.value.empname?this.searchform.value.empname:"",
        },
        "sortBy":"_id",
        "sortOrder":-1,
        "dataAccess": {
          "isAccess": true,
          "userName":this.userObj.userName,
          
        },
    }
    this.getempofflist(null,1)
  }
  
  
 delete(id){
  var result = confirm("Are you sure to delete?");
  if (result) {
    this.apiService.deleteMethod1('/employeetimeoff/status/delete' ,id).subscribe(data => {
      console.log(data);
      alert("Delete Successfully");
      this.getempofflist(null,1);
      this.revokefilter(null,1)
    }, err => {
      console.log(err);
    });
  } return;
 }

 updateleave(){
  let body ={
    uniqueId:this.emptimeoff.uniqueId,
    employeeId:this.emptimeoff.employeeId,
    leaveType:this.updateleaveform.value.leavetype,
    startDate:new Date(this.updateleaveform.value.datefrom).toJSON(),
    endDate:new Date(this.updateleaveform.value.datefrom).toJSON(),
    numberOfDays:this.updateleaveform.value.numberOfDays,
    description:this.updateleaveform.value.reason
  }
  this.apiService.putMethod2("/employeetimeoff",body).subscribe( data => {
    $("#edit_leave").modal("hide");
    this.getempofflist(null,1)
 
  })
 }

 approve(){
 
  let body={
    employeeTimeOff:this.singleuniqueid,
    reviewedBy:this.userObj.userName,
    remarks:this.remarksapprove
  }
  console.log(body);
  this.apiService.putMethod2('/employeetimeoff/approve',body).subscribe(data => {
  
    alert("Approved Successfully");
    $("#approved_leave").modal("hide");
    this.remarksapprove=''

    this.getempofflist(null,1);
    this.revokefilter(null,1)
  }, err => {
    console.log(err);
  });
 }


 reject(){
  let body={
    employeeTimeOff:this.singleuniqueid,
    reviewedBy:this.userObj.userName,
    remarks:this.remarksapprove
  }
  this.apiService.putMethod2('/employeetimeoff/reject',body).subscribe(data => {
    console.log(data);
    alert("Reject Successfully");
    $("#rejected_leave").modal("hide");
    this.remarksreject=''
    this.getempofflist(null,1);
    this.revokefilter(null,1)
  }, err => {
    console.log(err);
  });
 }
 revokeaprove(){
  let body={
    employeeTimeOff:this.singleuniqueid,
    reviewedBy:this.userObj.userName,
    remarks:this.remarksapprove
  }
  this.apiService.putMethod2('/employeetimeoff/revoke',body).subscribe(data => {
    alert("Revoke Approved Successfully")
    $("#Revoke_leave").modal("hide");
    this.remarksreject=''
    this.getempofflist(null,1);
    this.revokefilter(null,1)
  }
  ,err =>{
    console.log(err);
  });
 }
}
