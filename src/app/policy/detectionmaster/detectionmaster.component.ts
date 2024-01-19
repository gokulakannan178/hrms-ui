import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-detectionmaster',
  templateUrl: './detectionmaster.component.html',
  styleUrls: ['./detectionmaster.component.css']
})
export class DetectionmasterComponent implements OnInit {

  showItemActive: number = 10;
  showItemDisabled: number = 10;
  
  active_count: 0
  disabled_count: 0

  pagerActive: any = {};
  pagenActive: any = {};

  pagerDisabled: any = {};
  pagenDisabled: any = {};

  public activedetectionMaster: any = [];
  public disableddetectionMaster: any = [];

  public term: any;
  typedetials:any;
  empid:any;
  userObj:any;
  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getAllActivedetectionMaster(null,1);
    this.getAllDisableddetectionMaster(null,1)
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagenActive.totalPage) {
      return;
    }
    this.getAllActivedetectionMaster(null, page);
  }

  setPageDisabled(page: number) {
    if (page < 1 || page > this.pagenDisabled.totalPage) {
      return;
    }
    this.getAllDisableddetectionMaster(null, page);
  }

  saveActiveItems(number) {
    this.showItemActive = number;
    this.getAllActivedetectionMaster(null, this.pagerActive.currentPage);
  }

  saveDisabledItems(number) {
    this.showItemDisabled = number;
    this.getAllDisableddetectionMaster(null, this.pagerDisabled.currentPage);
  }

  public getAllActivedetectionMaster(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy": "name",
      "sortOrder": 1
      
    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          name: search
        }
      }
    }
    this.apiService.postMethod("/employeedeductionmaster/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.activedetectionMaster = data.response.data.EmployeeDeductionMaster;
      this.active_count = data.response.data.pagination.count;
      this.pagenActive.totalUsers = data.response.data.pagination.count;
      this.pagenActive.totalPage = data.response.data.pagination.totalPage;
      this.pagenActive.currentPage = data.response.data.pagination.pageNum;
      this.pagerActive = this.pagerservice.getPager(this.pagenActive.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.activedetectionMaster.length)) {
        this.getAllActivedetectionMaster(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getAllDisableddetectionMaster(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Disabled"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy": "name",
      "sortOrder": 1
      
    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          name: search
        }
      }
    }
    this.apiService.postMethod("/employeedeductionmaster/filter?pageno=" + pageno + "&limit=" + this.showItemDisabled, body).subscribe(data => {
      this.spinner.hide();
      this.disableddetectionMaster = data.response.data.EmployeeDeductionMaster ;
      this.disabled_count = data.response.data.pagination.count;
      this.pagenDisabled.totalUsers = data.response.data.pagination.count;
      this.pagenDisabled.totalPage = data.response.data.pagination.totalPage;
      this.pagenDisabled.currentPage = data.response.data.pagination.pageNum;
      this.pagerDisabled = this.pagerservice.getPager(this.pagenDisabled.totalUsers, pageno, this.showItemDisabled);
      if ((pageno > 1) && (!this.disableddetectionMaster.length)) {
        this.getAllDisableddetectionMaster(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  search() {
    this.getAllDisableddetectionMaster(this.term, 1)
    this.getAllActivedetectionMaster(this.term, 1)
    this.spinner.hide();
  }

  status(id, type) {
    this.empid=id;
    this.typedetials=type
    
  }

  sumbitstatus(){
  
    if (this.typedetials == 'enable' || this.typedetials == "disable") {
      this.spinner.show();
      this.apiService.putMethod("/employeedeductionmaster/status/" + this.typedetials, this.empid).subscribe(
        data => {
          // var result1 = confirm("Are you sure to move?")
          $("#disableModal").modal("hide");    
           $("#activeModal").modal("hide");    
  
           this.getAllActivedetectionMaster(null,1);
           this.getAllDisableddetectionMaster(null,1)
  
        }, err => {
          this.spinner.hide()
          console.log(err)
        }
      )
    }
  }
  delete(){
    
    if (this.typedetials == 'delete') {
        this.spinner.show();
        this.apiService.deleteMethod1('/employeedeductionmaster/status/delete', this.empid).subscribe(
          data => {
            $("#deleteModal").modal("hide");  
  
            this.getAllActivedetectionMaster(null,1);
            this.getAllDisableddetectionMaster(null,1)
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } 
    }
  
  cancelpop(){
   
    this.getAllActivedetectionMaster(null,1);
    this.getAllDisableddetectionMaster(null,1)
  }
  

  useraction(type,id){
    if(type == 'view'){
      sessionStorage.setItem("detectionmasterViewId",id)
      this.router.navigate(['/policy/viewdetectionmaster'])
     }
     else if(type == 'edit'){
      sessionStorage.setItem("detectionmasterEditId",id)
      this.router.navigate(['/policy/editdetectionmaster'])
     }
     
  }

}
