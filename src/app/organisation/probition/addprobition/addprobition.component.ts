import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-addprobition',
  templateUrl: './addprobition.component.html',
  styleUrls: ['./addprobition.component.css']
})
export class AddprobitionComponent implements OnInit {

  notifyforms:FormGroup
  org_dd:any
  Submitted:boolean;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorg();
    this.notifyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop: new FormControl("", Validators.required),
      prob_months:new FormControl("", Validators.required),
    })
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
  get fr() {
    return this.notifyforms.controls;
  }
  saveimp(){
    this.Submitted = true;
     if(this.notifyforms.invalid){
     alert("Fill all the Fields")
    console.log("working");
    console.log("Form Data ", this.notifyforms.controls)
    return
  }
    var body={
      "name":this.notifyforms.value.name,
      "organisationId":this.notifyforms.value.orgdrop,
      "description":this.notifyforms.value.desp,
      "probationaryPeroid":this.notifyforms.value.prob_months,

    }
    this.apiService.postMethod('/probationary',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/organisation/probition'])
    },err=> {
      console.log(err);
    }); 
  }

}
