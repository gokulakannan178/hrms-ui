import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-offboardpolicyedit',
  templateUrl: './offboardpolicyedit.component.html',
  styleUrls: ['./offboardpolicyedit.component.css']
})
export class OffboardpolicyeditComponent implements OnInit {

  offboardPolicyforms:FormGroup
  Submitted:boolean = false;
  editId: any;
  policyData: any;
  organisation:any;
  org_dd:any;
  checkmaster:any;
  orgdropdown:IDropdownSettings = {};
  selectedItemsCheckMaster=[];
  selectedItemsCheckMasterId=[];
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.editId = sessionStorage.getItem('offboardPolicyEditId')
    this.getSingleOffBoardPolicy(this.editId);
    this.getorganisation();
    this.getCheckMasterList();
    this.offboardPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),
      onboardpolicycheck:new FormControl("",Validators.required),
      desp: new FormControl("", Validators.required),
      //onboardpolicycheck : new FormControl()
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

  getSingleOffBoardPolicy(Id){
    this.apiService.getMethod2("/offboardingpolicy", Id).subscribe(data =>{
      this.policyData = data.response.data.OffboardingPolicy;
      this.offboardPolicyforms.controls['name'].setValue( this.policyData.name);
      this.offboardPolicyforms.controls['desp'].setValue( this.policyData.description);
      this.offboardPolicyforms.controls['organisation'].setValue( this.policyData.organisationId);
      this.offboardPolicyforms.controls['onboardpolicycheck'].setValue(this.policyData.ref.offboardingchecklistId);
      // this.checkmaster=this.policyData.ref.offboardingchecklistId
      //this.selectedItemsCheckMaster = this.policyData.ref.offboardingchecklistId
      // this.offboardPolicyforms.controls['onboardpolicycheck'].setValue(this.policyData.ref.offboardingchecklistId);
    })
  }

  updateOffboardPolicy(){
    console.log("hitted update")
    if(this.offboardPolicyforms.invalid){
     this.Submitted =  true
     console.log("error");
      return
   }
   this.Submitted = false;
   var body={
     "uniqueId": this.editId, 
     "name":this.offboardPolicyforms.value.name,
     "organisationId":this.offboardPolicyforms.value.organisation,
     "description":this.offboardPolicyforms.value.desp,
     "offboardchecklistmasterId":this.selectedItemsCheckMasterId ,
   }
   this.apiService.putMethod2('/offboardingpolicy',body).subscribe( data => {
     console.log(data);
       alert("Update Successfully")  
       this.router.navigate(['/policy/offboardpolicy'])
   },err=> {
     console.log(err);
   }); 
 }
 onSelectAll(event){}
 onItemSelect(event){
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
