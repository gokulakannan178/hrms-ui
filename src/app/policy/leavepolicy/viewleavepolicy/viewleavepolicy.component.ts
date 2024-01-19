import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-viewleavepolicy',
  templateUrl: './viewleavepolicy.component.html',
  styleUrls: ['./viewleavepolicy.component.css']
})
export class ViewleavepolicyComponent implements OnInit {

  leavePolicyforms:FormGroup
  Submitted:boolean;
  leaveMasterData: any;
  leavePolicyData: any;
  leavePolicyId: any;
  orgdrop:any;
  org_dd:any=[];
  checkmaster:any;
  selectedItemsCheckMaster=[];
  orgdropdown:IDropdownSettings = {};
  organisation:any;
  userObj:any;
  selectorg:any
  leavekey:any

  leavetype_properties:any=[];
  leavetype:any={};
  selectedPropertiesObj : any={};
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorg();
     this.leavePolicyId = sessionStorage.getItem('leavePolicyEditId')
    this.getleaveMaster()
    this.getSingleLeavePolicy(this.leavePolicyId)
    this.leavePolicyforms = new FormGroup({ 
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      // leaveMaster:new FormControl("",(Validators.required)),
      orgdrop:new FormControl("", Validators.required),    })     
  }
  

  get fr() {
    return this.leavePolicyforms.controls;
  }

  getleaveMaster(){
    let body ={
      "status":["Active"],
      
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
      for(let i=0;i<=this.org_dd.length;i++){
        if(this.leavePolicyData.organisationId == this.org_dd[i].uniqueId){
          this.leavePolicyforms.controls['orgdrop'].setValue(i);
          break;

        }
      }
    })
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


 
  getSingleLeavePolicy(id){
    this.apiService.getMethod2("/leavepolicy", id).subscribe( data => {
      console.log("hello",data);
      this.leavePolicyData = data.response.data.LeavePolicy;
      // this.leavekey=data.response.data.LeavePolicy.ref.leavemasters.
      
      this.leavePolicyforms.controls['name'].setValue( this.leavePolicyData.name); 
      this.leavePolicyforms.controls['desp'].setValue( this.leavePolicyData.description);
      console.log(this.org_dd);
      console.log("selectorg====>",this.leavePolicyData.ref.organisationId)
      // this.getorg();
      // this.selectedItemsCheckMaster = this.leavePolicyData.ref.leavemaster;
      this.leavetype_properties = this.leavePolicyData.ref.leavemasters
      for(let i=0;i<this.leavetype_properties.length;i++){
       this.selectedPropertiesObj[this.leavetype_properties[i].uniqueId]=this.leavetype_properties[i].value
      }
      
    },err=> {
      console.log(err); 
  });
  }

  leavetypeval(event){
    this.selectedPropertiesObj={}
console.log(event.target.value)
console.log(this.org_dd[event.target.value])
this.selectorg=this.org_dd[event.target.value]


  }
  getLeavePropertyValues(key,event){
    console.log(key,event.target.value);
    this.selectedPropertiesObj[key]=event.target.value
    console.log(this.selectedPropertiesObj);
    
   }
  
}
