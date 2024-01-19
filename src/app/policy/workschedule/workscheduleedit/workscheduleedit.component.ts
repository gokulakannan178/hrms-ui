import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({ 
  selector: 'app-workscheduleedit',
  templateUrl: './workscheduleedit.component.html',
  styleUrls: ['./workscheduleedit.component.css']
})
export class WorkscheduleeditComponent implements OnInit {
  workScheduleforms:FormGroup
  Submitted:boolean = false;
  organisationData: any;
  //editId: string;
  workScheduleData: any;
  editId:any;
  org_dd:any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.editId = sessionStorage.getItem('workScheduleEditId')
    this.getSingleRecord(this.editId)
    this.getorganisation()
    
    this.workScheduleforms = new FormGroup({
      name: new FormControl("", Validators.required),
      // schedule: new FormControl("", Validators.required),
      // scheduleType: new FormControl("", Validators.required),
      organisationId: new FormControl("", Validators.required),
      paid:new FormControl("",Validators.required),
      partial_pay:new FormControl("",Validators.required),
      loss_of_pay:new FormControl("",Validators.required),
     workingHoursInDays : new FormControl("", Validators.required),
      workingHoursInWeek : new FormControl("", Validators.required)
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
      this.org_dd = data.response.data.organisation;
    })
  }

  getSingleRecord(Id){
    this.apiService.getMethod2("/workSchedule", Id).subscribe( data => {

      this.workScheduleData = data.response.data.workSchedule;
      console.log(this.workScheduleData.ref.organisationId.name)
      this.workScheduleforms.controls['name'].setValue(this.workScheduleData.name);
      // this.workScheduleforms.controls['schedule'].setValue(this.workScheduleData.schedule);
      // this.workScheduleforms.controls['scheduleType'].setValue(this.workScheduleData.scheduleType);
      this.workScheduleforms.controls['organisationId'].setValue(this.workScheduleData.organisationId);
      this.workScheduleforms.controls['paid'].setValue(this.workScheduleData.fullPay);
      this.workScheduleforms.controls['partial_pay'].setValue(this.workScheduleData.partialPay);
      this.workScheduleforms.controls['loss_of_pay'].setValue(this.workScheduleData.lossOfPay);
      this.workScheduleforms.controls['workingHoursInDays'].setValue(this.workScheduleData.workingHoursinDay);
      this.workScheduleforms.controls['workingHoursInWeek'].setValue(this.workScheduleData.workingHoursinWeek);
    },err=> {
      console.log(err); 
  });
  }

  workScheduleUpdate(){
    if(this.workScheduleforms.invalid){
      this.Submitted = true
     return
   }
   this.Submitted=false;
   var body={
     "uniqueId":this.editId,
     "name":this.workScheduleforms.value.name,
    //  "schedule":this.workScheduleforms.value.schedule,
    //  "scheduleType":this.workScheduleforms.value.scheduleType,
     "organisationId":this.workScheduleforms.value.organisationId,
     "fullPay":parseFloat(this.workScheduleforms.value.paid)  ,
     "partialPay":parseFloat(this.workScheduleforms.value.partial_pay),
     "lossOfPay":parseFloat(this.workScheduleforms.value. loss_of_pay),
     "workingHoursinDay":this.workScheduleforms.value.workingHoursInDays,
     "workingHoursinWeek":this.workScheduleforms.value.workingHoursInWeek,

   }
   this.apiService.putMethod2('/workSchedule',body).subscribe( data => {
     console.log(data);
       alert("Added Successfully")  
       this.router.navigate(['/policy/workschedule'])
   },err=> {
     console.log(err);
   }); 
 }

}
