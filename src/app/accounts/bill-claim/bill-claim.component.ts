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
declare var $:any;

@Component({
  selector: 'app-bill-claim',
  templateUrl: './bill-claim.component.html',
  styleUrls: ['./bill-claim.component.css']
})
export class BillClaimComponent implements OnInit {
  public term: any;
  pendingtoapproveModalForms:FormGroup;
  approvetorejectModalForms:FormGroup;

  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
   billPendingDetails
   billApprovedDetails
   billRejectDetails


  public allemployeeCount: number;
  public filteredData: any = [];
  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatus: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  empid:any;
  public modal_data: any;
  public Submitted: boolean;
  
  public saveData: any;
  allemployeedisableDetails
  activeDetails
  
  activeBody: any = {};
  disableBody: any = {};
  showItemActive: number = 10;
  showItemDisable: number = 10;
  showItemreject:number=10;
  active_count: 0
  pager: any = {};
  pagen: any = {};

  pagerdisable: any = {};
  pagendisable: any = {};
  disable_count: 0

  pagerreject: any = {};
  pagenreject: any = {};
  reject_count: 0
  public modalHeaderText1: string = 'Approve Bill';
  public modalButtonText1: string = 'Approve Bill';
  public modalButtonText2: string = 'Reject Bill';
  public modalHeaderText2: string = 'Reject Bill';
  userObj:any;
  empidd:any;
  typedetials:any;
  remarksapprove:any;
  remarksreject:any
  remarks:any

  constructor( public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.getrejectemployee(null,1);
    this.getpendingemployee(null,1);
    this.getapproveemployee(null,1);
    this.pendingtoapproveModalForms = new FormGroup({
      
      
    })
    this.approvetorejectModalForms = new FormGroup({
      remarks:new FormControl("",Validators.required),
      
    })
  }
  
  // Pending Bill

  public getpendingemployee(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Pending"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy":"_id",
      "sortOrder":-1
    }
    
  
    this.apiService.postMethod("/billClaim/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.billPendingDetails = data.response.data.data;
      console.log("ki",this.billPendingDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.billPendingDetails.length)) {
        this.getpendingemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //Approve Bill

  public getapproveemployee(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Approved"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy":"_id",
      "sortOrder":-1
      // "sortBy": "name",
      // "sortOrder": 1
      
    }
    // if (search) {
    //   if (search != "") {
    //     body["regex"] =
    //     {
    //       name: search
    //     }
    //   }
    // }
  
    this.apiService.postMethod("/billClaim/filter?pageno=" + pageno + "&limit=" + this.showItemDisable,body).subscribe(data => {
      this.spinner.hide();
      this.billApprovedDetails = data.response.data.data;
      console.log("kik",this.billApprovedDetails);
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.billApprovedDetails.length)) {
        this.getapproveemployee(null, pageno - 1)
        
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //Reject Bill

  public getrejectemployee(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Rejected"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy":"_id",
      "sortOrder":-1
    }
    
    this.apiService.postMethod("/billClaim/filter?pageno=" + pageno + "&limit=" + this.showItemreject,body).subscribe(data => {
      this.spinner.hide();
      this.billRejectDetails = data.response.data.data;
      console.log("kiki",this.billRejectDetails);
      this.reject_count = data.response.data.pagination.count;
      this.pagenreject.totalUsers = data.response.data.pagination.count;
      this.pagenreject.totalPage = data.response.data.pagination.totalPage;
      this.pagenreject.currentPage = data.response.data.pagination.pageNum;
      this.pagerreject = this.pagerservice.getPager(this.pagenreject.totalUsers, pageno, this.showItemreject);
      if ((pageno > 1) && (!this.billRejectDetails.length)) {
        this.getrejectemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  
  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getpendingemployee(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getpendingemployee(null, this.pager.currentPage);
  }
  //Approve
  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }
    this.getapproveemployee(null, page);
  }
  savedisableItems(number) {
    this.showItemDisable = number;
    this.getapproveemployee(null, this.pagerdisable.currentPage);
  }
  //Reject
  setPagereject(page: number) {
    if (page < 1 || page > this.pagenreject.totalPage) {
      return;
    }
    this.getrejectemployee(null, page);
  }
  saverejectItems(number) {
    this.showItemreject = number;
    this.getrejectemployee(null, this.pagerreject.currentPage);
  }



  status(type,id) {
    this.empidd=id;
    this.typedetials=type
    
  }
  statusmove(type,id) {
    if (type == 'move') {
      sessionStorage.setItem("empid",id)
      }
    this.empidd=id;
    this.typedetials=type
    
  }

  
  delete(){
    
    if (this.typedetials == 'delete') {
        this.spinner.show();
        this.apiService.deleteMethod1('/billClaim/status/delete', this.empidd).subscribe(
          data => {
            $("#deleteModal").modal("hide");  
  
            this.getrejectemployee(null,1);
    this.getpendingemployee(null,1);
    this.getapproveemployee(null,1);
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } 
    }
  
  cancelpop(){
    this.getrejectemployee(null,1);
    this.getpendingemployee(null,1);
    this.getapproveemployee(null,1);
  }
  


  useraction(type,id){
    console.log("idddddd",id)
     if (type == 'edit') {
    localStorage.setItem("uniqueid",id);
    }
   
    if (type == 'view') {
      sessionStorage.setItem("billclaim",id)
      }
    

  }

 public movetoapprove(){
  this.empid=sessionStorage.getItem("empid");
  console.log(this.remarksapprove);
  
  if(this.remarksapprove == ""){
    alert("fill Remarks")
    return;
}
    let body={
      "billClaim":this.empid,
      "reviewedBy":this.userObj.userName,
      "remarks":this.remarksapprove,
      
    }
    this.spinner.show();
    this.apiService.putMethod2('/billClaim/approved',body).subscribe( data => {
      console.log(data);
      $("#langModalapprove").modal("hide");
      alert("Approved Successfully"); 
      this.getrejectemployee(null,1);
    this.getpendingemployee(null,1);
    this.getapproveemployee(null,1);


    },err=> {
      this.spinner.hide();
      console.log(err);
    }); 
  }

  public movetoreject(){
    this.empid=sessionStorage.getItem("empid");
    if(this.remarksreject == ""){
      alert("fill Remarks")
      return;
  }
  
      let body={
        "remarks":this.remarksreject,
        "billClaim":this.empid,
        "reviewedBy":this.userObj.employeeId,
        
      }
      this.spinner.show();
      this.apiService.putMethod2('/billClaim/rejected',body).subscribe( data => {
        console.log(data);
        $("#langModalreject").modal("hide");
        alert("Rejected Successfully"); 
        this.getrejectemployee(null,1);
      this.getpendingemployee(null,1);
      this.getapproveemployee(null,1);
      this.approvetorejectModalForms.get("remarks").setValue('');
  
      },err=> {
        this.spinner.hide();
        console.log(err);
      }); 
    }
 

}
