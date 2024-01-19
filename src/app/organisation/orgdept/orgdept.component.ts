import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
import { getValueInRange } from '@ng-bootstrap/ng-bootstrap/util/util';
declare var $:any;
@Component({
  selector: 'app-orgdept',
  templateUrl: './orgdept.component.html',
  styleUrls: ['./orgdept.component.css']
})
export class OrgdeptComponent implements OnInit {

  public term: any;
  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
  public departmentDetails: any = [];
  public department: any = [];
  public departmentCount: number;
  public filteredData: any = [];
  public departmentModalForms: FormGroup;
  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatus: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  public modalHeaderText: string = 'New department';
  public modalButtonText: string = 'Save';
  public modal_data: any;
  public modal_data1: any;
  public Submitted: boolean;
  public saveData: any;
  departmentdisableDetails
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
  branch_dd:any;
  typedetials:any;
  branchdrop:any
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
    
    // this.getbranch(1);
    this.getdepartment(null, 1);
    this.getdisabledepartment(null, 1);
    this.departmentModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl(""),
      'orgdrop':new FormControl("", Validators.required),
      'branchdrop':new FormControl("", Validators.required),
    });
   
  }
  getValue(val) {
    this.branchdrop = val;
    console.log("thisssss",this.branchdrop);
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
      
      this.org_dd = data.response.data.organisation;
    })
  }
  getbranch(id:string){ 
    console.log("DDDd",id)
    let body ={
      "status":["Active"],
       "organisationId":[id],
       
    }
    this.apiService.postMethod("/Branch/filter?pageno=no" ,body).subscribe( data => {
      
      this.branch_dd = data.response.data.Branch;
    })
  }


  get fr() {
    return this.departmentModalForms.controls;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getdepartment(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getdepartment(null, this.pager.currentPage);
  }
  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }
    this.getdisabledepartment(null, page);
  }
  savedisableItems(number) {
    this.showItemDisable = number;
    this.getdisabledepartment(null, this.pagerdisable.currentPage);
  }
  search() {
    this.getdisabledepartment(this.term, 1)
    this.getdepartment(this.term, 1)
    this.spinner.hide();
  }

  // if (type === 'Deleted') {
  //   this.id = e;
  //   var result = confirm("Are you sure to delete?");
  //   if (result) {
  //     this.spinner.show();
  //     this.apiService.deleteMethod1('/Department/status/delete', this.id).subscribe(data => {
  //       this.spinner.hide();
  //       console.log(data);
  //       this.getdepartment(null, 1);
  //       this.getdisabledepartment(null, 1);
  //     }, err => {
  //       this.spinner.hide();
  //       console.log(err);
  //     });
  //   } return;
  // }
  status(id, type) {
    this.empid=id;
    this.typedetials=type
    
  }

  sumbitstatus(){
  
    if (this.typedetials == 'enable' || this.typedetials == "disable") {
      this.spinner.show();
      this.apiService.putMethod("/Department/status/" + this.typedetials, this.empid).subscribe(
        data => {
          // var result1 = confirm("Are you sure to move?")
          $("#disableModal").modal("hide");    
           $("#activeModal").modal("hide");    
  
          this.getdepartment(null, 1);
          this.getdisabledepartment(null, 1);
  
        }, err => {
          this.spinner.hide()
          console.log(err)
        }
      )
    }
  }
  delete(){
    
    if (this.typedetials == 'Deleted') {
        this.spinner.show();
        this.apiService.deleteMethod1('/Department/status/delete', this.empid).subscribe(
          data => {
            $("#deleteModal").modal("hide");  
  
            this.getdepartment(null, 1);
            this.getdisabledepartment(null, 1);
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } 
    }
  
  cancelpop(){
   
    this.getdepartment(null, 1);
          this.getdisabledepartment(null, 1);
  }
  


  public getdepartment(search, pageno) {
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
    this.apiService.postMethod("/Department/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.departmentDetails = data.response.data.Department;
      console.log("kiki",this.departmentDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.departmentDetails.length)) {
        this.getdepartment(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getdisabledepartment(search, pageno) {
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
    this.apiService.postMethod("/Department/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, body).subscribe(data => {
      this.spinner.hide();
      this.departmentdisableDetails = data.response.data.Department;
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.departmentdisableDetails.length)) {
        this.getdisabledepartment(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }


  public setStatus(e, type) {
    if (type === 'Edit') {
      this.edit_id = e;
      this.modalHeaderText = 'Edit Department';
      this.modalButtonText = 'Update';
      this.spinner.show();
      this.apiService.getMethod2('/Department', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.Department;
        this.getbranch(this.modal_data.organisationId)
        this.departmentModalForms.get("name").setValue(this.modal_data.name);
        this.departmentModalForms.get("description").setValue(this.modal_data.description);
        this.departmentModalForms.get("orgdrop").setValue(this.modal_data.organisationId);
        this.departmentModalForms.get("branchdrop").setValue(this.modal_data.ref.branch.uniqueId);
        console.log("",data)
        
      }, err => {
        console.log(err);
      });
    }
    else if (type === 'View') {
      this.edit_id = e;
      this.modalHeaderText = 'View Department';
    
      this.spinner.show();
      this.apiService.getMethod2('/Department', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.Department;
        this.getbranch(this.modal_data.organisationId)
        this.departmentModalForms.get("name").setValue(this.modal_data.name);
        this.departmentModalForms.get("description").setValue(this.modal_data.description);
        this.departmentModalForms.get("orgdrop").setValue(this.modal_data.organisationId);
        this.departmentModalForms.get("branchdrop").setValue(this.modal_data.ref.branch.uniqueId)
      }, err => {
        console.log(err);
      });
    }
  }

  public adddepartment(type) {
    this.Submitted = true;
    if(this.departmentModalForms.invalid){
    alert("Fill all the Fields")
   console.log("working");
   console.log("Form Data ", this.departmentModalForms.controls)
   return
 }
    if (this.departmentModalForms.invalid) {
      console.log("error",this.departmentModalForms.errors);
      return;
    }
    if (type === 'Save') {
      let body = {
        "name": this.departmentModalForms.controls.name.value,
        "description": this.departmentModalForms.controls.description.value,
        "organisationId":this.departmentModalForms.controls.orgdrop.value,
        "branch":this.departmentModalForms.controls.branchdrop.value,
      }
      this.spinner.show();
      this.apiService.postMethod('/Department', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getdepartment(null, 1);
        this.getdisabledepartment(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
     } else if (type == 'Update') {
      let body = {
        "name": this.departmentModalForms.controls.name.value,
        "description":this.departmentModalForms.controls.description.value,
        "organisationId":this.departmentModalForms.value.orgdrop.value,
        "uniqueId": this.modal_data.uniqueId,
        "branch":this.departmentModalForms.controls.branchdrop.value,
      }
      console.log(body);
      this.spinner.show();
      this.apiService.putMethod2('/Department', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getdepartment(null, 1);
        this.getdisabledepartment(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    }
   
  }

  public openNewModal() {
    this.modalButtonText = 'Save';
    this.modalHeaderText = 'Add department';
    this.departmentModalForms.get("name").setValue('');
    this.departmentModalForms.get("description").setValue('');
    this.departmentModalForms.get("orgdrop").setValue('');
    this.departmentModalForms.get("branchdrop").setValue('');
  }
}
