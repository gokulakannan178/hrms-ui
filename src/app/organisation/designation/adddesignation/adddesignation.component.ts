import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-adddesignation',
  templateUrl: './adddesignation.component.html',
  styleUrls: ['./adddesignation.component.css']
})
export class AdddesignationComponent implements OnInit {

  desginationForms:FormGroup
  org_dd:any
  Submitted: boolean;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorg();
   
    this.desginationForms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop: new FormControl("", Validators.required),
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
    return this.desginationForms.controls;
  }
  
  saveimp(){
    if(this.desginationForms.invalid){
      alert("Fill all the Fields")
      console.log("working");
      console.log("Form Data ", this.desginationForms.controls)
      return
    }
    this.Submitted = true;
    var body={
      "name":this.desginationForms.value.name,
      "organisationId":this.desginationForms.value.orgdrop,
      "description":this.desginationForms.value.desp,

    }
    this.apiService.postMethod('/designation',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/organisation/designation'])
    },err=> {
      console.log(err);
    }); 
  }

}
