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
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";

declare var $: any;


@Component({
  selector: 'app-employee-dashbaord',
  templateUrl: './employee-dashbaord.component.html',
  styleUrls: ['./employee-dashbaord.component.css'],
  providers: [DatePipe]
})
export class EmployeeDashbaordComponent implements OnInit {
  public apiUrl = myGlobals.base_api_url;
  ms: any = '0' + 0;
  sec: any = '0' + 0;
  hr: any = '0' + 0;
  min: any = '0' + 0;
  startTimer: any
  running = false
  userObj: any;
  emplyoee: any = {};
  emplyoeeid: any
  attendancedata: any = {};
  getstatics: any = {};
  timeoff: any = [];
  myDate: any;
  Holidaytitle: any;
  rightDate: Date;
  employeedashoard: any
  getapplication: any = {};
  getactivity: any;
  time: Date = new Date();
  runTimer: boolean = false;
  intervalId;
  subscription: Subscription;
  public eventList: any = [];
  firsteventDate: any
  lasteventDate: any
  public modalButtonText: string;
  clockOutDetails: any;
  clockInDetails: any;
  employeedashoardadd: any;
  timeoffshow: boolean = false
  timeoffnull: boolean = false
  eventDate: any
  plusbutton: boolean = false
  headdate: any
  bdayheaddate: any
  count: any
  bdaycount: any
  dashboardImg: string;

  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'))
    this.myDate = new Date();
    this.rightDate = new Date();
    this.emplyoeeid = this.userObj.userName
    //  this.eventsform = new FormGroup({
    //     weekdates:new FormControl("",Validators.required)
    //  })

    this.getsingle();
    this.getTimeoff();
    this.employeedashlist();
    this.employeedashaddlist();
    this.getsingleapiattendence();

    this.holidayevent(this.myDate)
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.Holidaytitle = new Date();
    $('.bs-example-modal-new').modal('hide')
    $('body').removeClass("modal-open");
    $('.modal-backdrop').remove();
  }

  start(): void {
    if (!this.running) {
      this.running = true
      this.startTimer = setInterval(() => {
        this.ms++
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms
        if (this.ms === 100) {
          this.sec++
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec
          this.ms = '0' + 0
        }
        if (this.sec === 60) {
          this.min++
          this.min = this.min < 10 ? '0' + this.min : this.min
          this.sec = '0' + 0
        }
        if (this.min === 60) {
          this.hr++
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr
          this.min = '0' + 0

        }
      }, 10)
    } else {
      this.stop()
    }
  }

  stop(): void {
    clearInterval(this.startTimer)
    this.running = false
  }


  getsingle() {
    this.apiService.getMethod2("/employee", this.emplyoeeid).subscribe(
      data => {
        this.emplyoee = data.response.data.data
        if (this.emplyoee.profileImg != "") {
          this.dashboardImg = this.apiUrl + this.emplyoee.profileImg;
        } else if (this.emplyoee.gender == 'Male') {
          this.dashboardImg = "/assets/img/profile_male.png";
        } else if (this.emplyoee.gender == 'Female') {
          this.dashboardImg = "/assets/img/profile_female.png";
        }
        console.log("Employee name", this.dashboardImg)

      })
  }


  getTimeoff() {

    this.apiService.getMethod3("/attendance/todaytimeoff").subscribe(data => {
      this.timeoff = data.response.data.attendance;
      // console.log("ssggss",this.timeoff.length)
      if (this.timeoff == null) {
        this.timeoffnull = true
      }
      for (let i = 0; i > this.timeoff; i++) {
        if (this.timeoff[i].length >= 2) {
          this.timeoffshow = true
        }


      }
    })
  }
  employeedashlist() {
    var body = {
      "employeeId": this.userObj.employeeId,
    }
    this.apiService.postMethod("/employeeleave/list/v2", body).subscribe(data => {
      this.employeedashoard = data?.response?.data?.EmployeeLeave?.employeeLeave;
      console.log("Employee", this.employeedashoard)

    })
  }
  employeedashaddlist() {
    var body = {
      "employeeId": this.userObj.employeeId,
      "isZero": "No"
    }
    this.apiService.postMethod("/employeeleave/list/v2", body).subscribe(data => {
      this.employeedashoardadd = data?.response?.data?.EmployeeLeave?.employeeLeave;

    })
  }

  textcheck() {
    if (this.getapplication.totalworkingHours) {
      var hours = Math.floor(this.getapplication.totalworkingHours / 60);
      var minutes = this.getapplication.totalworkingHours % 60;
      // recentpunchinTime
      console.log("b4 time = ", this.getapplication.recentpunchinTime);

      this.time = new Date(this.getapplication.recentpunchinTime)
      console.log("time", this.time);

      const utc1 = Date.UTC(this.time.getFullYear(), this.time.getMonth(), this.time.getDate());
      let d = new Date()
      console.log("time 2", d);

      const utc2 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
      console.log("utc1", utc1);
      console.log("utc2", utc2);

      const diffTime = Math.abs(utc2 - utc1);
      const diffDays = Math.ceil(diffTime / (60 * 60 * 24));
      console.log("diffDays", diffTime, diffDays);

      // this.time.setMinutes(this.time.getMinutes()+minutes)
      // this.time.setHours(this.time.getMinutes())



    }
    if (this.getapplication.currentStatus == 'Login') {
      this.runTimer = true
      // Using Basic Interval
      this.intervalId = setInterval(() => {
        console.log(this.runTimer);
        this.time = new Date(this.time.getTime() + 1000);
        // this.time.setSeconds(this.time.getSeconds()+1)

      }, 1000);
      this.modalButtonText = 'Punch Out'
      return
    }
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.runTimer = false
    this.modalButtonText = 'Punch In'
  }

  getsingleapiattendence() {

    this.apiService.getMethod1("/attendancelog/employee/todaystatus", this.userObj.employeeId).subscribe(data => {

      this.getapplication = data.response.data.AttendanceLog;
      console.log("hello", this.getapplication);
      if (this.getapplication.totalworkingHours != 0) {
        if (this.getapplication.currentStatus == "Login") {
          //   alert("Aaa")
          var totalTimeInMinutes = this.getapplication.totalworkingHours;
          var hour = Math.floor(totalTimeInMinutes / 60); //1h
          var minutes = totalTimeInMinutes - (hour * 60); //30m
          var Seconds = (totalTimeInMinutes % (24 * 3600 * 3600 * 60)) / 60
          console.log("aaa", hour, "assss", Math.floor(minutes), "sec", Math.floor(Seconds))
          this.ms = '0' + 0;
          this.sec = Math.floor(Seconds);
          this.hr = hour;
          this.min = Math.floor(minutes);
          this.running = false
          this.start()
        } else if (this.getapplication.currentStatus == "Logout") {
          // this.getsingleapi()
          var totalTimeInMinutes = this.getapplication.totalworkingHours;
          var hour = Math.floor(totalTimeInMinutes / 60); //1h
          var minutes = totalTimeInMinutes - (hour * 60); //30m
          var Seconds = (totalTimeInMinutes % (24 * 3600 * 3600 * 60)) / 60
          console.log("aaa", hour, "assss", Math.floor(minutes), "sec", Math.floor(Seconds))
          this.sec = Math.floor(Seconds);
          this.hr = hour;
          this.min = Math.floor(minutes);
        }
      }
      this.textcheck()
    }, err => {
      console.log(err);
    });


  }

  public clockin() {
    this.spinner.show();
    var body =
    {
      "employeeId": this.userObj.employeeId,
      "imageUrl": "",
      "notes": "",

    }

    this.apiService.postMethod("/attendance/clockin?pageno=no", body).subscribe(data => {
      // sessionStorage.setItem('daywisereport', JSON.stringify(data.response.data.attendance))
      // this.daywisereport= JSON.parse(sessionStorage.getItem('daywisereport'))

      this.spinner.hide();
      this.clockInDetails = data.response.data.attendance;
      this.getsingleapiattendence();


    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  public clockout() {
    this.spinner.show();
    var body =
    {
      "employeeId": this.userObj.employeeId,

      "notes": "",

    }

    this.apiService.putMethod2("/attendance/clockout?pageno=no", body).subscribe(data => {
      // sessionStorage.setItem('daywisereport', JSON.stringify(data.response.data.attendance))
      // this.daywisereport= JSON.parse(sessionStorage.getItem('daywisereport'))

      this.spinner.hide();
      this.clockOutDetails = data.response.data.attendance;
      this.getsingleapiattendence()

    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  toggle() {

    if (this.getapplication.currentStatus == 'Login') {
      // this.modalButtonText = 'Punch In'
      this.running = true
      this.start()
      this.clockout();
      return
    }
    this.running = false
    // this.modalButtonText = 'Punch Out'
    var totalTimeInMinutes = this.getapplication.totalworkingHours;
    var hour = Math.floor(totalTimeInMinutes / 60); //1h
    var minutes = totalTimeInMinutes - (hour * 60); //30m
    var Seconds = (totalTimeInMinutes % (24 * 3600 * 3600 * 60)) / 60
    console.log("aaa", hour, "assss", Math.floor(minutes), "sec", Math.floor(Seconds))
    this.ms = '0' + 0;
    this.sec = Math.floor(Seconds);
    this.hr = hour;
    this.min = Math.floor(minutes);
    // this.running=false
    this.clockin();
    this.start()

    // this.textcheck();
  }
  holidayevent(date) {
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    let body = {
      "date": {
        "startDate": new Date(date).toJSON()
      }
    }
    this.apiService.putMethod2("/holidays/weeks", body).subscribe(data => {
      console.log("holiday", body)
      this.eventList = data.response.data.Holidays
      this.firsteventDate = new Date(this.eventList[0].date)
      this.lasteventDate = new Date(this.eventList[this.eventList.length - 1].date)
      console.log("  this.firsteventDate==>", this.firsteventDate)
      console.log("  this.lasteventDate==>", this.lasteventDate)
      this.Holidaytitle = this.datePipe.transform(this.firsteventDate, 'yyyy-MM-dd').concat(" - ", this.datePipe.transform(this.lasteventDate, 'yyyy-MM-dd'))
      console.log(" this.Holidaytitle==>", this.Holidaytitle)
      for (let i = 0; i < this.eventList?.length; i++) {
        for (let j = 0; j < this.eventList[i]?.anniversaryEmployee?.length; j++) {
          this.count = j + 1
          if (j == 1) {
            this.plusbutton = true
          }

        }
        for (let k = 0; k < this.eventList[i]?.brithdateEmployee?.length; k++) {
          this.bdaycount = k + 1
        }
      }
    })
  }
  changeright() {

    var date = new Date();
    console.log("ste=====", this.lasteventDate)
    this.tomorrow(this.lasteventDate)
    console.log("stettt=====", this.rightDate)
    // this.myDate = new Date();
    this.holidayevent(this.rightDate)

  }
  changeleft() {

    var date = new Date();
    console.log("ste=====", this.firsteventDate)

    this.rightDate.setDate(this.firsteventDate.getDate() - 1)
    this.yesterday(this.firsteventDate)
    console.log("stettt=====", this.rightDate)
    // this.myDate = new Date();
    this.holidayevent(this.rightDate)

  }
  tomorrow(dt) {

    // Creating the date instance
    let d = new Date(dt);

    // Adding one date to the present date
    d.setDate(d.getDate() + 1);

    let year = d.getFullYear()
    let month = String(d.getMonth() + 1)
    let day = String(d.getDate())

    // Adding leading 0 if the day or month
    // is one digit value
    month = month.length == 1 ?
      month.padStart(2, '0') : month;

    day = day.length == 1 ?
      day.padStart(2, '0') : day;
    let newdate = new Date(`${year}-${month}-${day}`)
    console.log(newdate)
    this.rightDate = newdate
  }
  yesterday(dt) {

    // Creating the date instance
    let d = new Date(dt);

    // Adding one date to the present date
    d.setDate(d.getDate() - 1);

    let year = d.getFullYear()
    let month = String(d.getMonth() + 1)
    let day = String(d.getDate())

    // Adding leading 0 if the day or month
    // is one digit value
    month = month.length == 1 ?
      month.padStart(2, '0') : month;

    day = day.length == 1 ?
      day.padStart(2, '0') : day;
    let newdate = new Date(`${year}-${month}-${day}`)
    console.log(newdate)
    this.rightDate = newdate
  }
  pluse(day) {
    // $("#langModal").modal("show"); 
    console.log("SS", day);
    this.headdate = day

  }
  bdaypluse(day) {
    this.bdayheaddate = day
    console.log("bday", day)
  }
}
