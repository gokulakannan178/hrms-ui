import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-editleavemaster',
  templateUrl: './editleavemaster.component.html',
  styleUrls: ['./editleavemaster.component.css']
})
export class EditleavemasterComponent implements OnInit {

 
  leavemasterforms:FormGroup
  Submitted:boolean;
  org_dd: any;
  leavemasterid: string;
  leavemasterData: any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
      this.leavemasterid=sessionStorage.getItem("leavemasterEditId"),
    this.getorg()
    this.getSingleleavemaster(this.leavemasterid)
    this.leavemasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      // desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      leavetydrop:new FormControl("", Validators.required),
    })
  }

  get fr() {
    return this.leavemasterforms.controls;
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
      this.leavemasterforms.controls.orgdrop.setValue(this.leavemasterData.organisationId);

    })
  }

  getSingleleavemaster(id){
    this.apiService.getMethod2("/leavemaster", id).subscribe( data => {
      console.log("hello",data);
      this.leavemasterData = data.response.data.LeaveMaster;
      
      this.leavemasterforms.controls['name'].setValue( this.leavemasterData.name);
     this.leavemasterforms.controls['orgdrop'].setValue(this.leavemasterData.organisationId);
      this.leavemasterforms.controls['leavetydrop'].setValue( this.leavemasterData.leaveType);
     // this.leavemasterforms.controls['noofdays'].setValue( this.leavemasterData.noticeDays);
     console.log("SSSsss",this.leavemasterData.organisationId)

    },err=> {
      console.log(err); 
  });
  }

  updateleavemaster(){
    this.Submitted = true;
     if(this.leavemasterforms.invalid){
     alert("Fill all the Fields")
    console.log("Form Data ", this.leavemasterforms.controls)
    return
  }
  console.log("dddd",this.leavemasterforms.value.orgdrop)
    var body={
      "uniqueId": this.leavemasterid,
      "name":this.leavemasterforms.value.name,
      "organisationId":this.leavemasterforms.value.orgdrop,
      "leaveType":this.leavemasterforms.value.leavetydrop,
      //"noticedays":this.leavemasterforms.value.noofdays,

    }
     this.apiService.putMethod2('/leavemaster',body).subscribe( data => {
       console.log(data);
         alert("Updated Successfully")  
         this.router.navigate(['/policy/leavemaster'])
     },err=> {
      console.log(err);
    }); 
  }

}
