import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-viewdetectionmaster',
  templateUrl: './viewdetectionmaster.component.html',
  styleUrls: ['./viewdetectionmaster.component.css']
})
export class ViewdetectionmasterComponent implements OnInit {

  deductionMasterforms:FormGroup
  Submitted:boolean = false;
  checklistData: any;
  org_dd:any
  

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    const viewId = sessionStorage.getItem('detectionmasterViewId')
    this.getSingleRecord(viewId)
    this.getorg()
    this. deductionMasterforms = new FormGroup({
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
      this. deductionMasterforms.controls.orgdrop.setValue(this.checklistData.organisationId);

    })
  }
  get fr() {
    return this. deductionMasterforms.controls;
  }

  getSingleRecord(id){
    this.apiService.getMethod2("/employeedeductionmaster", id).subscribe( data => {
      console.log("hello",data);
      this.checklistData = data.response.data.EmployeeDeductionMaster      ;
      
      this. deductionMasterforms.controls['name'].setValue( this.checklistData.title);
      this. deductionMasterforms.controls['desp'].setValue( this.checklistData.description);
      this. deductionMasterforms.controls["orgdrop"].setValue(this.checklistData.organisationId);
    },err=> {
      console.log(err); 
  });
  }

}
