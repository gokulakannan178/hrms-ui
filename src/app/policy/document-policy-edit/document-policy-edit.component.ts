import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-document-policy-edit',
  templateUrl: './document-policy-edit.component.html',
  styleUrls: ['./document-policy-edit.component.css']
})
export class DocumentPolicyEditComponent implements OnInit {

  
  documentPolicyforms:FormGroup
  Submitted:boolean = false;
  checkmaster: any;
  selectedItemsCheckMaster=[]
  orgdropdown:IDropdownSettings = {};
  branchdropdown:IDropdownSettings = {};
  deptdropdown:IDropdownSettings = {};
  policyData: any;
  editId: string;
  organisation:any;
  org_dd:any;
  arrayData = []
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.getCheckMasterList()
    this.getorganisation()
    this.editId = sessionStorage.getItem('documentPolicyEditId')
  
    this.documentPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      documentpolicycheck:new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),

    })
    this.orgdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
this.getorganisation();
    this.getSingleDocumentPolicy();
  }
  getValue1(val) {
    this.organisation = val;
    console.log("thisssss",this.organisation);
  }
  getorganisation(){
    let body ={
      "status":["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('organisation filter',data);
      this.org_dd = data.response.data.organisation;
    })
  }

  get fr() {
    return this.documentPolicyforms.controls;
  }

  getCheckMasterList(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/documentmaster/filter?pageno=no" ,body).subscribe( data => {
      this.checkmaster = data.response.data.DocumentMaster;
    })
  }

  getSingleDocumentPolicy(){
    this.apiService.getMethod2('/documentpolicy', this.editId).subscribe(data =>{
      this.policyData = data.response.data.DocumentPolicy;

      this.documentPolicyforms.controls['name'].setValue( this.policyData.name);
      this.documentPolicyforms.controls['desp'].setValue( this.policyData.description);
      // this.documentPolicyforms.controls['documentpolicycheck'].setValue(this.policyData.ref.documentingchecklist);
      this.documentPolicyforms.controls['organisation'].setValue(this.policyData.organisationId);
      this.selectedItemsCheckMaster = this.policyData.ref.documentMaster

    },err=> {
      console.log(err); 
  });
  }

  updateDocumentPolicy(){
    if(this.documentPolicyforms.invalid){
     this.Submitted =  true
    return
   }
   this.Submitted = false;
   console.log("b4",this.selectedItemsCheckMaster);
   
   this.selectedItemsCheckMaster = this.selectedItemsCheckMaster.map(s=> s.uniqueId);
   console.log("aftr",this.selectedItemsCheckMaster);

   var body={
     "uniqueId":this.editId,
     "name":this.documentPolicyforms.value.name,
     "description":this.documentPolicyforms.value.desp,
     "documentmasterId": this.selectedItemsCheckMaster,
     "organisationId":this.documentPolicyforms.value.organisation,
   }
   this.apiService.putMethod2('/documentpolicy',body).subscribe( data => {
     console.log(data);
       alert("Updated Successfully")  
       this.router.navigate(['/policy/documentpolicy'])
   },err=> {
     console.log(err);
   }); 
 }

 onSelectAll($event){}
 onItemSelect($event){
  console.log("selected",this.selectedItemsCheckMaster);
  
 }

}

