import { Component, OnInit,NgModule } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'


@Component({
  selector: 'app-addnoticepolicy',
  templateUrl: './addnoticepolicy.component.html',
  styleUrls: ['./addnoticepolicy.component.css']
})
export class AddnoticepolicyComponent implements OnInit {

  noticePolicyforms:FormGroup
  Submitted:boolean;
  org_dd: any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorg()
    this.noticePolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      noofdays:new FormControl("", Validators.required),
    })
  }

  get fr() {
    return this.noticePolicyforms.controls;
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
    })
  }

  savenoticepolicy(){
    this.Submitted = true;
     if(this.noticePolicyforms.invalid){
     alert("Fill all the Fields")
    console.log("Form Data ", this.noticePolicyforms.controls)
    return
  }
    var body={
      "name":this.noticePolicyforms.value.name,
      "organisationId":this.noticePolicyforms.value.orgdrop,
      "description":this.noticePolicyforms.value.desp,
      "noticedays":this.noticePolicyforms.value.noofdays,

    }
    this.apiService.postMethod('/noticepolicy',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/noticepolicy'])
    },err=> {
      console.log(err);
    }); 
  }

}
