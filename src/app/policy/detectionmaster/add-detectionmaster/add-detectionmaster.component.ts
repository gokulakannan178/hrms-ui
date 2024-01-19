import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'


@Component({
  selector: 'app-add-detectionmaster',
  templateUrl: './add-detectionmaster.component.html',
  styleUrls: ['./add-detectionmaster.component.css']
})
export class AddDetectionmasterComponent implements OnInit {

  detectionMasterforms:FormGroup
  Submitted:boolean = false;
  org_dd:any;
  orgdrop:any;
  userObj:any;
  
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this. detectionMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required)

    })
    this.getorg();
    
  }

  get fr() {
    return this. detectionMasterforms.controls;
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

  detectionMasterPolicy(){
     if(this. detectionMasterforms.invalid){
       this.Submitted = true
      return
    }
    this.Submitted=false;
    var body={
      "title":this. detectionMasterforms.value.name,
      "description":this. detectionMasterforms.value.desp,
      "organisationId":this. detectionMasterforms.value.orgdrop,

    }
    this.apiService.postMethod('/employeedeductionmaster',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/detectionmaster'])
    },err=> {
      console.log(err);
    }); 
  }

}