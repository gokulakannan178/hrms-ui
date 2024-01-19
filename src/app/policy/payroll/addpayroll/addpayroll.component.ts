import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgModule } from '@angular/core';



@Component({
  selector: 'app-addpayroll',
  templateUrl: './addpayroll.component.html',
  styleUrls: ['./addpayroll.component.css']
})
export class AddpayrollComponent implements OnInit {

  PayrollPolicyforms:FormGroup
  Submitted:boolean;
  orgdrop:any;
  org_dd:any;
  earning:any;
  deduction:any;
  checkmaster:any;
  selectedItemsCheckMaster=[];
  orgdropdown:IDropdownSettings = {};
  userObj:any;
  organisation:any;
  selectorg:any;
  payroll_list:any=[];
  payroll_deduction:any=[];
  selectedPropertiesObj : any={};
  selectedPropertiesObject : any={};
  value:any={};
  takehomeArr:any=[];
  grossamtArr:any=[];
  takehome:any
  grossamt:any;
  ear_list:any;
  ded_list:any;
  takehomeinp:any="";
  grossamtinp:any="";

  // totaldeduction:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this. PayrollPolicyforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
       orgdrop:new FormControl("", Validators.required),
    })

    this.getorg();

    this.orgdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
  }

  get fr() {
    return this. PayrollPolicyforms.controls;
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

          if(this.payroll_list.length == 0){
            this.takehome=false
          }else{
                this.takehome=true
              }

    })
  }
  getdeduction(val) {
   
    console.log("thisssss",val);

    let body ={
      "status":["Active"],
      "organisationId":[val.uniqueId]

    }
    console.log(this.payroll_list);
    
    this.apiService.postMethod("/employeedeductionmaster/filter?pageno=no" ,body).subscribe( data => {
      console.log('DeductionMaster_getvalueDD',data);
       this.payroll_deduction = data.response.data.EmployeeDeductionMaster;
      console.log('DeductionMaster_getvalueDD',this.payroll_deduction.length);

          if(this.payroll_deduction.length == 0){
            this.grossamt=false
          }else{
                this.grossamt=true
              }
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

  payrolltypeval(event){
    this.selectedPropertiesObj={}
    this.selectedPropertiesObject={}


console.log("Organissssation",event.target.value)
console.log(this.org_dd[event.target.value])
this.getValue(this.org_dd[event.target.value])
this.getdeduction(this.org_dd[event.target.value])
this.selectorg=this.org_dd[event.target.value]
        
  }
  getEarningValues(key,event){
    console.log(key,event.target.value);
    this.selectedPropertiesObj[key]=event.target.value
    console.log("Earning===>",this.selectedPropertiesObj);
    this.earning = event.target.value 
    console.log("AAAAA",this.earning)
   
    let earning_obj={
      id:parseInt(key),
      value:parseInt(this.earning)
    }
    if(this.takehomeArr.length !==0 ){
      let earning_variable=this.takehomeArr.findIndex(((data:any) => data.id == parseInt(key) ))
      console.log("====>",earning_variable)
      if(earning_variable == -1){
         this.takehomeArr.push(earning_obj)
      }
      else{
        this.takehomeArr[earning_variable].value = parseInt(event.target.value)
        console.log("++++>",this.takehomeArr[earning_variable])
      }
    }
    else{
      this.takehomeArr.push(earning_obj)

    }
  
    console.log("EarningArray----->",this.takehomeArr)
    let total_earning:number=0
    // this.grossamtArr.forEach(item=>{
    //   total += item.name
    // })
     for(let i=0;i<this.takehomeArr.length;i++){
        total_earning = total_earning + this.takehomeArr[i].value
     }

     console.log("Total Earning Value===>",total_earning)
    this.grossamtinp = total_earning
    
   }
   ded(event){
  
      const pattern=(/^\d*\.?\d*$/);
      const check= String.fromCharCode(event.charCode)
      if( !pattern.test(check)){
        event.preventDefault()
      }
   }
   getDeductionValues(key,event){
    console.log("getDeductionValues",key,event.target.value);
    this.selectedPropertiesObject[key]=event.target.value
    console.log("Deduction====>",this.selectedPropertiesObject);
    this.deduction = event.target.value 
    console.log("BBBBBB",this.deduction)
    let deduction_obj={
      id:parseInt(key),
      value:parseInt(this.deduction)
    }
    if(this.grossamtArr.length !==0 ){
      let deduction_variable=this.grossamtArr.findIndex(((data:any) => data.id == parseInt(key) ))
      console.log("====>",deduction_variable)
      if(deduction_variable == -1){
         this.grossamtArr.push(deduction_obj)
      }
      else{
        this.grossamtArr[deduction_variable].value = parseInt(event.target.value)
        console.log("++++>",this.grossamtArr[deduction_variable])
      }
    }
    else{
      this.grossamtArr.push(deduction_obj)

    }
  
    console.log("DeductionArray----->",this.grossamtArr)
    let total_deduction:number=0
    // this.grossamtArr.forEach(item=>{
    //   total_deduction += item.name
    // })
     for(let i=0;i<this.grossamtArr.length;i++){
        total_deduction = total_deduction+ this.grossamtArr[i].value
     }
     this.takehomeinp=total_deduction

     console.log("total Deduction Value===>",total_deduction)
    
   }
  
  savepayrollpolicy(){
    this.Submitted = true;
     if(this. PayrollPolicyforms.invalid){
     alert("Fill all the Fields")
    console.log("Form Data ", this. PayrollPolicyforms.controls)
    return
  }
  // this.selectedItemsCheckMaster = this.selectedItemsCheckMaster.map(s=> s.uniqueId);

    var body={
      "name":this. PayrollPolicyforms.value.name,
      "organisationId":this.selectorg.uniqueId,
      "description":this. PayrollPolicyforms.value.desp, 

    }
    let sendingearning = []
    let sendingdeduction = []
    console.log("this.selectedPropertiesObj",this.selectedPropertiesObj );
    console.log("this.selectedPropertiesObject",this.selectedPropertiesObject );

    
      for (const [key, value] of Object.entries(this.selectedPropertiesObj)) {
        console.log(`${key}: ${value}`);
        sendingearning.push(
          
          {
            "uniqueId":key,
            "value":parseFloat(""+value),
          }
        );
      }
        for (const [key, value] of Object.entries(this.selectedPropertiesObject)) {
          console.log(`${key}: ${value}`);

        sendingdeduction.push(
          
                {
                  "uniqueId":key,
                  "value":parseFloat(""+value),
                }
              )
      }
      body["earningMaster"]=sendingearning
      body["detectionMaster"]=sendingdeduction
    this.apiService.postMethod('/payrollpolicy',body).subscribe( data => {
      console.log(data);
        alert("Added Successfully")  
        this.router.navigate(['/policy/payroll'])
    },err=> {
      console.log(err);
    }); 
  
  }

  
    
 
 
}