import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-document-master-edit',
  templateUrl: './document-master-edit.component.html',
  styleUrls: ['./document-master-edit.component.css']
})
export class DocumentMasterEditComponent implements OnInit {

  EditdocumentMasterforms:FormGroup
  Submitted:boolean = false;
  EditdocumentData: any;
  editId:any;
  org_dd :any;
  userObj:any;

  constructor(public apiService:ApiService,public router:Router) { }
  
  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.getorg();
    this.editId = sessionStorage.getItem('DocumentMasterEditId')
    console.log("kiki ID",this.editId)
    this.getSingleRecord(this.editId)
    this.EditdocumentMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required),
    })
  }

  get fr() {
    return this.EditdocumentMasterforms.controls;
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
    this.apiService.getMethod2("/documentmaster", this.editId).subscribe( data => {
      console.log("hello",data);
      this.EditdocumentData = data.response.data.DocumentMaster;
      this.EditdocumentMasterforms.controls['orgdrop'].setValue(this.EditdocumentData.organisationId);
      this.EditdocumentMasterforms.controls['name'].setValue( this.EditdocumentData.name);
      this.EditdocumentMasterforms.controls['desp'].setValue( this.EditdocumentData.description);
    },err=> {
      console.log(err); 
  });
  }

  documentMasterEdit(){
    if(this.EditdocumentMasterforms.invalid){
      this.Submitted = true
     return
   }
   this.Submitted=false;
   var body={
    "uniqueId":this.editId,
     "name":this.EditdocumentMasterforms.value.name,
     "description":this.EditdocumentMasterforms.value.desp,
     "organisationId":this.EditdocumentMasterforms.value.orgdrop,
   }
   this.apiService.putMethod2('/documentmaster',body).subscribe( data => {
     console.log(data);
       alert("Updated Successfully")  
       this.router.navigate(['/policy/documentmasterpolicy'])
   },err=> {
     console.log(err);
   }); 
 }

}

