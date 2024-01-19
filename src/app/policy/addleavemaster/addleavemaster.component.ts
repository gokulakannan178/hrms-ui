import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-addleavemaster',
  templateUrl: './addleavemaster.component.html',
  styleUrls: ['./addleavemaster.component.css']
})
export class AddleavemasterComponent implements OnInit {

 
  leavemasterforms:FormGroup
  Submitted:boolean;
  leaveMasterData: any;
  orgdrop:any;
  org_dd:any;
  checkmaster:any;
  selectedItemsCheckMaster=[];
  orgdropdown:IDropdownSettings = {};
  userObj:any;
  organisation:any;
  constructor(public router:Router,public apiService:ApiService) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getleaveMaster()
    this.leavemasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
     // desp: new FormControl("", Validators.required),
      // leaveMaster:new FormControl("", Validators.required),
       orgdrop:new FormControl("", Validators.required),
       leavedrop:new FormControl("",Validators.required)
    })
    this.getorg();
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

   get fr() {
    return this.leavemasterforms.controls;
  }

  saveleavemaster(){
    if(this.leavemasterforms.invalid){
      alert("Fill all the Fields")

      return
    }
    
     let body={
      
    "name":this.leavemasterforms.value.name ,
    "leaveType":this.leavemasterforms.value.leavedrop,
    "organisationId":this.leavemasterforms.value.orgdrop,
     }
     this.apiService.postMethod("/leavemaster" ,body).subscribe( data => {
      console.log('States',data);
      
      this.router.navigate(["/policy/leavemaster"])
      
      // this.checkmaster = data.response.data.LeaveMaster;
  })
}

  getleaveMaster(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/leavemaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.checkmaster = data.response.data.LeaveMaster;
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
      console.log('Org',data);
      this.org_dd = data.response.data.organisation;
    })
  }

  saveleavepolicy(){
    this.Submitted = true;
     if(this.leavemasterforms.invalid){
     alert("Fill all the Fields")
    console.log("Form Data ", this.leavemasterforms.controls)
    return
  }
  this.selectedItemsCheckMaster = this.selectedItemsCheckMaster.map(s=> s.uniqueId);

    var body={
      "name":this.leavemasterforms.value.name,
      "organisationId":this.leavemasterforms.value.orgdrop,
      "leaveType":this.leavemasterforms.value.leavedrop, 
      "leavemasterId":this.selectedItemsCheckMaster,

    }
    this.apiService.postMethod('/leavepolicy',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(["/policy/leavepolicy"])
    },err=> {
      console.log(err);
    }); 
  }

  onSelectAll($event){}
  onItemSelect($event){}
 
}

