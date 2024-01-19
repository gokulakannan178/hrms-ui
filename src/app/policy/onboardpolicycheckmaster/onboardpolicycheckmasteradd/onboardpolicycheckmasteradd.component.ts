import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-onboardpolicycheckmasteradd',
  templateUrl: './onboardpolicycheckmasteradd.component.html',
  styleUrls: ['./onboardpolicycheckmasteradd.component.css']
})
export class OnboardpolicycheckmasteraddComponent implements OnInit {

  checklistMasterforms:FormGroup
  Submitted:boolean = false;
  org_dd:any;
  orgdrop:any;
  userObj:any;
  
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.checklistMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required)

    })
    this.getorg();
    
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
      console.log('Org',data);
      this.org_dd = data.response.data.organisation;
    })
  }

  checklistMasterPolicy(){
     if(this.checklistMasterforms.invalid){
       this.Submitted = true
      return
    }
    this.Submitted=false;
    var body={
      "name":this.checklistMasterforms.value.name,
      "description":this.checklistMasterforms.value.desp,
      "organisationId":this.checklistMasterforms.value.orgdrop,

    }
    this.apiService.postMethod('/onboardingchecklistmaster',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/onboardpolicycheckmaster'])
    },err=> {
      console.log(err);
    }); 
  }

}
