import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-viewprobition',
  templateUrl: './viewprobition.component.html',
  styleUrls: ['./viewprobition.component.css']
})
export class ViewprobitionComponent implements OnInit {

  notifyforms:FormGroup
  org_dd:any
  probid:any
  getapplication:any
  Submitted:boolean
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
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
      this.org_dd = data.response.data.organisation;
    })
  }
  get fr() {
    return this.notifyforms.controls;
  }
  getsingleapi(){
    // let body ={
    //   "status":["Allocated"]
    // }
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

}
