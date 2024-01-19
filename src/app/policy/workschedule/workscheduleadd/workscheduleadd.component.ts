import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-workscheduleadd',
  templateUrl: './workscheduleadd.component.html',
  styleUrls: ['./workscheduleadd.component.css']
})
export class WorkscheduleaddComponent implements OnInit {

  workScheduleforms:FormGroup
  Submitted:boolean = false;
  organisationData: any;
  working_days:any;
  userObj:any;
  monday:any;
  tuesday:any;
  wednesday:any;
  thursday:any;
  friday:any;
  saturday:any;
  sunday:any;

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.getorganisation()
    this.workScheduleforms = new FormGroup({
      name: new FormControl("", Validators.required),
      // schedule: new FormControl("", Validators.required),
      // scheduleType: new FormControl("", Validators.required),
      organisationId: new FormControl("", Validators.required),
      workingHoursInDays : new FormControl("", Validators.required),
      paid:new FormControl("",Validators.required),
      partial_pay:new FormControl("",Validators.required),
      loss_of_pay:new FormControl("",Validators.required),
      workingHoursInWeek : new FormControl("")
  })
}

  get fr() {
    return this.workScheduleforms.controls;
  }

  getorganisation(){
    
    let body ={
      "status":["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.organisationData = data.response.data.organisation;
    })
  }
workingdays(event,type){ 
  console.log("event",event);
  console.log("checked",event.target.checked);
  if (type == "monday"){
  this.monday=event.target.checked
  }
  else if (type == "tuesday"){
    this.tuesday=event.target.checked
  }
  else if (type == "wednesday"){
    this.wednesday=event.target.checked

  }
  else if (type == "thursday"){
    this.thursday=event.target.checked

  }
  else if (type == "friday"){
    this.friday=event.target.checked

  }
  else if (type == "saturday"){
    this.saturday=event.target.checked

  }
  else if (type == "sunday"){
    this.sunday=event.target.checked

  }

  else{
    return false;
  }

  // var sund=event.target.checked;
}
  workScheduleAdd(){
    if(this.workScheduleforms.invalid){
      this.Submitted = true
     return
   }
   this.Submitted=false;
   var body={
     "name":this.workScheduleforms.value.name,
    //  "schedule":this.workScheduleforms.value.schedule,
    //  "scheduleType":this.workScheduleforms.value.scheduleType,
     "organisationId":this.workScheduleforms.value.organisationId,
     "workingHoursinDay":this.workScheduleforms.value.workingHoursInDays,
     "fullPay":parseFloat(this.workScheduleforms.value.paid)  ,
     "partialPay":parseFloat(this.workScheduleforms.value.partial_pay),
     "lossOfPay":parseFloat(this.workScheduleforms.value. loss_of_pay),
     "monday": this.monday,
     "tuesday": this.tuesday,
     "wednesday": this.wednesday,
     "thursday": this.thursday,
     "friday": this.friday,
     "saturday": this.saturday,
     "sunday":  this.sunday,
   }
   console.log("bodyy",body);
   this.apiService.postMethod('/workSchedule',body).subscribe( data => {
     console.log(data);
       alert("Added Successfully")  
       this.router.navigate(['/policy/workschedule'])
   },err=> {
     console.log(err);
   }); 
 }

  

}
