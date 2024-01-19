import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import * as myGlobals from '../../shared/globals';



'use strict';
var datascource ={};


@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})

export class OrgChartComponent implements OnInit {

  public apiUrl = myGlobals.base_api_url
    emplyoeeid:any;
    empidId:any;
    allemploye:any;
    readmore:boolean=false;
    profileimg:any
childata:boolean=false;
datascource:any



  constructor(public apiService: ApiService, ) { 
  
  }

  ngOnInit(): void {
    this.empidId=sessionStorage.getItem("empid")
   this.getsingle()
  }

  viewprofileimg(imguri){
    this.profileimg = this.apiUrl + imguri
    console.log(this.profileimg);
  }

  getsingle(){
    
        
    this.apiService.getMethod3("/employee/getorgchart").subscribe(
    data => {
      this.allemploye= data.response.data.data
      this.viewprofileimg=(this.allemploye.profileImg)
      this.profileimg=this.apiUrl+this.allemploye.profileImg
      // datascource["children"] = data.response.data.data
      $(function() {
    
  
        datascource = {
         'name': 'Logikoof Technologies...',
         'image' : '/assets/img/logo-1.png',
         'title': 'general manager',
         'children' : data.response.data.data
       };
         
       
   
       var oc = (<any>$('#chart-container')).orgchart({
         'data' : datascource,
         'visibleLevel': 2,
         'nodeContent': 'title',
         'nodeImage' : 'image',
         'pan': true,
         'zoom': true,
         'exportButton': false,
         'exportFilename': 'MyOrgChart',
         'exportFileextension': 'pdf'
       });
   
     });
     (jQuery);

      }
    )}

    childShow(child){
      if(child){
        this.readmore = !this.readmore;
        this.childata =! this.childata
        }
    }
 

  

}

// (function($){



