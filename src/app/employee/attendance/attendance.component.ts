import { Component, OnInit, OnDestroy } from '@angular/core';
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

import { Subscription, empty, timer } from "rxjs";



import { map, share } from "rxjs/operators";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit, OnDestroy {
  ms: any = '0' + 0;
  sec: any = '0' + 0;
  hr: any = '0' + 0;
  min: any = '0' + 0;
  startTimer: any
  running = false

  public attendenceDetails: any = [];
  public attendence: any = [];
  public getTodayActivity: any = [];
  userObj: any;
  month: any;
  year: any;
  daywisereport: any;
  public month_dd: any;
  dataForms: any;
  public PaidovertimeModalForms: FormGroup;
  monthArr: any;
  days: any
  date: any
  getapplication: any = {};
  getactivity: any;
  getstatics: any = {};
  clockOutDetails: any;
  clockInDetails: any;
  checkitem: any = []
  checks: any
  attendaysDetails: any;
  attendaywisereport: any;
  approveattendence: any;
  rejectattendence: any;
  editDetails: any;
  overtime: any
  totalhours: any

  public modalButtonText: string;

  time: Date = new Date();
  rxTime = new Date();
  intervalId;
  subscription: Subscription;
  runTimer: boolean = false;
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
  hoursvalue: any = ""
  minvalue: any = ""
  overhoursvalue: any = ""
  overminvalue: any = ""
  myDate:any
   
  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService, public datepipe: DatePipe) { 
      
    }

  ngOnInit(): void {
    this.getdate()
    this.userObj = JSON.parse(sessionStorage.getItem('userObj')),
      // this.daywisereport=sessionStorage.daywisereport
      // console.log("dsjdhjshdjsj",this.daywisereport)
      //this.days=this.daywisereport.workSchedule.days[0].dateStr
      this.dataForms = new FormGroup({
        monthArr: new FormControl(""),
        status: new FormControl(""),
       
      })

    this.PaidovertimeModalForms = new FormGroup({
      'date': new FormControl(""),
      'paid_time': new FormControl(""),
      'over_time': new FormControl(""),
      'notes': new FormControl(""),


    });
    this.myDate=new Date()

    let year = new Date().getFullYear()

    this.getmonth();
    this.getsingleapi();
    this.getstaticts();
    this.gettodayactivity();
    this.textcheck();


    let curentdate = new Date().getMonth() + 1
    console.log("date", curentdate)
    this.month = this.prependZero(curentdate)
    console.log("date", this.month)
    this.year = new Date().getFullYear()
    this.getattendence()
  }
  prependZero(number) {
    if (number < 9)
      return "0" + number;
    else
      return "" + number;
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

  //   bulkselect(e){
  //     this.checkitem = [];
  //     if(e.target.checked == true){
  //       this.checks=true
  // this.attendenceDetails.days.forEach(element=>{
  //   if (!element.uniqueId){
  //   }else   if (element.uniqueId==""){
  //   } else{
  //     this.checkitem.push(element.uniqueId)
  //   }   


  // })
  //     }
  //     else{
  //       this.checks=false
  //     }
  //   }

  //   singleselect(e,i){
  //     if (!i){
  //       return
  //     }
  //     if (i==""){
  //       return
  //     }
  //     if(e.target.checked){
  //         this.checkitem.push(i)
  //     }

  //     else{
  //        let j=0;
  //         this.checkitem.forEach(element => {
  //           if(i == element){
  //             this.checkitem.splice(j,1)
  //             return
  //           }
  //           j++;
  //         });
  //     }
  // console.log("checkitem",this.checkitem)
  //   }

  //   approverequest(){
  //     this.spinner.show();
  //     var body =
  //     {
  //       "employeeId":this.userObj.employeeId,

  //       "uniqueId":this.checkitem,

  //     }

  //     this.apiService.putMethod2("/attendance/approved", body).subscribe(data => {

  //       this.spinner.hide();
  //       this.approveattendence = data.response.data.attendance;
  //       console.log("approveattendence", this.approveattendence)
  //       alert("Approved Successfully")
  //       this.getattendence();
  //     }, err => {
  //       this.spinner.hide();
  //       console.log(err);
  //     });

  //   }
  //   rejectrequest(){
  //     this.spinner.show();
  //     var body =
  //     {
  //       "employeeId":this.userObj.employeeId,

  //       "uniqueId":this.checkitem,
  //     }

  //     this.apiService.putMethod2("/attendance/rejected", body).subscribe(data => {

  //       this.spinner.hide();
  //       this.rejectattendence = data.response.data.attendance;
  //       console.log("rejectattendence", this.rejectattendence)
  //       alert("Rejected Successfully")

  //     }, err => {
  //       this.spinner.hide();
  //       console.log(err);
  //     });
  //   }


  // Live clock
  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
  getsingleapi() {

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


  documentexcel() {
    let date = new Date().getDate()
    let body = {
      "employeeId": this.userObj.employeeId,
      "startDate": new Date(this.year + '-' + this.month + '-' + date).toJSON(),

    }
    this.apiService.downloadReport("/attendance/employee/daywisereport?resType=reportexcel", body).subscribe((data: any) => {
      saveAs(data, 'attendance.xlsx')
    })

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


  getstaticts() {

    this.apiService.getMethod1("/attendancelog/employee/statistics", this.userObj.employeeId).subscribe(data => {

      this.getstatics = data.response.data.AttendanceLog;
      // this.getapplication = data.response.data.AttendanceLog;
      console.log("hello statistics", this.getapplication);
      // let hours=[0,1,2,3,4,5,6,7,8,9,10,11,12]



      // for(let i=0;i<hours.length;i++){
      //   if(this.getstatics.todaytotalworkingHours>=hours[i]){

      //       this.hours.push(hours[i])
      //   }
      //       this.overhours.push(hours[i])

      // }
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
    console.log("paidtime====>", e)
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
    console.log("mingk", this.editDetails.paidTime)
    if (this.getstatics.todaytotalworkingHours == e) {
      this.minutes.push({ min: '00' })
    } else if (this.editDetails.paidTime <= 0) {
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
  gettodayactivity() {

    this.apiService.getMethod1("/attendancelog/employee/todaylogs", this.userObj.employeeId).subscribe(data => {

      this.getactivity = data.response.data.AttendanceLog;
      console.log("hello todaylog", this.getactivity);


    }, err => {
      console.log(err);
    });
  }
  editdeleted() {
    let hrs = []
    this.hours = hrs

    console.log("deleted====>", this.hours)
    console.log("deleted====>", hrs)
    this.PaidovertimeModalForms.reset();
    this.hoursvalue = 0
    this.overminvalue = 0
    //  this.PaidovertimeModalForms.reset()

  }

  useraction(type, data) {
    if (type == 'editpaid') {
      console.log("editpaid=========>", data)
      this.editDetails = data
      this.PaidovertimeModalForms.controls['date'].setValue(this.editDetails.uniqueId);
      localStorage.setItem("data", data.date);
      let hrs = []
      this.hours = hrs

      console.log("deleted====>", this.hours)
      console.log("deleted====>", hrs)
      let hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

      this.overhours = hours
      for (let i = 0; i < data.paidTime + 1; i++) {
        if (data.paidTime <= 0) {
          this.hours.push(hours[0])
          //this.minutes=this.minutes[0]
          console.log("this.minutes=========>", this.minutes)

        } else if (data.paidTime >= hours[i]) {

          this.hours.push(hours[i])
          // console.log("editpaidttimesssss=========>", this.hours)

        }


      }
      console.log("hours=========>", this.hours)

    }
  }

  getValue(val) {
    this.monthArr = val;
    console.log("thisssss", this.monthArr);
  }

  public getattendence() {
    console.log("this.month", this.month)
    console.log("this.year", this.year)
    this.spinner.show();
    let date = new Date().getDate()
    var body =
    {
      "employeeId": this.userObj.employeeId,
      "startDate": new Date(this.year + '-' + this.month + '-' + date).toJSON(),
      "status": this.dataForms.value.status,

    }

    this.apiService.postMethod("/attendance/employee/daywisereport?pageno=no", body).subscribe(data => {

      this.attendenceDetails = data.response.data.attendance;
      this.dataForms.controls['monthArr'].setValue(this.attendenceDetails.days)
      // this.attendaysDetails = data.response.data.attendance.days;
      // sessionStorage.setItem('attendaywisereport', JSON.stringify(data.response.data.attendance.days))
      // this.attendaywisereport= JSON.parse(sessionStorage.getItem('attendaywisereport'))


    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  getdate() {
    this.apiService.getMethod3("/employeeattendancecalendar/currentmonth").subscribe(data => {
      this.date = data.response.data.EmployeeAttendanceCalendar
      this.dataForms?.controls['monthArr'].setValue(this.date?.startDate)

    })

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
      this.getsingleapi();
      this.gettodayactivity()


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
      this.getsingleapi()
      this.gettodayactivity()

    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  public saveedittime() {
    if (this.overhoursvalue && this.overminvalue) {
      this.overtime = this.overhoursvalue + ':' + this.overminvalue
    } else {
      this.overtime = "0:00"
    }
    if (this.hoursvalue && this.minvalue) {
      this.totalhours = this.hoursvalue + ':' + this.minvalue
    } else {
      this.totalhours = "0:00"
    }
    let body = {
      "employeeId": this.userObj.employeeId,
      "totalworkingHoursStr": this.totalhours,
      // "date":new Date(this.editDetails.uniqueId).toJSON(),
      "date": this.editDetails.date,
      "totalOverTimehoursstr": this.overtime,
      "notes": this.PaidovertimeModalForms.value.notes,
    }
    this.apiService.postMethod("/attendance/employeeedit", body).subscribe(data => {
      $("#PaidtimeModal").modal("hide");
      alert("Saved Successfully")
      console.log('Time', data);
      this.month_dd = data.response.data.EmployeeAttendanceCalendar;
      console.log("month_dd", this.month_dd);
      this.PaidovertimeModalForms.reset()
      this.hoursvalue = ""
      this.minvalue = ""
      this.overminvalue = ""
      this.overhoursvalue = ""
      this.getattendence();
      this.getmonth();
      this.spinner.hide();

    })
  }
  normalSearch() {
    this.getattendence();
  }
}
