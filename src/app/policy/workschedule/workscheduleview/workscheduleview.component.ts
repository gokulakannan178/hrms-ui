import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-workscheduleview',
  templateUrl: './workscheduleview.component.html',
  styleUrls: ['./workscheduleview.component.css']
})
export class WorkscheduleviewComponent implements OnInit {

  workScheduleforms:FormGroup
  Submitted:boolean = false;
  organisationData: any;
  viewId: string;
  workScheduleData: any

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.viewId = sessionStorage.getItem('workScheduleViewId')
    this.getSingleRecord()
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

  getSingleRecord(){
    this.apiService.getMethod2("/workSchedule", this.viewId).subscribe( data => {

      this.workScheduleData = data.response.data.workSchedule;
      
      this.workScheduleforms.controls['name'].setValue(this.workScheduleData.name);
      // this.workScheduleforms.controls['schedule'].setValue(this.workScheduleData.schedule);
      // this.workScheduleforms.controls['scheduleType'].setValue(this.workScheduleData.scheduleType);
      this.workScheduleforms.controls['organisationId'].setValue(this.workScheduleData.ref.organisationId.name);
      this.workScheduleforms.controls['paid'].setValue(this.workScheduleData.fullPay);
      this.workScheduleforms.controls['partial_pay'].setValue(this.workScheduleData.partialPay);
      this.workScheduleforms.controls['loss_of_pay'].setValue(this.workScheduleData.lossOfPay);
      this.workScheduleforms.controls['workingHoursInDays'].setValue(this.workScheduleData.workingHoursinDay);
      this.workScheduleforms.controls['workingHoursInWeek'].setValue(this.workScheduleData.workingHoursinWeek);
    },err=> {
      console.log(err); 
  });
  }

}
