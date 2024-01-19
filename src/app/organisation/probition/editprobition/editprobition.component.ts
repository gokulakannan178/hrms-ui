import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-editprobition',
  templateUrl: './editprobition.component.html',
  styleUrls: ['./editprobition.component.css']
})
export class EditprobitionComponent implements OnInit {

  notifyforms:FormGroup
  org_dd:any
  probid:any
  userObj:any;
  getapplication:any
  Submitted:boolean
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorg();
    this.probid=sessionStorage.getItem("probid"),
    this.notifyforms = new FormGroup({
    
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop: new FormControl("", Validators.required),
      prob_months:new FormControl("", Validators.required),
    })
    this.getsingleapi();
  }
  getorg(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.org_dd = data.response.data.organisation
      ;
    })
  }
  getsingleapi(){
     let body ={
       "status":["Active"],
       "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
     }
    this.apiService.getMethod2("/probationary", this.probid).subscribe( data => {
      console.log("hello",data);
      this.getapplication = data.response.data.Probationary;
      
      this.notifyforms.controls['name'].setValue( this.getapplication.name);
      this.notifyforms.controls['orgdrop'].setValue( this.getapplication.organisationId);
      this.notifyforms.controls['desp'].setValue( this.getapplication.description);
       this.notifyforms.controls['prob_months'].setValue( this.getapplication.probationaryPeroid);

    },err=> {
      console.log(err); 
  });
}
get fr() {
  return this.notifyforms.controls;
}
updateimp(){
  this.Submitted = true;
     if(this.notifyforms.invalid){
     alert("Fill all the Fields")
    console.log("working");
    console.log("Form Data ", this.notifyforms.controls)
    return
  }
  var body={
    "name":this.notifyforms.value.name,
    "uniqueId":this.probid,
    "description":this.notifyforms.value.desp,
    "organisationId":this.notifyforms.value.orgdrop,
    "probationaryPeroid":this.notifyforms.value.prob_months,
    
   
  }
  this.apiService.putMethod2('/probationary',body).subscribe( data => {
    console.log(data);
      alert("Updated Successfully")  
      this.router.navigate(['/organisation/probition'])
  },err=> {
    console.log(err);
  }); 
}

}
