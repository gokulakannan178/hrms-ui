import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-offboardpolicyadd',
  templateUrl: './offboardpolicyadd.component.html',
  styleUrls: ['./offboardpolicyadd.component.css']
})
export class OffboardpolicyaddComponent implements OnInit {

  offboardPolicyforms:FormGroup
  Submitted:boolean = false;
  organisation:any;
  org_dd:any;
  checkmaster:any;
  selectedItemsCheckMaster=[];
  selectedItemsCheckMasterId=[];
  orgdropdown:IDropdownSettings = {};
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorganisation();
    //this.getCheckMasterList() ;
    this.offboardPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      onboardpolicycheck : new FormControl()
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
  getCheckMasterList(id){
    let body ={
      "status":["Active"],
      "organisationId":[id],
    }
    this.apiService.postMethod("/offboardingchecklistmaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.checkmaster = data.response.data.OffboardingCheckListMaster;
    })
  }
  get fr() {
    return this.offboardPolicyforms.controls;
  }

  saveOffboardPolicy(){
    if(this.offboardPolicyforms.invalid){
     this.Submitted =  true;
    return
   }
   this.Submitted = false;
   var body={
     "name":this.offboardPolicyforms.value.name,
     "organisationId":this.offboardPolicyforms.value.organisation,
     "description":this.offboardPolicyforms.value.desp,
     "offboardchecklistmasterId":this.selectedItemsCheckMasterId ,
   }
   console.log( body);
   
   this.apiService.postMethod('/offboardingpolicy',body).subscribe( data => {
     console.log(data);
       alert("Added Successfully")  
       this.router.navigate(['/policy/offboardpolicy'])
   },err=> {
     console.log(err);
   }); 
 }


onSelectAll(event){
  console.log(event);
}
onItemSelect(event){
  // console.log(event);
  console.log(this.offboardPolicyforms.value.onboardpolicycheck);
  let a = this.offboardPolicyforms.value.onboardpolicycheck
  console.log(a);
  
  this.selectedItemsCheckMasterId =[]
for(let i=0;i< a.length;i++){
this.selectedItemsCheckMasterId.push(a[i].uniqueId)
}

console.log(  this.selectedItemsCheckMasterId);

}
}
