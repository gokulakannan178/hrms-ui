import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-editnoticepolicy',
  templateUrl: './editnoticepolicy.component.html',
  styleUrls: ['./editnoticepolicy.component.css']
})
export class EditnoticepolicyComponent implements OnInit {

  noticePolicyforms:FormGroup
  Submitted:boolean;
  org_dd: any;
  noticepolicyid: string;
  noticePoliceData: any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { 
    this.noticePolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      noofdays:new FormControl("", Validators.required),
    })
  }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.noticepolicyid=sessionStorage.getItem("noticePolicyEditId"),
    this.getorg()
    this.getSingleNoticePolicy(this.noticepolicyid)

  }

  get fr() {
    return this.noticePolicyforms.controls;
  }

  getorg(){
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

  updatenoticepolicy(){
    this.Submitted = true;
     if(this.noticePolicyforms.invalid){
     alert("Fill all the Fields")
    console.log("Form Data ", this.noticePolicyforms.controls)
    return
  }
    var body={
      "uniqueId": this.noticepolicyid,
      "name":this.noticePolicyforms.value.name,
      "organisationId":this.noticePolicyforms.value.orgdrop,
      "description":this.noticePolicyforms.value.desp,
      "noticedays":this.noticePolicyforms.value.noofdays,

    }
    this.apiService.putMethod2('/noticepolicy',body).subscribe( data => {
      console.log(data);
        alert("Updated Successfully")  
        this.router.navigate(['/policy/noticepolicy'])
    },err=> {
      console.log(err);
    }); 
  }

}
