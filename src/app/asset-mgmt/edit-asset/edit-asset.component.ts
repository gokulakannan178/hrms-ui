import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent implements OnInit {

  constructor(public apiService:ApiService,public router:Router) { }
  assetforms:FormGroup
  Submitted:boolean;
  org_dd: any =[];
  asset_dd: any=[];
  asset_id:any=[];
  asset_properties:any=[];
  selectedPropertiesObj : any={};
  properties: any=[];
  assetData:any ={};
  editId:any
  userObj:any;
  assettype_properties:[];
  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.editId = sessionStorage.getItem("assetTypeViewId")

    this.assetforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      assetdrop:new FormControl("", Validators.required),
      asssetpropval:new FormControl("", Validators.required),
      
      // assetProperties:new FormControl(""),
    })
    this.getorg()
    this.getassettype()
    this.getSingleAsset()
  }
  getSingleAsset(){
    this.apiService.getMethod2("/asset", this.editId).subscribe( data => {
      // console.log("hello",data);
      this.assetData = data.response.data.Asset;
      console.log("kkkkkkkkk",this.assetData.ref.assetTypeId.name)
     
      this.assetforms.controls['name'].setValue( this.assetData.name);
      this.assetforms.controls['orgdrop'].setValue( this.assetData.ref.organisationId.uniqueId);
      this.assetforms.controls['desp'].setValue( this.assetData.description);
      //  this.assetforms.controls['assetpropval'].setValue( this.assetData.ref.assetTypePepropertys.value);
       this.asset_properties = this.assetData.ref.assetTypePepropertys
       for(let i=0;i<this.asset_properties.length;i++){
        this.selectedPropertiesObj[this.asset_properties[i].uniqueId]=this.asset_properties[i].value
       }
       
    },err=> {
      console.log(err); 
  });
  }


  editasset(){
    var body={
      "uniqueId":this.editId,
      "name":this.assetforms.value.name,
      "organisationId":this.assetforms.value.orgdrop,
      "description":this.assetforms.value.desp,
      "assetTypeId":this.assetforms.value.assetdrop,
    }
    let sendingProp = []
      for (const [key, value] of Object.entries(this.selectedPropertiesObj)) {
        console.log(`${key}: ${value}`);
        sendingProp.push(
          {
            "assetPropertyId":key,
            "value":value,
          }
        )
      }
      body["assetPropertysId"]=sendingProp
      this.apiService.putMethod2('/asset',body).subscribe( data => {
        console.log(data);
          alert("Updated Successfully")  
          this.router.navigate(['/asset-mgmt/asset'])
      },err=> {
        console.log(err);
      }); 
 
  }
  
  get fr() {
    return this.assetforms.controls;
  }
  getValue(val) {
    this.asset_dd = val;
    console.log("thisssss",this.asset_dd);

    let body ={
      "status":["Active"],
      "assetTypeIds":[val]

    }
    this.apiService.postMethod("/assettypepropertys/filter?pageno=no" ,body).subscribe( data => {
      console.log('Assettype_getvalueDD',data);
      // this.assettype_properties = data.response.data.AssetTypePropertys;
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
      console.log('Org_DD',data);
      this.org_dd = data.response.data.organisation;
    })
  }
  getassettype(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/assettype/filter?pageno=no" ,body).subscribe( data => {
      console.log('Assettype_DD',data);
      this.asset_dd = data.response.data.AssetType;
      
    })
  }

  assetval(event){
    this.selectedPropertiesObj={}
  
console.log(event.target.value)
console.log(this.asset_dd[event.target.value])
this.asset_properties = this.asset_dd[event.target.value].ref?.assetTypePepropertys

  }

 getAssetPropertyValues(key,event){
  console.log(key,event.target.value);
  this.selectedPropertiesObj[key]=event.target.value
  console.log(this.selectedPropertiesObj);
  
 }

}

