import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-viewnoticepolicy',
  templateUrl: './viewnoticepolicy.component.html',
  styleUrls: ['./viewnoticepolicy.component.css']
})
export class ViewnoticepolicyComponent implements OnInit {

  noticePolicyforms:FormGroup
  Submitted:boolean;
  org_dd: any;
  noticepolicyid: string;
  noticePoliceData: any;

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.noticepolicyid=sessionStorage.getItem("noticePolicyViewId"),
    this.getorg()
    this.getSingleNoticePolicy(this.noticepolicyid)
    this.noticePolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      noofdays:new FormControl("", Validators.required),
    })
  }

  get fr() {
    return this.noticePolicyforms.controls;
  }

  getorg(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.org_dd = data.response.data.organisation;
    })
  }

  getSingleNoticePolicy(id){
    this.apiService.getMethod2("/noticepolicy", id).subscribe( data => {
      console.log("hello",data);
      this.noticePoliceData = data.response.data.NoticePolicy;
      
      this.noticePolicyforms.controls['name'].setValue( this.noticePoliceData.name);
      this.noticePolicyforms.controls['orgdrop'].setValue( this.noticePoliceData.organisationId);
      this.noticePolicyforms.controls['desp'].setValue( this.noticePoliceData.description);
      this.noticePolicyforms.controls['noofdays'].setValue( this.noticePoliceData.noticeDays);

    },err=> {
      console.log(err); 
  });
  }

}
