import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
 import { DomSanitizer} from "@angular/platform-browser";
 import { Pipe, PipeTransform } from '@angular/core';
 
declare var $:any;
@Component({
  selector: 'app-view-billclaim',
  templateUrl: './view-billclaim.component.html',
  styleUrls: ['./view-billclaim.component.css']
})
export class ViewBillclaimComponent implements OnInit {
  public apiUrl = myGlobals.base_api_url;
  addclaimforms:FormGroup;
  billdetails:any;
  total:any=0;
  uniqId:any;
  getapplication:any;
  photoUrldata:any={};
  public Submitted: boolean;
  noimg:boolean=false;
  viewbillId:any;
  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService,public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.addclaimforms = new FormGroup({
      tit: new FormControl("", Validators.required),
      desc: new FormControl("", Validators.required),
      
    })
    this.photoURL("../../../assets/img/download.png")
    this.getsingleapi();
  }
  photoURL(url) {
    this.photoUrldata=""
  if (url == ""){
    return "../../../assets/img/download.png"
  }
   this.photoUrldata = this.sanitizer.bypassSecurityTrustResourceUrl(this.apiUrl+ url);
   }
  get fr() {
    return this.addclaimforms.controls;
  }
  showbill(file){
    this.photoURL(file)
  }
  billtotal(){
    this.total=0;
    for (let i=0;i<this.billdetails.length;i++){
     this.total = this.total + this.billdetails[i].amount;
     console.log("totallll",this.total);
     } 
   }

  getsingleapi(){
    this.viewbillId= sessionStorage.getItem('billclaim'),
  console.log("billId",this.viewbillId)
    this.apiService.getMethod2("/billClaim", this.viewbillId).subscribe( data => {
      console.log("hello",data);
      this.getapplication = data.response.data.data;
      this.billdetails=this.getapplication.bills,
       this.billtotal();
      this.addclaimforms.controls['tit'].setValue( this.getapplication.title);
      this.addclaimforms.controls['desc'].setValue( this.getapplication.desc);
      if (this.billdetails.length >0){
        if (this.billdetails[0].file != ""){
          this.showbill(this.billdetails[0].file);
        }
      }
      // this.subbilldetails[i].title=this.editbillForms.controls.title.value
     
    },err=> {
      console.log(err); 
  });
  }
 
 


}
