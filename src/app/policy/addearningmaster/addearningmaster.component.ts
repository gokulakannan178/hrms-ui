import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'


@Component({
  selector: 'app-addearningmaster',
  templateUrl: './addearningmaster.component.html',
  styleUrls: ['./addearningmaster.component.css']
})
export class AddearningmasterComponent implements OnInit {

 
  earningMasterforms:FormGroup
  Submitted:boolean = false;
  org_dd:any;
  orgdrop:any;
  userObj:any;
  
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.earningMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required)

    })
    this.getorg();
    
  }

  get fr() {
    return this.earningMasterforms.controls;
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
     if(this.earningMasterforms.invalid){
       this.Submitted = true
      return
    }
    this.Submitted=false;
    var body={
      "title":this.earningMasterforms.value.name,
      "description":this.earningMasterforms.value.desp,
      "organisationId":this.earningMasterforms.value.orgdrop,

    }
    this.apiService.postMethod('/employeeearningmaster',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/Earningmaster'])
    },err=> {
      console.log(err);
    }); 
  }

}
