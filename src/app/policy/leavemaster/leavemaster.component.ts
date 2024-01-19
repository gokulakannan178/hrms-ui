import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-leavemaster',
  templateUrl: './leavemaster.component.html',
  styleUrls: ['./leavemaster.component.css']
})
export class LeavemasterComponent implements OnInit {

  showItemActive: number = 10;
  showItemDisabled: number = 10;
  deletedataid
  active_count: 0
  disabled_count: 0

  pagerActive: any = {};
  pagenActive: any = {};

  pagerDisabled: any = {};
  pagenDisabled: any = {};

  public activeleavemaster: any = [];
  public disabledleavemaster: any = [];

  public term: any;
  statusid:any;
  statustype:any;
  userObj:any;
  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getAllActiveleavemaster(null,1);
    this.getAllDisabledleavemaster(null,1)
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagenActive.totalPage) {
      return;
    }
    this.getAllActiveleavemaster(null, page);
  }

  setPageDisabled(page: number) {
    if (page < 1 || page > this.pagenDisabled.totalPage) {
      return;
    }
    this.getAllDisabledleavemaster(null, page);
  }

  saveActiveItems(number) {
    this.showItemActive = number;
    this.getAllActiveleavemaster(null, this.pagerActive.currentPage);
  }

  saveDisabledItems(number) {
    this.showItemDisabled = number;
    this.getAllDisabledleavemaster(null, this.pagerDisabled.currentPage);
  }

  public getAllActiveleavemaster(search, pageno) {
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
    this.apiService.postMethod("/leavemaster/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.activeleavemaster = data.response.data.LeaveMaster;
      this.active_count = data.response.data.pagination.count;
      this.pagenActive.totalUsers = data.response.data.pagination.count;
      this.pagenActive.totalPage = data.response.data.pagination.totalPage;
      this.pagenActive.currentPage = data.response.data.pagination.pageNum;
      this.pagerActive = this.pagerservice.getPager(this.pagenActive.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.activeleavemaster.length)) {
        this.getAllActiveleavemaster(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getAllDisabledleavemaster(search, pageno) {
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
    this.apiService.postMethod("/leavemaster/filter?pageno=" + pageno + "&limit=" + this.showItemDisabled, body).subscribe(data => {
      this.spinner.hide();
      this.disabledleavemaster = data.response.data.LeaveMaster;
      this.disabled_count = data.response.data.pagination.count;
      this.pagenDisabled.totalUsers = data.response.data.pagination.count;
      this.pagenDisabled.totalPage = data.response.data.pagination.totalPage;
      this.pagenDisabled.currentPage = data.response.data.pagination.pageNum;
      this.pagerDisabled = this.pagerservice.getPager(this.pagenDisabled.totalUsers, pageno, this.showItemDisabled);
      if ((pageno > 1) && (!this.disabledleavemaster.length)) {
        this.getAllDisabledleavemaster(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  search() {
    this.getAllDisabledleavemaster(this.term, 1)
    this.getAllActiveleavemaster(this.term, 1)
    this.spinner.hide();
  }

  status(id, type) {
    this.statusid=id,
    this.statustype=type
    
  }
  disabled(){
    if (this.statustype == 'enable' || this.statustype == "disable") {
      this.spinner.show()
      this.apiService.putMethod("/leavemaster/status/" +this.statustype, this.statusid).subscribe(
        data => {
          this.spinner.hide()
          this.getAllActiveleavemaster(null, 1);
          this.getAllDisabledleavemaster(null, 1);
          $('#disableModal').modal('hide')
          $("#activeModal").modal("hide");
        }, err => {
          this.spinner.hide()
          console.log(err)
        }
      )
    }
  }

  useraction(type,id){
    if(type == 'view'){
      sessionStorage.setItem("noticepolicyViewId",id)
     }
     else if(type == 'edit'){
      sessionStorage.setItem("leavemasterEditId",id)
     }
     else if (type == 'delete') {
      this.deletedataid=id
    
    }
  }

  deletedata(){

      this.apiService.deleteMethod1('/leavemaster/status/delete' ,this.deletedataid).subscribe(data => {
        $("#deleteModal").modal("hide");  
        console.log(data);
        // alert("Delete Successfully");
        this.getAllActiveleavemaster(null, 1);
        this.getAllDisabledleavemaster(null, 1);
      }, err => {
        console.log(err);
      });
    } return;
  

}

