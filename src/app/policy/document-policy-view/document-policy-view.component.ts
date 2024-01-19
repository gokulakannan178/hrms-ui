import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-document-policy-view',
  templateUrl: './document-policy-view.component.html',
  styleUrls: ['./document-policy-view.component.css']
})
export class DocumentPolicyViewComponent implements OnInit {
  documentPolicyforms:FormGroup
  Submitted:boolean = false;
  checkmaster: any;
  selectedItemsCheckMaster=[]
  orgdropdown:IDropdownSettings = {};
  branchdropdown:IDropdownSettings = {};
  deptdropdown:IDropdownSettings = {};
  policyData: any;
  documentPolicy: string;
  organisation:any;
  org_dd:any;
  documentPolicyID:any;
  arrayData = []
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.getCheckMasterList();
    this.getorganisation();
    this.documentPolicyID = sessionStorage.getItem('documentPolicyViewId')
    console.log("idcheck",this.documentPolicyID )
    this.getSingleDocumentPolicy(this.documentPolicyID);

   
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

  }
 
  getValue1(val) {
    this.organisation = val;
    console.log("thisssss",this.organisation);
  }
  getorganisation(){
    let body ={
      "status":["Active"]
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
   public isDropdownDisabled = false;

  someMethod() {
    this.isDropdownDisabled = true;
  }

  getSingleDocumentPolicy(id){
    this.apiService.getMethod2('/documentpolicy', id).subscribe(data =>{
      this.policyData = data.response.data.DocumentPolicy;
      this.someMethod(), 
      this.documentPolicyforms.controls['name'].setValue( this.policyData.name);
      this.documentPolicyforms.controls['desp'].setValue( this.policyData.description);
      // this.documentPolicyforms.controls['documentpolicycheck'].setValue(this.policyData.ref.documentingchecklist);
      this.documentPolicyforms.controls['organisation'].setValue(this.policyData.organisationId);
      this.documentPolicyforms.controls ['documentpolicycheck'].setValue(this.policyData.ref.documentPolicyDocumentsId)

    },err=> {
      console.log(err); 
  });
  }
 onSelectAll($event){}
 onItemSelect($event){
  console.log("selected",this.selectedItemsCheckMaster);
  
 }

}


