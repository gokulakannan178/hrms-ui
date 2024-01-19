import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-viewdesignation',
  templateUrl: './viewdesignation.component.html',
  styleUrls: ['./viewdesignation.component.css']
})
export class ViewdesignationComponent implements OnInit {

  notifyforms:FormGroup
  org_dd:any
  desigid:any
  getapplication:any
  Submitted:boolean;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.getorg();
    this.desigid=sessionStorage.getItem("desigid"),

    this.notifyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop: new FormControl("", Validators.required),
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
    this.apiService.getMethod2("/designation", this.desigid).subscribe( data => {
      console.log("hello",data);
      this.getapplication = data.response.data.Designation;
      
      this.notifyforms.controls['name'].setValue( this.getapplication.name);
      this.notifyforms.controls['orgdrop'].setValue( this.getapplication.organisationId);
      this.notifyforms.controls['desp'].setValue( this.getapplication.description);

    },err=> {
      console.log(err); 
  });
}

}
