import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-offboardcheckmasteredit',
  templateUrl: './offboardcheckmasteredit.component.html',
  styleUrls: ['./offboardcheckmasteredit.component.css']
})
export class OffboardcheckmastereditComponent implements OnInit {
  offboardPolicyforms:FormGroup
  Submitted:boolean = false;
  editId: any;
  policyData: any;
  organisation:any;
  org_dd:any;
  checkmaster:any;
  userObj:any;

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.editId = sessionStorage.getItem('offboardPolicyMasterEditId')
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
   }
   this.apiService.putMethod2('/offboardingchecklistmaster',body).subscribe( data => {
     console.log(data);
       alert("Update Successfully")  
       this.router.navigate(['/policy/offboardcheckmaster'])
   },err=> {
     console.log(err);
   }); 
 }
 onSelectAll(event){}
 

}
