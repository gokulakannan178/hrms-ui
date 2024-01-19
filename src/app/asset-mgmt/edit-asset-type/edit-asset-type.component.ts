import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'

@Component({
  selector: 'app-edit-asset-type',
  templateUrl: './edit-asset-type.component.html',
  styleUrls: ['./edit-asset-type.component.css']
})
export class EditAssetTypeComponent implements OnInit {

  constructor(public apiService:ApiService,public router:Router) { }
  assetTypeforms:FormGroup
  Submitted:boolean;
  org_dd: any;
  properties: any=[];
  assettypeid: string ="";
  assetTypeData:any ={};
  userObj:any;
  uniqId:any;
  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.assettypeid=sessionStorage.getItem("assetTypeViewId"),

    this.assetTypeforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      assetProperties:new FormControl(""),
    })
    this.getSingleAssetType(this.assettypeid)
    this.getorg();

  }
  get fr() {
    return this.assetTypeforms.controls;
  }

  getSingleAssetType(id){
    this.apiService.getMethod2("/assettype", id).subscribe( data => {
      // console.log("hello",data);
      this.assetTypeData = data.response.data.AssetType;
     
      this.assetTypeforms.controls['name'].setValue( this.assetTypeData.name);
      this.assetTypeforms.controls['orgdrop'].setValue( this.assetTypeData.ref.organisation.name);
      this.assetTypeforms.controls['desp'].setValue( this.assetTypeData.description);
    this.properties = this.assetTypeData.ref.assetTypePepropertys?this.assetTypeData.ref.assetTypePepropertys:[]
    
      // this.properties=this.assetTypeData.assetTypePepropertys

    },err=> {
      console.log(err); 
  });
  }


  editassettype(){
   
    var body={
      "uniqueId":this.assetTypeData.uniqueId,
      "name":this.assetTypeforms.value.name,
      "organisationId":this.assetTypeforms.value.orgdrop,
      "description":this.assetTypeforms.value.desp,
      "noticedays":this.assetTypeforms.value.noofdays,
      "assetTypePropertys":this.properties

    }
    this.apiService.putMethod2('/assettype/updateassettypeproperty?id='+this.assetTypeData.uniqueId,body).subscribe( data => {
      console.log(data);
        alert("Updated Successfully")  
        this.router.navigate(['/asset-mgmt/asset-type'])
    },err=> {
      console.log(err); 
    }); 
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
      if(this.properties[i].name==this.assetTypeforms.value.assetProperties){
        alert("Duplicate properties are not allowed")
        return
      }
    }

    this.properties.push({"name":this.assetTypeforms.value.assetProperties})
    
  }
  deleteProperty(i){
    this.properties.splice(i,1)
  }

}
