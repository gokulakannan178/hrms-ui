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

declare var $: any;
@Component({
  selector: 'app-individual-attendance',
  templateUrl: './individual-attendance.component.html',
  styleUrls: ['./individual-attendance.component.css']
})
export class IndividualAttendanceComponent implements OnInit {
  userObj: any;
  selectedMonth: any;
  daywisereport: any;
  public attendenceDetails: any = [];
  public attendencedaysDetails: any = [];
  monthArr: any;
  getstatics
  month: any;
  year: any;
  status: any;
  dataForms: any;
  public month_dd: any;
  individual_id: any;
  state: any
  checkitem: any = []
  checks: any
  attendaysDetails: any;
  attendaywisereport: any;
  approveattendence: any;
  rejectattendence: any;
  PaidovertimeModalForms: FormGroup
  editDetails: any;
  hours: any = []
  minutes: any = [
    { min: '00' },
    { min: '01' },
    { min: '02' },
    { min: '03' },
    { min: '04' },
    { min: '05' },
    { min: '06' },
    { min: '07' },
    { min: '08' },
    { min: '09' },
    { min: '10' },
    { min: '11' },
    { min: '12' },
    { min: '13' },
    { min: '14' },
    { min: '15' },
    { min: '16' },
    { min: '17' },
    { min: '18' },
    { min: '19' },
    { min: '20' },
    { min: '21' },
    { min: '22' },
    { min: '23' },
    { min: '24' },
    { min: '25' },
    { min: '26' },
    { min: '27' },
    { min: '28' },
    { min: '29' },
    { min: '30' },
    { min: '31' },
    { min: '32' },
    { min: '33' },
    { min: '34' },
    { min: '35' },
    { min: '36' },
    { min: '37' },
    { min: '38' },
    { min: '39' },
    { min: '40' },
    { min: '41' },
    { min: '42' },
    { min: '43' },
    { min: '44' },
    { min: '45' },
    { min: '46' },
    { min: '47' },
    { min: '48' },
    { min: '49' },
    { min: '50' },
    { min: '51' },
    { min: '52' },
    { min: '53' },
    { min: '54' },
    { min: '55' },
    { min: '56' },
    { min: '57' },
    { min: '58' },
    { min: '59' },
  ]
  overhours: any = []
  overminutes: any = [
    { min: '00' },
    { min: '01' },
    { min: '02' },
    { min: '03' },
    { min: '04' },
    { min: '05' },
    { min: '06' },
    { min: '07' },
    { min: '08' },
    { min: '09' },
    { min: '10' },
    { min: '11' },
    { min: '12' },
    { min: '13' },
    { min: '14' },
    { min: '15' },
    { min: '16' },
    { min: '17' },
    { min: '18' },
    { min: '19' },
    { min: '20' },
    { min: '21' },
    { min: '22' },
    { min: '23' },
    { min: '24' },
    { min: '25' },
    { min: '26' },
    { min: '27' },
    { min: '28' },
    { min: '29' },
    { min: '30' },
    { min: '31' },
    { min: '32' },
    { min: '33' },
    { min: '34' },
    { min: '35' },
    { min: '36' },
    { min: '37' },
    { min: '38' },
    { min: '39' },
    { min: '40' },
    { min: '41' },
    { min: '42' },
    { min: '43' },
    { min: '44' },
    { min: '45' },
    { min: '46' },
    { min: '47' },
    { min: '48' },
    { min: '49' },
    { min: '50' },
    { min: '51' },
    { min: '52' },
    { min: '53' },
    { min: '54' },
    { min: '55' },
    { min: '56' },
    { min: '57' },
    { min: '58' },
    { min: '59' },
  ]
  // hoursvalue:any
  minvalue: any
  overhoursvalue: any
  overminvalue: any
  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj')),

      this.individual_id = JSON.parse(sessionStorage.getItem('individualId'))
    console.log("individuakl id - ", this.individual_id);

    this.getmonth();
    this.getstaticts();

    this.dataForms = new FormGroup({
      monthArr: new FormControl(""),
      status: new FormControl(""),

    })


    this.PaidovertimeModalForms = new FormGroup({
      'date': new FormControl(""),
      'paid_time': new FormControl(""),
      'over_time': new FormControl(""),
      'notes': new FormControl(""),
      'hoursvalue': new FormControl(""),
      'minvalue': new FormControl(""),
      'overhoursvalue': new FormControl(""),
      'overminvalue': new FormControl(""),

    });
    let curentdate = new Date().getMonth() + 1
    console.log("date", curentdate)
    // this.month = this.prependZero(curentdate)
    this.month = sessionStorage.getItem('month')
    console.log("date", this.month)
    // this.year = new Date().getFullYear()
    this.year = sessionStorage.getItem('year')
    this.getattendence()
  }
  prependZero(number) {
    if (number < 9)
      return "0" + number;
    else
      return "" + number;
  }
  getValue(val) {
    this.monthArr = val;
    console.log("thisssss", this.monthArr);
  }

  bulkselect(e) {
    this.checkitem = [];
    if (e.target.checked == true) {
      this.checks = true
      this.attendenceDetails.days.forEach(element => {
        if (!element.uniqueId) {
        } else if (element.uniqueId == "") {
        } else {
          this.checkitem.push(element.uniqueId)
        }


      })
    }
    else {
      this.checks = false
    }
  }

  singleselect(e, i) {
    if (!i) {
      return
    }
    if (i == "") {
      return
    }
    if (e.target.checked) {
      this.checkitem.push(i)
    }

    else {
      let j = 0;
      this.checkitem.forEach(element => {
        if (i == element) {
          this.checkitem.splice(j, 1)
          return
        }
        j++;
      });
    }
    console.log("checkitem", this.checkitem)
  }

  getstaticts() {

    this.apiService.getMethod1("/attendancelog/employee/statistics", this.userObj.employeeId).subscribe(data => {

      this.getstatics = data.response.data.AttendanceLog;
      // this.getapplication = data.response.data.AttendanceLog;
      // console.log("hello statistics",this.getapplication);
      let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]



      for (let i = 0; i < hours.length; i++) {
        if (this.getstatics.todaytotalworkingHours >= hours[i]) {
          this.hours.push(hours[i])
        }
        this.overhours.push(hours[i])

      }
      // for(let i=0;i<hours.length;i++){
      //   if(this.getstatics.totalOvertime>=hours[i]){
      //     // console.log("SS",hours[i])
      //       this.overhours.push(hours[i])
      //   }

      // }

    }, err => {
      console.log(err);
    });
  }

  minutesvalue(e) {
    let min = [
      { min: '00' },
      { min: '01' },
      { min: '02' },
      { min: '03' },
      { min: '04' },
      { min: '05' },
      { min: '06' },
      { min: '07' },
      { min: '08' },
      { min: '09' },
      { min: '10' },
      { min: '11' },
      { min: '12' },
      { min: '13' },
      { min: '14' },
      { min: '15' },
      { min: '16' },
      { min: '17' },
      { min: '18' },
      { min: '19' },
      { min: '20' },
      { min: '21' },
      { min: '22' },
      { min: '23' },
      { min: '24' },
      { min: '25' },
      { min: '26' },
      { min: '27' },
      { min: '28' },
      { min: '29' },
      { min: '30' },
      { min: '31' },
      { min: '32' },
      { min: '33' },
      { min: '34' },
      { min: '35' },
      { min: '36' },
      { min: '37' },
      { min: '38' },
      { min: '39' },
      { min: '40' },
      { min: '41' },
      { min: '42' },
      { min: '43' },
      { min: '44' },
      { min: '45' },
      { min: '46' },
      { min: '47' },
      { min: '48' },
      { min: '49' },
      { min: '50' },
      { min: '51' },
      { min: '52' },
      { min: '53' },
      { min: '54' },
      { min: '55' },
      { min: '56' },
      { min: '57' },
      { min: '58' },
      { min: '59' },

    ]
    this.minutes = []
    if (this.getstatics.todaytotalworkingHours == e.target.value) {
      this.minutes.push({ min: '00' })
    } else {
      this.minutes = min
    }

  }

  overminutesvalue(e) {
    let min = [
      { min: '00' },
      { min: '01' },
      { min: '02' },
      { min: '03' },
      { min: '04' },
      { min: '05' },
      { min: '06' },
      { min: '07' },
      { min: '08' },
      { min: '09' },
      { min: '10' },
      { min: '11' },
      { min: '12' },
      { min: '13' },
      { min: '14' },
      { min: '15' },
      { min: '16' },
      { min: '17' },
      { min: '18' },
      { min: '19' },
      { min: '20' },
      { min: '21' },
      { min: '22' },
      { min: '23' },
      { min: '24' },
      { min: '25' },
      { min: '26' },
      { min: '27' },
      { min: '28' },
      { min: '29' },
      { min: '30' },
      { min: '31' },
      { min: '32' },
      { min: '33' },
      { min: '34' },
      { min: '35' },
      { min: '36' },
      { min: '37' },
      { min: '38' },
      { min: '39' },
      { min: '40' },
      { min: '41' },
      { min: '42' },
      { min: '43' },
      { min: '44' },
      { min: '45' },
      { min: '46' },
      { min: '47' },
      { min: '48' },
      { min: '49' },
      { min: '50' },
      { min: '51' },
      { min: '52' },
      { min: '53' },
      { min: '54' },
      { min: '55' },
      { min: '56' },
      { min: '57' },
      { min: '58' },
      { min: '59' },

    ]
    this.overminutes = []
    if (this.overhoursvalue == 12) {
      this.overminutes.push({ min: '00' })
    } else {
      this.overminutes = min
    }

  }

  public saveedittime() {

    let body = {
      "employeeId": this.userObj.employeeId,
      "totalworkingHoursStr": this.PaidovertimeModalForms.value.hoursvalue + ':' + this.PaidovertimeModalForms.value.minvalue,
      // "date":new Date(this.editDetails.uniqueId).toJSON(),
      "date": this.editDetails.date,
      "totalOverTimehoursstr": this.PaidovertimeModalForms.value.overhoursvalue + ':' + this.PaidovertimeModalForms.value.overminvalue,
      "notes": this.PaidovertimeModalForms.value.notes,
    }
    this.apiService.postMethod("/attendance/employeeedit", body).subscribe(data => {
      $("#PaidtimeModal").modal("hide");
      alert("Saved Successfully")
      console.log('Time', data);
      this.month_dd = data.response.data.EmployeeAttendanceCalendar;
      console.log("month_dd", this.month_dd);
      this.getattendence();
      this.getmonth();
      this.spinner.hide();
    })
  }

  approverequest() {
    this.spinner.show();
    var body =
    {
      "employeeId": this.individual_id,

      "uniqueId": this.checkitem,

    }

    this.apiService.putMethod2("/attendance/approved", body).subscribe(data => {

      this.spinner.hide();
      this.approveattendence = data.response.data.attendance;
      console.log("approveattendence", this.approveattendence)
      alert("Approved Successfully")
      this.getattendence();
    }, err => {
      this.spinner.hide();
      console.log(err);
    });

  }
  rejectrequest() {
    this.spinner.show();
    var body =
    {
      "employeeId": this.individual_id,

      "uniqueId": this.checkitem,

    }

    this.apiService.putMethod2("/attendance/rejected", body).subscribe(data => {

      this.spinner.hide();
      this.rejectattendence = data.response.data.attendance;
      console.log("rejectattendence", this.rejectattendence)
      alert("Rejected Successfully")
      this.getattendence();

    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }


  getmonth() {
    let body = {
      "status": ["Active"]
    }
    this.apiService.postMethod("/employeeattendancecalendar/filter?pageno=no", body).subscribe(data => {
      console.log('Month filter', data);
      this.month_dd = data.response.data.EmployeeAttendanceCalendar;
      console.log("month_dd", this.month_dd);

    })
  }

  documentexcel() {
    let date = new Date().getDate()
    date = 5
    let body = {
      "employeeId": this.individual_id,
      "startDate": new Date(this.year + '-' + this.month + '-' + date).toJSON(),
      "status": this.status,

    }
    this.apiService.downloadReport("/attendance/employee/daywisereport?resType=reportexcel", body).subscribe((data: any) => {
      saveAs(data, 'attendance.xlsx')
    })

  }

  public getattendence() {
    //     let statusbody
    //     if(this.dataForms.value.state=="allstatus"){
    //        statusbody=["Approved","Pending","Reject"]
    //     }
    //     else if(this.dataForms.value.state=="Approved"){
    //       statusbody="Approved"
    //    }
    //    else if(this.dataForms.value.state=="Pending"){
    //     statusbody="Pending"
    //  }
    //  else if(this.dataForms.value.state=="Reject"){
    //   statusbody="Reject"
    // }
    // else{
    //   return
    // }

    this.spinner.show();
    let date = new Date().getDate()
    console.log("looooo==========>", this.status)
    date = 5
    var body =
    {
      "employeeId": this.individual_id,
      "startDate": new Date(this.year + '-' + this.month + '-' + date).toJSON(),
      "status": this.status,

    }

    this.apiService.postMethod("/attendance/employee/daywisereport?pageno=no", body).subscribe(data => {
      sessionStorage.setItem('daywisereport', JSON.stringify(data.response.data.attendance))
      this.daywisereport = JSON.parse(sessionStorage.getItem('daywisereport'))
      //  this.dataForms.controls['monthArr'].setValue( this.attendenceDetails.days)


      this.spinner.hide();
      this.attendenceDetails = data.response.data.attendance;
      this.attendencedaysDetails = data.response.data.attendance.days;

    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  normalSearch() {

    this.getattendence();
  }

  useraction(type, data) {
    if (type == 'editpaid') {
      this.editDetails = data
      this.PaidovertimeModalForms.controls['date'].setValue(this.editDetails.uniqueId);
      localStorage.setItem("data", data.date);
    }
  }

}
