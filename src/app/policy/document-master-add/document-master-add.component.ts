import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-document-master-add',
  templateUrl: './document-master-add.component.html',
  styleUrls: ['./document-master-add.component.css']
})
export class DocumentMasterAddComponent implements OnInit {

  documentMasterforms:FormGroup
  Submitted:boolean = false;
  org_dd:any
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this. getorg();
    this.documentMasterforms = new FormGroup({
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
    return this.documentMasterforms.controls;
  }

  documentMasteradd(){
     if(this.documentMasterforms.invalid){
       this.Submitted = true
       alert("Fill all the Fields")
      return
    }
    this.Submitted=false;
    var body={
      "name":this.documentMasterforms.value.name,
      "description":this.documentMasterforms.value.desp,
      "organisationId":this.documentMasterforms.value.orgdrop,

    }
    this.apiService.postMethod('/documentmaster',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/documentmasterpolicy'])
    },err=> {
      console.log(err);
    }); 
  }

}
