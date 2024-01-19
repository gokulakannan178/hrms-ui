import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {

  constructor(public apiService:ApiService,public router:Router) { }
  assetforms:FormGroup
  Submitted:boolean;
  org_dd: any =[];
  asset_dd: any=[];
  asset_id:any=[];
  assettype_properties:any=[];
  assettype:any={};
  selectedPropertiesObj : any={};
  properties: any=[];
  userObj:any;
  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.assetforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      assetdrop:new FormControl("", Validators.required),
      // assetProperties:new FormControl(""),
    })
    this.getorg()
    this.getassettype()
  }
 
  saveasset(){
      this.Submitted = true;
       if(this.assetforms.invalid){
       alert("Fill all the Fields")
      console.log("Form Data ", this.assetforms.controls)
      return
    }
    // if (this.properties.length ==0){
    //   alert("Please add atleast one property")
    //   return
    // }
      var body={
        "name":this.assetforms.value.name,
        "organisationId":this.assetforms.value.orgdrop,
        "assetTypeId":this.assettype.uniqueId,
        "description":this.assetforms.value.desp,
       
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
      this.apiService.postMethod('/asset',body).subscribe( data => {
        console.log(data);
          alert("Added Successfully")  
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
      "status":["Active"],
      "organisationId":this.org_dd
    }
    this.apiService.postMethod("/assettype/filter?pageno=no" ,body).subscribe( data => {
      console.log('Assettype_DD',data);
      this.asset_dd = data.response.data.AssetType;
      
    })
  }

  assettypeval(event){
    this.selectedPropertiesObj={}

    // alert("hello")
    // let assetProperties:Array<any> = 
console.log(event.target.value)
console.log(this.asset_dd[event.target.value])
this.assettype = this.asset_dd[event.target.value]
this.assettype_properties = this.asset_dd[event.target.value].ref?.assetTypePepropertys
// if (event.target.value == )

  }

 getAssetPropertyValues(key,event){
  console.log(key,event.target.value);
  this.selectedPropertiesObj[key]=event.target.value
  console.log(this.selectedPropertiesObj);
  
 }

}

