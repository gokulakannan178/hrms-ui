import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-onboardpolicyview',
  templateUrl: './onboardpolicyview.component.html',
  styleUrls: ['./onboardpolicyview.component.css']
})
export class OnboardpolicyviewComponent implements OnInit {

  onboardPolicyforms:FormGroup
  Submitted:boolean = false;
  checkmaster: any;
  selectedItemsCheckMaster=[]
  orgdropdown:IDropdownSettings = {};
  branchdropdown:IDropdownSettings = {};
  deptdropdown:IDropdownSettings = {};
  policyData: any;
  editId: string;
  viewId:any
  arrayData = []
  org_dd:any

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.getCheckMasterList();
    this.viewId = sessionStorage.getItem('onboardPolicyViewId')
    this.getSingleOnboardPolicy(this.viewId);
   this.getorganisation();
    this.onboardPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      onboardpolicycheck:new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),

    })
    this.orgdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    //this.getSingleOnboardPolicy()
  }

  get fr() {
    return this.onboardPolicyforms.controls;
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
  getCheckMasterList(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/onboardingchecklistmaster/filter?pageno=no" ,body).subscribe( data => {
      this.checkmaster = data.response.data.OnboardingCheckListMaster;
    })
  }

  getSingleOnboardPolicy(Id){
    this.apiService.getMethod2('/onboardingpolicy', Id).subscribe(data =>{
      this.policyData = data.response.data.OnboardingPolicy

      this.onboardPolicyforms.controls['name'].setValue( this.policyData.name);
      this.onboardPolicyforms.controls['desp'].setValue( this.policyData.description);
      this.onboardPolicyforms.controls['onboardpolicycheck'].setValue(this.policyData.ref.onboardingchecklist);
      // this.onboardPolicyforms.controls['organisation'].setValue(this.policyData.organisationId);

    },err=> {
      console.log(err); 
  });
  }

  onSelectAll(event){}
 onItemSelect(event){}

}
