import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';
import {Router} from '@angular/router'
@Component({
  selector: 'app-view-asset-type',
  templateUrl: './view-asset-type.component.html',
  styleUrls: ['./view-asset-type.component.css']
})
export class ViewAssetTypeComponent implements OnInit {

  constructor(public apiService:ApiService,public router:Router) { }
  assetTypeforms:FormGroup
  Submitted:boolean;
  org_dd: any;
  properties: any=[];
  assettypeid: string ="";
  assetTypeData:any ={};
  ngOnInit(): void {
    this.assettypeid=sessionStorage.getItem("assetTypeViewId"),

    this.assetTypeforms = new FormGroup({
      name: new FormControl("", Validators.required),
      desp: new FormControl("", Validators.required),
      orgdrop:new FormControl("", Validators.required),
      assetProperties:new FormControl(""),
    })
    this.getSingleAssetType(this.assettypeid)

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
    this.properties = this.assetTypeData.ref.assetTypePepropertys.map(s=> s.name);

      // this.properties=this.assetTypeData.assetTypePepropertys

    },err=> {
      console.log(err); 
  });
  }

}
