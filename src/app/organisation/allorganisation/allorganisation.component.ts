import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-allorganisation',
  templateUrl: './allorganisation.component.html',
  styleUrls: ['./allorganisation.component.css']
})
export class AllorganisationComponent implements OnInit {
  public term: any;
  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
  public organisationDetails: any = [];
  public organisations: any = [];
  public organisationCount: number;
  public filteredData: any = [];
  public organisationModalForms: FormGroup;
  public organisationviewModalForms: FormGroup;

  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatus: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  public modalHeaderText: string = 'New organisation';
  public modalButtonText: string = 'Save';
  public modal_data: any;
  public Submitted: boolean;
  public Submittedview: boolean;
  public saveData: any;
  organisationdisableDetails
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
  userObj:any;
 
  empid:any;
  typedetials:any
  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    console.log("this.userObj====>",this.userObj.userName)
        this.getorganisations(null, 1);
    this.getdisableorganisations(null, 1);
     this.organisationModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required)
    });

    this.organisationviewModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required)
    });
  }

  get fr() {
    return this.organisationModalForms.controls;
  }
  get frview() {
    return this.organisationModalForms.controls;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getorganisations(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getorganisations(null, this.pager.currentPage);
  }
  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }
    this.getdisableorganisations(null, page);
  }
  savedisableItems(number) {
    this.showItemDisable = number;
    this.getdisableorganisations(null, this.pagerdisable.currentPage);
  }
  search() {
    this.getdisableorganisations(this.term, 1)
    this.getorganisations(this.term, 1)
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
      this.apiService.putMethod("/organisation/status/" + this.typedetials, this.empid).subscribe(
        data => {
          // var result1 = confirm("Are you sure to move?")
          $("#disableModal").modal("hide");    
           $("#activeModal").modal("hide");    

          this.getorganisations(null, 1);
          this.getdisableorganisations(null, 1);

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
        this.apiService.deleteMethod1('/organisation/status/delete', this.empid).subscribe(
          data => {
            $("#deleteModal").modal("hide");  

          this.getorganisations(null, 1);
          this.getdisableorganisations(null, 1);
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } 
    }
  
  cancelpop(){
   
    this.getorganisations(null, 1);
    this.getdisableorganisations(null, 1); 
  }
  /*/Enable & Disable Pop Up*/

  public getorganisations(search, pageno) {
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
    this.apiService.postMethod("/organisation/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
     
      this.organisationDetails = data.response.data.organisation;
      console.log("kiki",this.organisationDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.organisationDetails.length)) {
        this.getorganisations(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getdisableorganisations(search, pageno) {
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
   
    this.apiService.postMethod("/organisation/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, body).subscribe(data => {
      this.spinner.hide();
      this.organisationdisableDetails = data.response.data.organisation;
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.organisationdisableDetails.length)) {
        this.getdisableorganisations(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }


  public setStatus(e, type) {
    // if (type === 'Deleted') {
    //   this.id = e;
    //   // var result = confirm("Are you sure to delete?");
    //   if (type=='Delete') {
    //     this.spinner.show();
    //     this.apiService.deleteMethod1('/organisation/status/delete', this.id).subscribe(data => {
    //       this.spinner.hide();
    //       console.log(data);
    //       $("#disableModal").modal("hide");    

    //       this.getorganisations(null, 1);
    //       this.getdisableorganisations(null, 1);
    //     }, err => {
    //       this.spinner.hide();
    //       console.log(err);
    //     });
    //   } return;
    // }
      if (type === 'Edit') {
      this.edit_id = e;
      this.modalHeaderText = 'Edit Organization';
      this.modalButtonText = 'Update';
      this.spinner.show();
      this.apiService.getMethod2('/organisation', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.organisation;
        this.organisationModalForms.get("name").setValue(this.modal_data.name);
        this.organisationModalForms.get("description").setValue(this.modal_data.description);
      }, err => {
        console.log(err);
      });
    }
    else if (type === 'View') {
      this.edit_id = e;
      this.modalHeaderText = 'View Organisation';
    
      this.spinner.show();
      this.apiService.getMethod2('/organisation', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.organisation;
        this.organisationviewModalForms.get("name").setValue(this.modal_data.name);
        this.organisationviewModalForms.get("description").setValue(this.modal_data.description);
      }, err => {
        console.log(err);
      });
    }
  }


  public addorganisation(type) {
    this.Submitted = true;
    if(this.organisationModalForms.invalid){
    alert("Fill all the Fields")
   console.log("working");
   console.log("Form Data ", this.organisationModalForms.controls)
   return
 }
    if (this.organisationModalForms.invalid) {
      return;
    }
    if (type === 'Save') {
      let body = {
        "name": this.organisationModalForms.controls.name.value,
        "description": this.organisationModalForms.controls.description.value,
      }
      this.spinner.show();
      this.apiService.postMethod('/organisation', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getorganisations(null, 1);
        this.getdisableorganisations(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
     } else if (type == 'Update') {
      this.Submitted = true;
      if(this.organisationModalForms.invalid){
      alert("Fill all the Fields")
     console.log("working");
     console.log("Form Data ", this.organisationModalForms.controls)
     return
   }
      let body = {
        "name": this.organisationModalForms.controls.name.value,
        "description":this.organisationModalForms.controls.description.value,
        "uniqueId": this.modal_data.uniqueId,
      }
      console.log(body);
      this.spinner.show();
      this.apiService.putMethod2('/organisation', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getorganisations(null, 1);
        this.getdisableorganisations(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    }
   
  }

  public openNewModal() {
    this.modalButtonText = 'Save';
    this.modalHeaderText = 'Add Organization';
    this.organisationModalForms.get("name").setValue('');
    this.organisationModalForms.get("description").setValue('');
  }
}
