import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-addleavepolicy',
  templateUrl: './addleavepolicy.component.html',
  styleUrls: ['./addleavepolicy.component.css']
})
export class AddleavepolicyComponent implements OnInit {

  leavePolicyforms:FormGroup
  Submitted:boolean;
  leaveMasterData: any;
  orgdrop:any;
  org_dd:any;
  checkmaster:any;
  selectedItemsCheckMaster=[];
  orgdropdown:IDropdownSettings = {};
  userObj:any;
  organisation:any;
  selectorg:any;
  leavetype_properties:any=[];
  leavetype:any={};
  selectedPropertiesObj : any={};
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    // this.getleaveMaster()
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.leavePolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      //  leaveMaster:new FormControl("", Validators.required),
       orgdrop:new FormControl("", Validators.required),
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
    return this.leavePolicyforms.controls;
  }
  getValue(val) {
   
    console.log("thisssss",val);

    let body ={
      "status":["Active"],
      "organisationId":[val.uniqueId]

    }
    console.log(this.leavetype_properties);
    
    this.apiService.postMethod("/leavemaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('Leavetype_getvalueDD',data);
       this.leavetype_properties = data.response.data.LeaveMaster;
      console.log('Leavetype_getvalueDD',this.leavetype_properties);

    })
  }
  // getleaveMaster(id){
  //   let body ={
  //     "status":["Active"],
  //     "organisationId":[id],
  //   }
  //   this.apiService.postMethod("/leavemaster/filter?pageno=no" ,body).subscribe( data => {
  //     console.log('States',data);
  //     this.checkmaster = data.response.data.LeaveMaster;
  //   })
  // }
  

  
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

  leavetypeval(event){
    this.selectedPropertiesObj={}


console.log(event.target.value)
console.log(this.org_dd[event.target.value])
this.getValue(this.org_dd[event.target.value])
this.selectorg=this.org_dd[event.target.value]

  }
  getLeavePropertyValues(key,event){
    console.log(key,event.target.value);
    this.selectedPropertiesObj[key]=event.target.value
    console.log(this.selectedPropertiesObj);
    
   }
  
  saveleavepolicy(){
    this.Submitted = true;
     if(this.leavePolicyforms.invalid){
     alert("Fill all the Fields")
    console.log("Form Data ", this.leavePolicyforms.controls)
    return
  }
  // this.selectedItemsCheckMaster = this.selectedItemsCheckMaster.map(s=> s.uniqueId);

    var body={
      "name":this.leavePolicyforms.value.name,
      "organisationId":this.selectorg.uniqueId,
      "description":this.leavePolicyforms.value.desp, 
      //"leavemasterId":this.selectedItemsCheckMaster,

    }
    let sendingProp = []
    console.log("this.selectedPropertiesObj",this.selectedPropertiesObj );
    
      for (const [key, value] of Object.entries(this.selectedPropertiesObj)) {
        console.log(`${key}: ${value}`);
        sendingProp.push(
          
          {
            "uniqueId":key,
            "value":parseFloat(""+value),
          }
        )
      }
      body["leavemaster"]=sendingProp
    this.apiService.postMethod('/leavepolicy',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/leavepolicy'])
    },err=> {
      console.log(err);
    }); 
  }

  
 
}
