import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-viewpayroll',
  templateUrl: './viewpayroll.component.html',
  styleUrls: ['./viewpayroll.component.css']
})
export class ViewpayrollComponent implements OnInit {

  payrollPolicyforms:FormGroup
  Submitted:boolean;
 
  payrollPolicyData: any;
  payrollPolicyId: any;
  orgdrop:any;
  org_dd:any=[];
  checkmaster:any;
  selectedItemsCheckMaster=[];
  orgdropdown:IDropdownSettings = {};
  organisation:any;
  userObj:any;
  selectorg:any
  
  payroll_list:any=[];
  payroll_deduction:any=[];
  
  selectedPropertiesObjEarning : any={};
  selectedPropertiesObjDeduction : any={};
  selectedPropertiesObject : any={};
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    
    this.getorg();
    
     this.payrollPolicyId = sessionStorage.getItem('payrollPolicyEditId')
    this.getpayrollpolicy()
    this.getSinglepayrollPolicy(this.payrollPolicyId)
    this.payrollPolicyforms= new FormGroup({ 
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),    })

  }
  

  get fr() {
    return this.payrollPolicyforms.controls;
  }

  getpayrollpolicy(){
    let body ={
      "status":["Active"],
      
    }
    this.apiService.postMethod("/payrollpolicy/filter?pageno=no" ,body).subscribe( data => {
      console.log('Payroll policy',data);
      this.checkmaster = data.response.data.PayrollPolicy;
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
        if(this.payrollPolicyData.organisationId == this.org_dd[i].uniqueId){
          this.payrollPolicyforms.controls['orgdrop'].setValue(i);
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
    console.log(this.payroll_list);
    
    this.apiService.postMethod("/employeeearningmaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('EarningMaster_getvalueDD',data);
       this.payroll_list = data.response.data.EmployeeEarningMaster;
      console.log('EarningMaster_getvalueDD',this.payroll_list);

    })
  }
  getdeduction(val) {
   
    console.log("thisssss",val);

    let body ={
      "status":["Active"],
      "organisationId":[val.uniqueId]

    }
    // console.log(this.payroll_list);
    
    this.apiService.postMethod("/employeedeductionmaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('DeductionMaster_getvalueDD',data);
       this.payroll_deduction = data.response.data.EmployeeDeductionMaster;
      console.log('DeductionMaster_getvalueDD',this.payroll_deduction);

    })
  }
  

 
  getSinglepayrollPolicy(id){
    this.apiService.getMethod2("/payrollpolicy", id).subscribe( data => {
      console.log("hello",data);
      this.payrollPolicyData = data.response.data.PayrollPolicy;
      
      this.payrollPolicyforms.controls['name'].setValue( this.payrollPolicyData.name); 
      this.payrollPolicyforms.controls['desp'].setValue( this.payrollPolicyData.description);
      console.log(this.org_dd);
      console.log("selectorg====>",this.payrollPolicyData.ref.organisationId)
      // this.getorg();
      this.payroll_deduction = this.payrollPolicyData.ref.detectionMaster
      for(let i=0;i<this.payroll_deduction.length;i++){
       this.selectedPropertiesObjDeduction[this.payroll_deduction[i].detectionMasterId]=this.payroll_deduction[i].amount  
      console.log("selectedPropertiesObjDeduction====>",this.selectedPropertiesObjDeduction)
      }
     
      this.payroll_list = this.payrollPolicyData.ref.earningMaster
      for(let i=0;i<this.payroll_list.length;i++){
       this.selectedPropertiesObjEarning[this.payroll_list[i].earningMasterId]=this.payroll_list[i].amount
       console.log("selectedPropertiesObjEarning====>",this.selectedPropertiesObjEarning)
      }
      
    },err=> {
      console.log(err); 
  });
  }

 

  payrolltypeval(event){
    this.selectedPropertiesObjEarning={}
    this.selectedPropertiesObjDeduction={}
console.log(event.target.value)
console.log(this.org_dd[event.target.value])
this.selectorg=this.org_dd[event.target.value]

  }
  getEarningValues(key,event){
    console.log(key,event.target.amount);
    this.selectedPropertiesObjEarning[key]=event.target.value
    console.log(this.selectedPropertiesObjEarning);
   }

   getDeductionValues(key,event){
    console.log(key,event.target.value);
    this.selectedPropertiesObjDeduction[key]=event.target.value
    console.log(this.selectedPropertiesObjDeduction);
    
   }

}
