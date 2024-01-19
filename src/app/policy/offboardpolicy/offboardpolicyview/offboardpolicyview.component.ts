import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-offboardpolicyview',
  templateUrl: './offboardpolicyview.component.html',
  styleUrls: ['./offboardpolicyview.component.css']
})
export class OffboardpolicyviewComponent implements OnInit {

  offboardPolicyforms:FormGroup
  viewId: any;
  editId:any;
  policyData: any;
  organisation:any;
  checkmaster :any;
  org_dd:any;
  orgdropdown:IDropdownSettings = {};
  selectedItemsCheckMaster=[];
  offboardingchecklistId=[];
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.viewId = sessionStorage.getItem('offboardPolicyEditId')
    this.getSingleOffBoardPolicy(this.viewId);
     this.getorganisation();
    this.getCheckMasterList();
    this.offboardPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),
      onboardpolicycheck:new FormControl({value:"",disabled:true},Validators.required),
      desp: new FormControl("", Validators.required),
    })
    this.orgdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  getValue1(val) {
    this.organisation = val;
    console.log("thisssss",this.organisation);
  }
  getCheckMasterList(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/offboardingchecklistmaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.checkmaster = data.response.data.OffboardingCheckListMaster;
    })
  }
  get fr() {
    return this.offboardPolicyforms.controls;
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

  getSingleOffBoardPolicy(Id){
    this.apiService.getMethod2('/offboardingpolicy', Id).subscribe(data =>{
      this.policyData = data.response.data.OffboardingPolicy
      this.offboardPolicyforms.controls['name'].setValue( this.policyData.name);
      this.offboardPolicyforms.controls['desp'].setValue( this.policyData.description);
      this.offboardPolicyforms.controls['organisation'].setValue( this.policyData.organisationId);
      this.offboardPolicyforms.controls['onboardpolicycheck'].setValue(this.policyData.ref.offboardingchecklistId)
    })
  }
  onSelectAll(event){}
  onItemSelect(event){}

}
