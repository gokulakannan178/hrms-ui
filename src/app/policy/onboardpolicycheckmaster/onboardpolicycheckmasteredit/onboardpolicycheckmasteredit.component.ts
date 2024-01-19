import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-onboardpolicycheckmasteredit',
  templateUrl: './onboardpolicycheckmasteredit.component.html',
  styleUrls: ['./onboardpolicycheckmasteredit.component.css']
})
export class OnboardpolicycheckmastereditComponent implements OnInit {

  checklistMasterforms:FormGroup
  Submitted:boolean = false;
  checklistData: any;
  editId:any;
  org_dd: any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

     this.editId = sessionStorage.getItem('OnBoardCheckMasterEditId')
    this.getSingleRecord(this.editId)
    this.getorg()
    this.checklistMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required)
    })
  }



  get fr() {
    return this.checklistMasterforms.controls;
  }
  getorg(){
    let body ={
      "status":["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.org_dd = data.response.data.organisation;
      // this.checklistMasterforms.controls.orgdrop.setValue(this.checklistMasterforms.organisationId);

    })
  }


  getSingleRecord(id){
    this.apiService.getMethod2("/onboardingchecklistmaster", id).subscribe( data => {
      console.log("hello",data);
      this.checklistData = data.response.data.OnboardingCheckListMaster;
      
      this.checklistMasterforms.controls['name'].setValue( this.checklistData.name);
      this.checklistMasterforms.controls['orgdrop'].setValue(this.checklistData.organisationId)
      this.checklistMasterforms.controls['desp'].setValue( this.checklistData.description);
    },err=> {
      console.log(err); 
  });
  }

  checklistMasterPolicy(){
    if(this.checklistMasterforms.invalid){
      this.Submitted = true
     return
   }
   this.Submitted=false;
   var body={
    "uniqueId":this.editId,
     "name":this.checklistMasterforms.value.name,
     "description":this.checklistMasterforms.value.desp,
     "oorganisationId":this.checklistMasterforms.value.orgdrop,

   }
   this.apiService.putMethod2('/onboardingchecklistmaster',body).subscribe( data => {
     console.log(data);
       alert("Updated Successfully")  
       this.router.navigate(['/policy/onboardpolicycheckmaster'])
   },err=> {
     console.log(err);
   }); 
 }

}
