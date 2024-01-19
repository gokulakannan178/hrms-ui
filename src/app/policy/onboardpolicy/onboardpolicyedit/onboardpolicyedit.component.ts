import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-onboardpolicyedit',
  templateUrl: './onboardpolicyedit.component.html',
  styleUrls: ['./onboardpolicyedit.component.css']
})
export class OnboardpolicyeditComponent implements OnInit {

  onboardPolicyforms:FormGroup
  Submitted:boolean = false;
  checkmaster: any;
  selectedItemsCheckMaster=[]
  orgdropdown:IDropdownSettings = {};
  branchdropdown:IDropdownSettings = {};
  deptdropdown:IDropdownSettings = {};
  policyData: any;
  editId: string;
  organisation:any;
  org_dd:any;
  arrayData = []
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getCheckMasterList()
    this.editId = sessionStorage.getItem('onboardPolicyEditId')
    
   
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
this.getorganisation();
    this.getSingleOnboardPolicy();
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

  getCheckMasterList(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/onboardingchecklistmaster/filter?pageno=no" ,body).subscribe( data => {
      this.checkmaster = data.response.data.OnboardingCheckListMaster;
    })
  }

  getSingleOnboardPolicy(){
    this.apiService.getMethod2('/onboardingpolicy', this.editId).subscribe(data =>{
      this.policyData = data.response.data.OnboardingPolicy;

      this.onboardPolicyforms.controls['name'].setValue( this.policyData.name);
      this.onboardPolicyforms.controls['desp'].setValue( this.policyData.description);
      // this.onboardPolicyforms.controls['onboardpolicycheck'].setValue(this.policyData.ref.onboardingchecklist);
      this.onboardPolicyforms.controls['organisation'].setValue(this.policyData.organisationId);
      this.selectedItemsCheckMaster = this.policyData.ref.onboardingchecklist

    },err=> {
      console.log(err); 
  });
  }

  updateOnboardPolicy(){
    if(this.onboardPolicyforms.invalid){
     this.Submitted =  true
    return
   }
   this.Submitted = false;
   console.log("b4",this.selectedItemsCheckMaster);
   
   this.selectedItemsCheckMaster = this.selectedItemsCheckMaster.map(s=> s.uniqueId);
   console.log("aftr",this.selectedItemsCheckMaster);

   var body={
     "uniqueId":this.editId,
     "name":this.onboardPolicyforms.value.name,
     "description":this.onboardPolicyforms.value.desp,
     "onboardchecklistmasterId": this.selectedItemsCheckMaster,
     "organisationId":this.onboardPolicyforms.value.organisation,
   }
   this.apiService.putMethod2('/onboardingpolicy',body).subscribe( data => {
     console.log(data);
       alert("Added Successfully")  
       this.router.navigate(['/policy/onboardpolicy'])
   },err=> {
     console.log(err);
   }); 
 }

 onSelectAll(event){}
 onItemSelect(event){
  console.log(this.selectedItemsCheckMaster);
  
 }

}
