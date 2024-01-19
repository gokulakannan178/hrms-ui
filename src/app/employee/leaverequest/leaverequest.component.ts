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
 import { NgxSpinnerService } from 'ngx-spinner'
 import { DatePipe } from '@angular/common';
 import { saveAs } from 'file-saver';

 declare var $

@Component({
  selector: 'app-leaverequest',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.css']
})
export class LeaverequestComponent implements OnInit {
  public apiUrl = myGlobals.base_api_url;
  employeedata:any
  userObj:any
  employeedashoard:any
  employeedashoardadd:any
 

  remaninigleaves:any
  addleave:FormGroup
  noofdays:any
  uniqueidtype:any
  paidtype:any
  deleteempid:any
  editleave:FormGroup
  singleemployeedata:any
  editnoofdays:any
  editremaninigleaves:any
  edituniqueidtype:any
  editpaidtype:any
  datePickerMax:string="2023-06-28"

  Uniqueid:any
  statusid:any
 
  

  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService) { } 

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.addleave = new FormGroup({
      leavetype: new FormControl("",Validators.required),
      fromdate:new FormControl("",Validators.required),
      todate:new FormControl("",Validators.required),
      desc:new FormControl("",Validators.required),
    })

    this.editleave = new FormGroup({
      leavetype: new FormControl("",Validators.required),
      fromdate:new FormControl("",Validators.required),
      todate:new FormControl("",Validators.required),
      desc:new FormControl("",Validators.required),
    })
    this.employeedashlist()
    this.employeelist()
    this.employeedashaddlist()

    var d = new Date();
    let today = (d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + (d.getDate())).slice(-2));
    $('#myDate').prop('min', today);

   
  }

  employeedashlist(){
    var body={
      "employeeId":this.userObj.employeeId,
          }
    this.apiService.postMethod("/employeeleave/list/v2" ,body).subscribe( data => {
      this.employeedashoard = data.response.data.EmployeeLeave.employeeLeave;
          
    })
  }
  employeedashaddlist(){
    var body={
      "employeeId":this.userObj.employeeId,
      "isZero":"No"
    }
    this.apiService.postMethod("/employeeleave/list/v2" ,body).subscribe( data => {
      this.employeedashoardadd = data.response.data.EmployeeLeave.employeeLeave;
          
    })
  }
   
  employeelist(){
    var body={
      "employeeId":[this.userObj.employeeId],
      "sortBy":"_id",
      "sortOrder":-1
    }
    this.apiService.postMethod("/employeetimeoff/filter?pageno=no" ,body).subscribe( data => {
      this.employeedata = data.response.data.EmployeeTimeOff;
          
    })
  }

  getemployeelist(id){
    this.apiService.getMethod2("/employeetimeoff",id).subscribe( data => {
      this.singleemployeedata = data.response.data.EmployeeTimeOff;
      // console.log("sssss",this.singleemployeedata.ref.employeeLeave.leaveType+"_"+this.singleemployeedata.ref.employeeLeave.value)

      this.editleave.controls["leavetype"].setValue(this.singleemployeedata.ref.employeeLeave.leaveType+"_"+this.singleemployeedata.ref.employeeLeave.value+"_"+this.singleemployeedata.paidType)
      console.log("checking",this.editleave.controls["leavetype"])
      this.editleave.controls["fromdate"].setValue(this.apiService.getDate1(this.singleemployeedata.startDate))
      this.editleave.controls["todate"].setValue(this.apiService.getDate1(this.singleemployeedata.endDate))
      this.editleave.controls["desc"].setValue(this.singleemployeedata.description)
      this.edituniqueidtype=this.singleemployeedata.leaveType
      this.editpaidtype=this.singleemployeedata.paidType
   console.log(" this.edituniqueidtype", this.edituniqueidtype)
   console.log("this.editpaidtype",this.editpaidtype)

      this.editremaninigleaves=this.singleemployeedata.ref.employeeLeave.value
    this.geteditDiffDays(this.singleemployeedata.startDate,this.singleemployeedata.endDate)

    })

  }


  leavetype(data){
    console.log("hello",data)
    let myarray=data.target.value.split("_")
    this.remaninigleaves=myarray[0]
    this.uniqueidtype=myarray[1]
    this.paidtype=myarray[2]
    
  }

  leavetypeedit(data){
    let myarray=data.target.value.split("_")
   console.log("myarray",myarray)
    
    this.editremaninigleaves=myarray[0]
    this.edituniqueidtype=myarray[1]
   this.editpaidtype=myarray[2]
  //  console.log("edit",this.editleave.value.leavetype)
    
  }
setEndDate(){
  var d = new Date(this.addleave.value.fromdate);
console.log("c d=",d, "rl = ",this.remaninigleaves);
console.log("days=",new Date(this.addleave.value.fromdate).getDate());
console.log("add days=",d.getDate() + this.remaninigleaves);

      d.setDate(d.getDate() + parseInt(this.remaninigleaves)-1);
console.log("d=",d);

      let today = (d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + (d.getDate())).slice(-2));
console.log("today=",today);
      
      // $('#mydate').prop('max', today);
      this.datePickerMax = today
console.log("d=",d,"today=",today,"rl = ",this.remaninigleaves);

}
  getDiffDays(data) {
    

    var startDate = new Date(this.addleave.value.fromdate);
    var endDate = new Date(this.addleave.value.todate);

    // console.log("Aaa",this.addleave.value.fromdate)
    if(this.addleave.value.fromdate!=''){
      var Time = endDate.getTime() - startDate.getTime();
      console.log(Time / (1000 * 3600 * 24)) 
      this.noofdays=Time / (1000 * 3600 * 24)+1

      
      
    }else{
      alert("Fill from and to date")
    }
  
  }

  geteditDiffDays(fdate,todate) {
    var startDate = new Date(fdate);
    var endDate = new Date(todate);
      var Time = endDate.getTime() - startDate.getTime();
      console.log(Time / (1000 * 3600 * 24)) 
      this.editnoofdays=Time / (1000 * 3600 * 24)+1
  
  
  }

  
  getupdateDiffDays() {
    var startDate = new Date(this.editleave.value.fromdate);
    var endDate = new Date(this.editleave.value.todate);

    // console.log("Aaa",this.editleave.value.fromdate)
    if(this.editleave.value.fromdate!='' && this.editleave.value.todate!=''){
      var Time = endDate.getTime() - startDate.getTime();
      console.log(Time / (1000 * 3600 * 24)) 
      this.editnoofdays=Time / (1000 * 3600 * 24)+1
    }else{
      alert("Fill from and to date")
    }
  
  }


  addleavedata(){
  

    var body={
      "employeeId": this.userObj.employeeId,
      "organisationId":this.userObj.organisationId,
      "startDate":new Date(this.addleave.value.fromdate).toJSON(),
     "endDate":new Date(this.addleave.value.todate).toJSON(),
     "numberOfDays":this.noofdays,
     "description": this.addleave.value.desc,
      "leaveType":this.uniqueidtype,
      "paidType":this.paidtype,

  }
  this.apiService.postMethod("/employeetimeoff" ,body).subscribe(
    data => {
      // $('#emergency_contact_modal').modal('hide')
      $("#add_leave").modal("hide");
      this.addleave.reset()
      this.noofdays=""
      this.remaninigleaves=""
      this.employeelist()
      this.employeedashlist()
      this.employeedashaddlist()
      // this.emplyoee = data.response.data.data
    },
    err => {
      // this.spinner.hide();
    }
  )
}
cleardata(){
  $("#add_leave").modal("hide");
  this.addleave.reset()
  this.noofdays=""
  this.remaninigleaves=""
  this.employeelist()
}

updateleavedata(){

  var body={
    "uniqueId": this.singleemployeedata.uniqueId,
    "employeeId": this.userObj.employeeId,
    "startDate":this.apiService.getDatee(this.editleave.value.fromdate),
   "endDate":this.apiService.getDatee(this.editleave.value.todate),
   "description": this.editleave.value.desc,
    "leaveType":this.edituniqueidtype,
    "paidType":this.edituniqueidtype

}
this.apiService.putMethod2("/employeetimeoff" ,body).subscribe(
  data => {
    // $('#emergency_contact_modal').modal('hide')
    $("#edit_leave").modal("hide");
    this.addleave.reset()
    this.noofdays=""
    this.remaninigleaves=""
    this.employeelist()
    this.employeedashlist()
    this.employeedashaddlist()
    // this.emplyoee = data.response.data.data
  },
  err => {
    // this.spinner.hide();
  }
)
}


status(data){
  this.Uniqueid=data.uniqueId
  this.statusid=data.status
}
revokedata(){

  this.apiService.putMethod7('/employeetimeoff/revoke/request',this.Uniqueid,this.statusid).subscribe(data => {
    $("#revokemodal").modal("hide");

    this.employeelist()
    this.employeedashlist()
    this.employeedashaddlist()
  })
}

canceldata(){

    this.apiService.putMethod7('/employeetimeoff/revoke/request',this.Uniqueid,this.statusid).subscribe(data => {
      console.log(data);
    //alert("Delete Successfully");
    $("#deleteModal").modal("hide");

    this.employeelist()
    }, err => {
      console.log(err);
    });
    this.employeedashlist()
    this.employeedashaddlist()
  } 
  

}
