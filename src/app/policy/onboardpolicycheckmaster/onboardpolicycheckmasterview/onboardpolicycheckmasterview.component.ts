import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-onboardpolicycheckmasterview',
  templateUrl: './onboardpolicycheckmasterview.component.html',
  styleUrls: ['./onboardpolicycheckmasterview.component.css']
})
export class OnboardpolicycheckmasterviewComponent implements OnInit {

  checklistMasterforms:FormGroup
  Submitted:boolean = false;
  checklistData: any;
  org_dd:any
  

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    const viewId = sessionStorage.getItem('OnBoardCheckMasterViewId')
    this.getSingleRecord(viewId)
    this.getorg()
    this.checklistMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required)
    })
  }
  getorg(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.org_dd = data.response.data.organisation;
      this.checklistMasterforms.controls.orgdrop.setValue(this.checklistData.organisationId);

    })
  }
  get fr() {
    return this.checklistMasterforms.controls;
  }

  getSingleRecord(id){
    this.apiService.getMethod2("/onboardingchecklistmaster", id).subscribe( data => {
      console.log("hello",data);
      this.checklistData = data.response.data.OnboardingCheckListMaster;
      
      this.checklistMasterforms.controls['name'].setValue( this.checklistData.name);
      this.checklistMasterforms.controls['desp'].setValue( this.checklistData.description);
      this.checklistMasterforms.controls["orgdrop"].setValue(this.checklistData.organisationId);
    },err=> {
      console.log(err); 
  });
  }

}
