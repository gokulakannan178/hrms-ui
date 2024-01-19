import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  public term: any;
  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
  public designationDetails: any = [];
  public designation: any = [];
  public designationCount: number;
  public filteredData: any = [];
  public desigModalForms: FormGroup;
  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatus: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  public modalHeaderText: string = 'New designation';
  public modalButtonText: string = 'Save';
  public modal_data: any;
  public Submitted: boolean;
  public saveData: any;
  designationdisableDetails
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
  empid:any;
  typedetials:any
  userObj:any;
  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
   this.getorganisation();
    this.getdesignation(null, 1);
    this.getdisabledesignation(null, 1);
    this.desigModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
      'organisation':new FormControl("", Validators.required),
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
    return this.desigModalForms.controls;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getdesignation(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getdesignation(null, this.pager.currentPage);
  }
  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }  
    this.getdisabledesignation(null, page);
  }
  savedisableItems(number) {
    this.showItemDisable = number;
    this.getdisabledesignation(null, this.pagerdisable.currentPage);
  }
  search() {
    this.getdisabledesignation(this.term, 1)
    this.getdesignation(this.term, 1)
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
    this.apiService.putMethod("/designation/status/" + this.typedetials, this.empid).subscribe(
      data => {
        // var result1 = confirm("Are you sure to move?")
        $("#disableModal").modal("hide");    
         $("#activeModal").modal("hide");    

        this.getdesignation(null, 1);
        this.getdisabledesignation(null, 1);

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
      this.apiService.deleteMethod1('/designation/status/delete', this.empid).subscribe(
        data => {
          $("#deleteModal").modal("hide");  

        this.getdesignation(null, 1);
        this.getdisabledesignation(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    } 
  }

cancelpop(){
 
  this.getdesignation(null, 1);
  this.getdisabledesignation(null, 1); 
}
/*/Enable & Disable Pop Up*/

  public getdesignation(search, pageno) {
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
    this.apiService.postMethod("/designation/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.designationDetails = data.response.data.Designation;
      console.log("kiki",this.designationDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.designationDetails.length)) {
        this.getdesignation(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getdisabledesignation(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Disabled"],
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
    this.apiService.postMethod("/designation/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, body).subscribe(data => {
      this.spinner.hide();
      this.designationdisableDetails = data.response.data.Designation;
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.designationdisableDetails.length)) {
        this.getdisabledesignation(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

 
  public setStatus(e, type) {
    if (type === 'Deleted') {
      this.id = e;
      var result = confirm("Are you sure to delete?");
      if (result) {
        this.spinner.show();
        this.apiService.deleteMethod1('/designation/status/delete', this.id).subscribe(data => {
          this.spinner.hide();
          console.log(data);
          this.getdesignation(null, 1);
          this.getdisabledesignation(null, 1);
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } return;
    } else if (type === 'Edit') {
      
      this.edit_id = e;
      this.modalHeaderText = 'Edit Designation';
      this.modalButtonText = 'Update';
      this.spinner.show();
      this.apiService.getMethod2('/designation', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.Designation;
        this.desigModalForms.get("name").setValue(this.modal_data.name);
        this.desigModalForms.get("description").setValue(this.modal_data.description);
         this.desigModalForms.get("organisation").setValue(this.modal_data.organisationId);
        // this.desigModalForms.controls['organisation'].setValue(this.modal_data.organisationId);
        
      }, err => {
        console.log(err);
      });
    }
    else if (type === 'View') {
      this.edit_id = e;
      this.modalHeaderText = 'View Designation';
    
      this.spinner.show();
      this.apiService.getMethod2('/designation', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.Designation;
        this.desigModalForms.get("name").setValue(this.modal_data.name);
        this.desigModalForms.get("description").setValue(this.modal_data.description);
        this.desigModalForms.get("organisation").setValue(this.modal_data.organisationId);

      }, err => {
        console.log(err);
      });
    }
  }

  public adddesig(type) {
  
//     this.Submitted = true;
//     if(this.desigModalForms.invalid){
//     alert("Fill all the Fields")
//    console.log("working");
//    console.log("Form Data ", this.desigModalForms.controls)
//    return
//  }
    if(this.desigModalForms.invalid){
      alert("Fill all fields")
      console.log(this.desigModalForms)
      this.Submitted = false
      return
    }
    this.Submitted = true;
    if (type === 'Save') {
      let body = {
        "name": this.desigModalForms.controls.name.value,
        "description": this.desigModalForms.controls.description.value,

        "organisationId":this.desigModalForms.controls.organisation.value,
      }
      this.spinner.show();
      this.apiService.postMethod('/designation', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getdesignation(null, 1);
        this.getdisabledesignation(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
     } else if (type === 'Update') {
      let body = {
        "name": this.desigModalForms.controls.name.value,
        "description":this.desigModalForms.controls.description.value,
        "organisationId":this.desigModalForms.controls.organisation.value,
        "uniqueId": this.modal_data.uniqueId,
      }
      console.log(body);
      this.spinner.show();
      this.apiService.putMethod2('/designation', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getdesignation(null, 1);
        this.getdisabledesignation(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    }
   
  }

  public openNewModal() {
    this.modalButtonText = 'Save';
    this.modalHeaderText = 'Add Designation';
    this.desigModalForms.get("name").setValue('');
    this.desigModalForms.get("description").setValue('');
    this.desigModalForms.get("organisation").setValue('');

  }

  
  
}