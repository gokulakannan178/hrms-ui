import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-offboardcheckmasterview',
  templateUrl: './offboardcheckmasterview.component.html',
  styleUrls: ['./offboardcheckmasterview.component.css']
})
export class OffboardcheckmasterviewComponent implements OnInit {

  offboardPolicyforms:FormGroup
  Submitted:boolean = false;
  editId: any;
  policyData: any;
  organisation:any;
  org_dd:any;
  checkmaster:any;
  

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.editId = sessionStorage.getItem('offboardPolicyMasterViewId')
    this.getSingleOffBoardPolicy(this.editId);
    this.getorganisation();
    this.offboardPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      //onboardpolicycheck : new FormControl()
    })

  }
  getValue1(val) {
    this.organisation = val;
    console.log("thisssss",this.organisation);
  }
  getorganisation(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('organisation filter',data);
      this.org_dd = data.response.data.organisation;
    })
  }
 

  get fr() {
    return this.offboardPolicyforms.controls;
  }

  getSingleOffBoardPolicy(Id){
    this.apiService.getMethod2("/offboardingchecklistmaster", Id).subscribe(data =>{
      this.policyData = data.response.data.OffboardingCheckListMaster;
      this.offboardPolicyforms.controls['name'].setValue( this.policyData.name);
      this.offboardPolicyforms.controls['desp'].setValue( this.policyData.description);
      this.offboardPolicyforms.controls['organisation'].setValue( this.policyData.organisationId);
      // this.checkmaster=this.policyData.ref.offboardingchecklistId
      //this.selectedItemsCheckMaster = this.policyData.ref.offboardingchecklistId
      // this.offboardPolicyforms.controls['onboardpolicycheck'].setValue(this.policyData.ref.offboardingchecklistId);
    })
  } 

}

