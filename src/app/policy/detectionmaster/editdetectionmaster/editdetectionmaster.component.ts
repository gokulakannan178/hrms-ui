import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import {Router} from '@angular/router'


@Component({
  selector: 'app-editdetectionmaster',
  templateUrl: './editdetectionmaster.component.html',
  styleUrls: ['./editdetectionmaster.component.css']
})
export class EditdetectionmasterComponent implements OnInit {

  deuctionMasterforms:FormGroup
  Submitted:boolean = false;
  checklistData: any;
  editId:any;
  org_dd: any;
  userObj:any;
  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

     this.editId = sessionStorage.getItem('detectionmasterEditId')
    this.getSingleRecord(this.editId)
    this.getorg()
    this.deuctionMasterforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("",Validators.required)
    })
  }



  get fr() {
    return this.deuctionMasterforms.controls;
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
    this.apiService.getMethod2("/employeedeductionmaster", id).subscribe( data => {
      console.log("hello",data);
      this.checklistData = data.response.data.EmployeeDeductionMaster;
      
      this.deuctionMasterforms.controls['name'].setValue( this.checklistData.title);
      this.deuctionMasterforms.controls['orgdrop'].setValue(this.checklistData.organisationId)
      this.deuctionMasterforms.controls['desp'].setValue( this.checklistData.description);
    },err=> {
      console.log(err); 
  });
  }

  earningMasterPolicy(){
    if(this.deuctionMasterforms.invalid){
      this.Submitted = true
     return
   }
   this.Submitted=false;
   var body={
    "uniqueId":this.editId,
     "title":this.deuctionMasterforms.value.name,
     "description":this.deuctionMasterforms.value.desp,
     "organisationId":this.deuctionMasterforms.value.orgdrop,

   }
   this.apiService.putMethod2('/employeedeductionmaster',body).subscribe( data => {
     console.log(data);
       alert("Updated Successfully")  
       this.router.navigate(['/policy/detectionmaster'])
   },err=> {
     console.log(err);
   }); 
 }

}