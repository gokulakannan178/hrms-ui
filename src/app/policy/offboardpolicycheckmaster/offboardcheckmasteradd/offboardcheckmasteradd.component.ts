import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-offboardcheckmasteradd',
  templateUrl: './offboardcheckmasteradd.component.html',
  styleUrls: ['./offboardcheckmasteradd.component.css']
})
export class OffboardcheckmasteraddComponent implements OnInit {

  offboardPolicyforms:FormGroup
  Submitted:boolean = false;
  organisation:any;
  org_dd:any;
  checkmaster:any;
  userObj:any;

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorganisation();
    
    this.offboardPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
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

  saveOffboardPolicyMaster(){
    if(this.offboardPolicyforms.invalid){
     this.Submitted =  true;
    return
   }
   this.Submitted = false;
   var body={
     "name":this.offboardPolicyforms.value.name,
     "organisationId":this.offboardPolicyforms.value.organisation,
     "description":this.offboardPolicyforms.value.desp,
   }
   console.log( body);
   
   this.apiService.postMethod('/offboardingchecklistmaster',body).subscribe( data => {
     console.log(data);
       alert("Added Successfully")  
       this.router.navigate(['/policy/offboardcheckmaster'])
   },err=> {
     console.log(err);
   }); 
 }


onSelectAll(event){
  console.log(event);
}

}
