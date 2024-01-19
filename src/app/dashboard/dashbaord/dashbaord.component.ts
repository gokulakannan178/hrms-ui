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
 import { DatePipe } from '@angular/common';
 import { DataSharingServiceService } from './../../service/data-sharing-service.service';

declare var $:any;
@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css'],
  providers: [DatePipe]
})
export class DashbaordComponent implements OnInit {

  attendancedata:any;
  userObj:any
  timeoff:any=[];
  timeoffnull:any;
  timeoffshow:any;
  orgcount:any;
  employeecount:any;
  myDate :any;
  profileimage: any = {}
  emplyoee:any;


  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService, 
    private dataSharingService: DataSharingServiceService,
    public pagerservice: PagerService,private datePipe: DatePipe) {
    
     }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.myDate = new Date();
    this.userObj = JSON.parse(sessionStorage.userObj)
   

    this.todayemployees()
  this.getOrganisationCount()
  this.getEmployeeCount()
  this.getTimeoff()
  // this.getsingle()
  // this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');

  }
  
  
  todayemployees(){
 
    this.apiService.getMethod3("/attendance/todayemployees/leave").subscribe( data => {
      this.attendancedata = data.response.data.TodayEmployessLeave;
      console.log("AAA",this.attendancedata.todayPresent)
    })
  }

  getOrganisationCount(){
    let body ={
      dataAccess:{
      isAccess:true,  
      userName:this.userObj.userName,
    },
  }
    this.apiService.postMethod("/dashboard/organisation/count" ,body).subscribe( data => {
      this.orgcount = data.response.data.organisation;
    })
  }

  getEmployeeCount(){
    let body ={
      omitstatus:["Onboarding","Rejected","Offboard","Deleted","Relieve"],
      dataAccess:{
      isAccess:true,  
      userName:this.userObj.userName,
    },
  }
    this.apiService.postMethod("/dashboard/employee/count" ,body).subscribe( data => {
      this.employeecount = data.response.data.data;
    })
  }
  getTimeoff(){
    this.apiService.getMethod3("/attendance/todaytimeoff").subscribe( data => {
      this.timeoff = data.response.data.attendance;
      // console.log("ssggss",this.timeoff.length)
      if(this.timeoff==null){
        this.timeoffnull=true
      }
      for(let i=0;i>this.timeoff;i++){
         if(this.timeoff[i].length>2){
             this.timeoffshow=true
         }
     
         
      }
    })
  }

  // getsingle() {
  //   this.apiService.getMethod2("/employee", this.userObj.userName).subscribe(
  //     data => {
  //        this.emplyoee = data.response.data.data.name
  //       this.profileimage = data.response.data.data

  //       console.log("AAA", this.emplyoee)
  //       console.log("dhgdhdh", this.profileimage)

  //     })
  // }


}
