import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-orgbranch',
  templateUrl: './orgbranch.component.html',
  styleUrls: ['./orgbranch.component.css']
})
export class OrgbranchComponent implements OnInit {
  public term: any;
  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
  public branchDetails: any = [];
  public branch: any = [];
  public branchCount: number;
  public filteredData: any = [];
  public branchModalForms: FormGroup;
  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatus: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  public modalHeaderText: string = 'New branch';
  public modalButtonText: string = 'Save';
  public modal_data: any;
  public Submitted: boolean;
  public saveData: any;
  branchdisableDetails
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
  organisation:any;
  typedetials:any;
  userObj:any;
  empid:any;
  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.getorganisation();
    this.getbranch(null, 1);
    this.getdisablebranch(null, 1);
    this.branchModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
      'organisation':new FormControl("", Validators.required)
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
  // getorg(id){ 
  //   console.log("eeeeeeeee",id)
  //   let body ={
  //     "status":["Active"],
  //     "organisationId":[id]
  //   }
  //   this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      
  //     this.org_dd = data.response.data.organisation;
  //   })
  // }
  get fr() {
    return this.branchModalForms.controls;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getbranch(null, page);
  }

  saveActiveItems(number) {
    this.showItemActive = number;
    this.getbranch(null, this.pager.currentPage);
  }

  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }
    this.getdisablebranch(null, page);
  }

  savedisableItems(number) {
    this.showItemDisable = number;
    this.getdisablebranch(null, this.pagerdisable.currentPage);
  }

  search() {
    this.getdisablebranch(this.term, 1)
    this.getbranch(this.term, 1)
    this.spinner.hide();
  }
  /*Enable & Disable Pop Up*/

 status(id, type) {
  this.empid=id;
  this.typedetials=type
  
}

sumbitstatus(){
  
  if (this.typedetials == 'enable' || this.typedetials == "disable") {
    this.spinner.show();
    this.apiService.putMethod("/Branch/status/" + this.typedetials, this.empid).subscribe(
      data => {
        // var result1 = confirm("Are you sure to move?")
        $("#disableModal").modal("hide");    
         $("#activeModal").modal("hide");    

        this.getbranch(null, 1);
        this.getdisablebranch(null, 1);

      }, err => {
        this.spinner.hide()
        console.log(err)
      }
    )
  }
}
delete(){
  if (this.typedetials === 'Deleted') {
      this.spinner.show();
      this.apiService.deleteMethod1('/Branch/status/delete', this.empid).subscribe(
        data => {
          $("#deleteModal").modal("hide");  

        this.getbranch(null, 1);
        this.getdisablebranch(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    } 
  }

cancelpop(){
 
  this.getbranch(null, 1);
  this.getdisablebranch(null, 1); 
}
/*/Enable & Disable Pop Up*/





  public getbranch(search, pageno) {
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
    this.apiService.postMethod("/Branch/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.branchDetails = data.response.data.Branch;
      console.log("kiki",this.branchDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.branchDetails.length)) {
        this.getbranch(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getdisablebranch(search, pageno) {
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
    this.apiService.postMethod("/Branch/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, body).subscribe(data => {
      this.spinner.hide();
      this.branchdisableDetails = data.response.data.Branch;
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.branchdisableDetails.length)) {
        this.getdisablebranch(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }


  public setStatus(e, type) {
    if (type === 'Edit') {
      
      this.edit_id = e;
      this.modalHeaderText = 'Edit Branch';
      this.modalButtonText = 'Update';
      this.spinner.show();
      this.apiService.getMethod2('/Branch', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.Branch;
        this.branchModalForms.get("name").setValue(this.modal_data.name);
        this.branchModalForms.get("description").setValue(this.modal_data.description);
         this.branchModalForms.get("organisation").setValue(this.modal_data.organisationId);
        // this.branchModalForms.controls['organisation'].setValue(this.modal_data.organisationId);
        
      }, err => {
        console.log(err);
      });
    }
    else if (type === 'View') {
      this.edit_id = e;
      this.modalHeaderText = 'View Branch';
    
      this.spinner.show();
      this.apiService.getMethod2('/Branch', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.Branch;
        this.branchModalForms.get("name").setValue(this.modal_data.name);
        this.branchModalForms.get("description").setValue(this.modal_data.description);
        this.branchModalForms.get("organisation").setValue(this.modal_data.organisationId);

      }, err => {
        console.log(err);
      });
    }
  }

  public addbranch(type) {
  
//     this.Submitted = true;
//     if(this.branchModalForms.invalid){
//     alert("Fill all the Fields")
//    console.log("working");
//    console.log("Form Data ", this.branchModalForms.controls)
//    return
//  }
    if(this.branchModalForms.invalid){
      alert("Fill all fields")
      console.log("consoleeeeee",this.branchModalForms)
      this.Submitted = false
      return
    }
    this.Submitted = true;
    if (type === 'Save') {
      let body = {
        "name": this.branchModalForms.controls.name.value,
        "description": this.branchModalForms.controls.description.value,
        "organisationId":this.branchModalForms.controls.organisation.value,
      }
      this.spinner.show();
      this.apiService.postMethod('/Branch', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getbranch(null, 1);
        this.getdisablebranch(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
     } else if (type === 'Update') {
      let body = {
        "name": this.branchModalForms.controls.name.value,
        "description":this.branchModalForms.controls.description.value,
        "organisationId":this.branchModalForms.controls.organisation.value,
        "uniqueId": this.modal_data.uniqueId,
      }
      console.log(body);
      this.spinner.show();
      this.apiService.putMethod2('/Branch', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getbranch(null, 1);
        this.getdisablebranch(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    }
   
  }

  public openNewModal() {
    this.modalButtonText = 'Save';
    this.modalHeaderText = 'Add branch';
    this.branchModalForms.get("name").setValue('');
    this.branchModalForms.get("description").setValue('');
    this.branchModalForms.get("organisation").setValue('');

  }
}
