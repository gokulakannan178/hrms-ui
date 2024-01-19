import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-editearningmaster',
  templateUrl: './editearningmaster.component.html',
  styleUrls: ['./editearningmaster.component.css']
})
export class EditearningmasterComponent implements OnInit {

  earningMasterforms:FormGroup
  Submitted:boolean = false;
  checklistData: any;
  editId:any;
  org_dd: any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

     this.editId = sessionStorage.getItem('earningMasterEditId')
    this.getSingleRecord(this.editId)
    this.getorg()
    this.earningMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required)
    })
  }



  get fr() {
    return this.earningMasterforms.controls;
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
      this.org_dd = data.response.data.organisation;
      // this.checklistMasterforms.controls.orgdrop.setValue(this.checklistMasterforms.organisationId);

    })
  }


  getSingleRecord(id){
    this.apiService.getMethod2("/employeeearningmaster", id).subscribe( data => {
      console.log("hello",data);
      this.checklistData = data.response.data.EmployeeEarningMaster;
      
      this.earningMasterforms.controls['name'].setValue( this.checklistData.title);
      this.earningMasterforms.controls['orgdrop'].setValue(this.checklistData.organisationId)
      this.earningMasterforms.controls['desp'].setValue( this.checklistData.description);
    },err=> {
      console.log(err); 
  });
  }

  earningMasterPolicy(){
    if(this.earningMasterforms.invalid){
      this.Submitted = true
     return
   }
   this.Submitted=false;
   var body={
    "uniqueId":this.editId,
     "title":this.earningMasterforms.value.name,
     "description":this.earningMasterforms.value.desp,
     "organisationId":this.earningMasterforms.value.orgdrop,

   }
   this.apiService.putMethod2('/employeeearningmaster',body).subscribe( data => {
     console.log(data);
       alert("Updated Successfully")  
       this.router.navigate(['/policy/Earningmaster'])
   },err=> {
     console.log(err);
   }); 
 }

}

