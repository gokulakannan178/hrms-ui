import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-document-policy-add',
  templateUrl: './document-policy-add.component.html',
  styleUrls: ['./document-policy-add.component.css']
})
export class DocumentPolicyAddComponent implements OnInit {

  documentPolicyforms:FormGroup
  Submitted:boolean = false;
  checkmaster: any;
  selectedItemsCheckMaster=[]
  orgdropdown:IDropdownSettings = {};
  branchdropdown:IDropdownSettings = {};
  deptdropdown:IDropdownSettings = {};
  organisation:any;
  org_dd:any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
   // this.getCheckMasterList();
    this.getorganisation();
    this.documentPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      organisation:new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      documentpolicycheck:new FormControl("", Validators.required),
    })

    this.orgdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };

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

  getCheckMasterList(id){
    let body ={
      "status":["Active"],
      "organisationId":[id],
    }
    this.apiService.postMethod("/documentmaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.checkmaster = data.response.data.DocumentMaster;
    })
  }

  saveDocumentPolicy(){
     if(this.documentPolicyforms.invalid){
      this.Submitted =  true
      alert("Fill all the Fields")
     return
    }
    this.Submitted = false;
    this.selectedItemsCheckMaster = this.selectedItemsCheckMaster.map(s=> s.uniqueId);
    var body={
      "name":this.documentPolicyforms.value.name,
      "description":this.documentPolicyforms.value.desp,
      "organisationId":this.organisation,
      "documentmasterId": this.selectedItemsCheckMaster
    }
    this.apiService.postMethod('/documentpolicy',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/documentpolicy'])
    },err=> {
      console.log(err);
    }); 
  }

  onSelectAll($event){}
  onItemSelect($event){}

}

