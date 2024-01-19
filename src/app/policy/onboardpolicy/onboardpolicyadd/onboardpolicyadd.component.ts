import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-onboardpolicyadd',
  templateUrl: './onboardpolicyadd.component.html',
  styleUrls: ['./onboardpolicyadd.component.css']
})
export class OnboardpolicyaddComponent implements OnInit {

  onboardPolicyforms:FormGroup
  Submitted:boolean = false;
  checkmaster: any;
  selectedItemsCheckMaster=[]
  orgdropdown:IDropdownSettings = {};
  branchdropdown:IDropdownSettings = {};
  deptdropdown:IDropdownSettings = {};
  selectedItemsCheckMasterId=[];
  organisation:any;
  org_dd:any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

   // this.getCheckMasterList();
    this.getorganisation();
    this.onboardPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      onboardpolicycheck:new FormControl(),
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
  getorganisation(){
    let body ={
      "status":["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('organisation filter',data);
      this.org_dd = data.response.data.organisation;
    })
  }
  get fr() {
    return this.onboardPolicyforms.controls;
  }

  getCheckMasterList(id){
    let body ={
      "status":["Active"],
      "organisationId":[id],
    }
    this.apiService.postMethod("/onboardingchecklistmaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.checkmaster = data.response.data.OnboardingCheckListMaster;
    })
  }

  saveOnboardPolicy(){
     if(this.onboardPolicyforms.invalid){
      this.Submitted =  true
     return
    }
    this.Submitted = false;
    this.selectedItemsCheckMaster = this.selectedItemsCheckMaster.map(s=> s.uniqueId);
    var body={
      "name":this.onboardPolicyforms.value.name,
      "description":this.onboardPolicyforms.value.desp,
      "organisationId":this.onboardPolicyforms.value.organisation,
      "onboardchecklistmasterId": this.selectedItemsCheckMaster,//selectedItemsCheckMasterId
    }
    console.log("sssshhhh",body)
    this.apiService.postMethod('/onboardingpolicy',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/onboardpolicy'])
    },err=> {
      console.log(err);
    }); 
  }

  onSelectAll(event){}
  onItemSelect(event){
    console.log(this.onboardPolicyforms.value.onboardpolicycheck);
    let a = this.onboardPolicyforms.value.onboardpolicycheck
    console.log(a);
    
    this.selectedItemsCheckMasterId =[]
  for(let i=0;i< a.length;i++){
  this.selectedItemsCheckMasterId.push(a[i].uniqueId)
  }
  
  console.log(  this.selectedItemsCheckMaster);
  
  }

}
