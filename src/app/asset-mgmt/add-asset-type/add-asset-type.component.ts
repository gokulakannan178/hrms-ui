import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-asset-type',
  templateUrl: './add-asset-type.component.html',
  styleUrls: ['./add-asset-type.component.css']
})
export class AddAssetTypeComponent implements OnInit {

  constructor(public apiService:ApiService,public router:Router) { }
  assetTypeforms:FormGroup
  Submitted:boolean;
  org_dd: any;
  userObj:any;
  properties: any=[];
  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.assetTypeforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      assetProperties:new FormControl(""),
    })
    this.getorg()
  }
 
  saveassettype(){
      this.Submitted = true;
       if(this.assetTypeforms.invalid){
       alert("Fill all the Fields")
      console.log("Form Data ", this.assetTypeforms.controls)
      return
    }
    if (this.properties.length ==0){
      alert("Please add atleast one property")
      return
    }
      var body={
        "name":this.assetTypeforms.value.name,
        "organisationId":this.assetTypeforms.value.orgdrop,
        "description":this.assetTypeforms.value.desp,
        "noticedays":this.assetTypeforms.value.noofdays,
        "assetTypePropertysId":this.properties
  
      }
      this.apiService.postMethod('/assettype/withproperty',body).subscribe( data => {
        console.log(data);
          alert("Added Successfully")  
          this.router.navigate(['/asset-mgmt/asset-type'])
      },err=> {
        console.log(err);
      }); 
    }
  
  get fr() {
    return this.assetTypeforms.controls;
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
    })
  }

  addproperty (){
    console.log("properties",this.properties);
    
    if(this.assetTypeforms.value.assetProperties==""){
      alert("Please enter a valid property")
      return
    }
    for(let i=0;i<this.properties.length;i++){
      if(this.properties[i]==this.assetTypeforms.value.assetProperties){
        alert("Duplicate properties are not allowed")
        return
      }
    }

    this.properties.push(this.assetTypeforms.value.assetProperties)
    
  }
  deleteProperty(i){
    this.properties.splice(i,1)
  }

}
