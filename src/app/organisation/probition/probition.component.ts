import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-probition',
  templateUrl: './probition.component.html',
  styleUrls: ['./probition.component.css']
})
export class ProbitionComponent implements OnInit {
  public term: any;
  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
  public probDetails: any = [];
  public prob: any = [];
  public probCount: number;
  public filteredData: any = [];
  public probModalForms: FormGroup;
  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatus: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  public modalHeaderText: string = 'New prob';
  public modalButtonText: string = 'Save';
  public modal_data: any;
  public Submitted: boolean;
  public saveData: any;
  probdisableDetails
  activeBody: any = {};
  disableBody: any = {};
  showItemActive: number = 10;
  showItemDisable: number = 10;
  active_count: 0
  pager: any = {};
  pagen: any = {};
  disable_count: 0
  pagerdisable: any = {};
  pagendisable: any = {};
  org_dd:any;
  userObj:any;
  empid:any;
  typedetials:any;
  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorganisation();
    this.getprob(null, 1);
    this.getdisableprob(null, 1);
    this.probModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
      'orgdrop':new FormControl("", Validators.required),
    });
  }

  getorganisation(){
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

  get fr() {
    return this.probModalForms.controls;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getprob(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getprob(null, this.pager.currentPage);
  }
  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }
    this.getdisableprob(null, page);
  }
  savedisableItems(number) {
    this.showItemDisable = number;
    this.getdisableprob(null, this.pagerdisable.currentPage);
  }
  search() {
    this.getdisableprob(this.term, 1)
    this.getprob(this.term, 1)
    this.spinner.hide();
  }
  status(id, type) {
    this.empid=id;
    this.typedetials=type
  
  }
  sumbitstatus(){
  
    if (this.typedetials == 'enable' || this.typedetials == "disable") {
      this.spinner.show();
      this.apiService.putMethod("/probationary/status/" + this.typedetials, this.empid).subscribe(
        data => {
          // var result1 = confirm("Are you sure to move?")
          $("#disableModal").modal("hide");    
           $("#activeModal").modal("hide");    
  
           this.getprob(null, 1);
           this.getdisableprob(null, 1);
        }, err => {
          this.spinner.hide()
          console.log(err)
        }
      )
    }
  }
  delete(){
    
    if (this.typedetials === 'delete') {
        this.spinner.show();
        this.apiService.deleteMethod1('/probationary/status/delete', this.empid).subscribe(
          data => {
            $("#deleteModal").modal("hide");  
  
            this.getprob(null, 1);
    this.getdisableprob(null, 1);
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } 
    }
  
  cancelpop(){
   
    this.getprob(null, 1);
    this.getdisableprob(null, 1);
  }





  public getprob(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      // "organsationId":[""],
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
    this.apiService.postMethod("/probationary/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.probDetails = data.response.data.Probationary;
      console.log("kiki",this.probDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.probDetails.length)) {
        this.getprob(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getdisableprob(search, pageno) {
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
    this.apiService.postMethod("/probationary/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, body).subscribe(data => {
      this.spinner.hide();
      this.probdisableDetails = data.response.data.Probationary;
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.probdisableDetails.length)) {
        this.getdisableprob(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  useraction(type,id){
    if(type == 'view'){
      sessionStorage.setItem("probid",id)
     }
     else if(type == 'edit'){
      sessionStorage.setItem("probid",id)
     }
     
  }
  
}