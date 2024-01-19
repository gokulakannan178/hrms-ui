import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import * as myGlobals from '../../shared/globals';


@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

public apiUrl=myGlobals.base_api_url
  designation:boolean=false;
  Submitted:boolean;
  userObj:any;
  allemployee:any;
  empidId:string;
  employee:FormGroup;
  searchemployee:FormGroup;
  data:any;
  id:any;
  uniqueId:any;
  profileimg:any
  deslist:any
  branch_dd:any
  dept_dd:any

  constructor(public apiService: ApiService,public router:Router) { 
  
  }

  ngOnInit(): void {
    // this.empidId=sessionStorage.getItem("empid")
    // this.getemploye(this.empidId)
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getdesignation()
    this.getbrach()
    this.getdepartment()
    this.searchemployee=new FormGroup({
      'branch': new FormControl(),
      'department':new FormControl(),
      'designation': new FormControl(),
      'employeeId': new FormControl(),
      'employeename': new FormControl(),
    })
    this.employee = new FormGroup ({
      employe_pro:new FormControl("",Validators.required),
      name:new FormControl("",Validators.required),
      designation:new FormControl("",Validators.required),
      email:new FormControl("",Validators.required),
      line_manager:new FormControl("",Validators.required),
      contact:new FormControl("",Validators.required)

    })
    this.getemploye();
 }

 get fr(){
  return this.searchemployee.controls
 }

  viewprofileimg(imguri){
    this.profileimg=this.apiUrl+imguri
  }
  getbrach(){
    let body ={
      "status":["Active"],
     
      
    }
    this.apiService.postMethod("/Branch/filter?pageno=no" ,body).subscribe( data => {
      console.log('Branch filter',data);
      this.branch_dd = data.response.data.Branch;
   
    })
  }
  getdepartment(){
    let body ={
      "status":["Active"],
      
    }
    this.apiService.postMethod("/Department/filter?pageno=no" ,body).subscribe( data => {
      console.log('Department filter',data);
      this.dept_dd = data.response.data.Department;
   
    })
  }
  getdesignation(){
    let body ={
      "status":["Active"],
      // "dataAccess": {
      //   "isAccess": true,
      //   "userName":this.userObj.userName
      // },
    }
    this.apiService.postMethod("/designation/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.deslist = data.response.data.Designation;
    })
  }
  getemploye(){
    
    // let designation 
    // if(this.searchemployee.value.designation!=""){
    //   designation=[this.searchemployee.value.designation]
    // }else{
    //   designation=[]
    // }
  let body ={

   
   "status": ["Probationary","Activeemployee","Bench","Notice"],
        // "designation":designation,
   "sortBy":"name",
   "sortOrder":1,
  // "status":["allemployee"]
  // "regex":{
  //   "name":this.searchemployee.value.employeename?this.searchemployee.value.employeename:"",

  // }
   
    
  }


 this.apiService.postMethod("/employee/filter?pageno=no",body).subscribe(data => {
  this.allemployee = data.response.data.data;
  console.log("thisddddd",this.allemployee)
  this.viewprofileimg=(this.allemployee.profileImg)
  this.profileimg=this.apiUrl+this.allemployee.profileImg
  // this.employee.controls['employe_pro'].setValue(this.allemployee.profileImg),
  // this.employee.controls['name'].setValue(this.allemployee.name),
  // this.employee.controls['designation'].setValue(this.allemployee.ref.departmentId),
  // this.employee.controls['contact'].setValue(this.allemployee.ref.mobile),
  // this.employee.controls['email'].setValue(this.allemployee.email),
  // this.employee.controls['line_manager'].setValue(this.allemployee.ref.lineManager)
  });
 }
 getserachemploye(){
  console.log("designation",this.searchemployee.value.designation)
  console.log("employeeId",this.searchemployee.value.employeeId)
  console.log("employeename",this.searchemployee.value.employeename)
 
  
let body ={
  "status": ["Probationary","Activeemployee","Bench","Notice"],
      "designation":this.searchemployee.value.designation?[this.searchemployee.value.designation]:[],
      "branch":this.searchemployee.value.branch?[this.searchemployee.value.branch]:[],
      "department":this.searchemployee.value.department?[this.searchemployee.value.department]:[],
      "sortBy":"name",
      "sortOrder":1,
// "status":["allemployee"]
   "regex":{
      "name":this.searchemployee.value.employeename?this.searchemployee.value.employeename:"",
  }
}


this.apiService.postMethod("/employee/filter?pageno=no",body).subscribe(data => {
this.allemployee = data.response.data.data;
console.log("thisddddd",this.allemployee)
this.viewprofileimg=(this.allemployee.profileImg)
this.profileimg=this.apiUrl+this.allemployee.profileImg
// this.employee.controls['employe_pro'].setValue(this.allemployee.profileImg),
// this.employee.controls['name'].setValue(this.allemployee.name),
// this.employee.controls['designation'].setValue(this.allemployee.ref.departmentId),
// this.employee.controls['contact'].setValue(this.allemployee.ref.mobile),
// this.employee.controls['email'].setValue(this.allemployee.email),
// this.employee.controls['line_manager'].setValue(this.allemployee.ref.lineManager)
});
}
reset(){
  //this.searchemployee.controls.District.setValue(null);
  this.searchemployee.controls.designation.setValue(null)
  this.searchemployee.controls.department.setValue(null)
  this.searchemployee.controls.branch.setValue(null)
//this.searchemployee.controls.employeeId.setValue(null)
this.searchemployee.controls.employeename.setValue("")
this.getemploye()
}
}
