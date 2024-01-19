import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-document-master-view',
  templateUrl: './document-master-view.component.html',
  styleUrls: ['./document-master-view.component.css']
})
export class DocumentMasterViewComponent implements OnInit {

  viewdocumentMasterforms:FormGroup
  Submitted:boolean = false;
  viewdocumentData: any;
  editId:any;
  viewId:any;
  org_dd :any;
  userObj:any;

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.getorg();
    this.viewId = sessionStorage.getItem('DocumentMasterViewId')
    console.log("kiki ID",this.editId)
    this.getSingleRecord(this.viewId)
    this.viewdocumentMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required),
    })
  }

  get fr() {
    return this.viewdocumentMasterforms.controls;
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
      this.org_dd = data.response.data.organisation
      ;
    })
  }

  getSingleRecord(id){
    this.apiService.getMethod2("/documentmaster", this.viewId).subscribe( data => {
      console.log("hello",data);
      this.viewdocumentData = data.response.data.DocumentMaster;
      this.viewdocumentMasterforms.controls['orgdrop'].setValue(this.viewdocumentData .organisationId);
      this.viewdocumentMasterforms.controls['name'].setValue( this.viewdocumentData .name);
      this.viewdocumentMasterforms.controls['desp'].setValue( this.viewdocumentData .description);
    },err=> {
      console.log(err); 
  });
  }
}


