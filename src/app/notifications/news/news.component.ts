import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
 import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public term: any;

  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
  public newsDetails: any = [];
  public news: any = [];
  public newsCount: number;
  public filteredData: any = [];
  public newsModalForms: FormGroup;
  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatus: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  public modalHeaderText: string = 'New news';
  public modalButtonText: string = 'Save';
  public modal_data: any;
  public Submitted: boolean;
  public saveData: any;
  newsdisableDetails
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

  organisation:any;
  org_dd:any;
 newtype:any;
 newsid:any


  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }

  ngOnInit(): void {
    

    this.getnews(null, 1);
    this.getdisablenews(null, 1);
    this.getorganisation();
    this.newsModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required),
      'organisation':new FormControl("",Validators.required)
    });
  
  }
  getorganisation(){
    let body ={
      "status":["Active"]
    }
    this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
      console.log('States',data);
      this.org_dd = data.response.data.organisation;
    })
  }
  
  getValue(val) {
    this.organisation = val;
    console.log("thisssss",this.organisation);
  }
  get fr() {
    return this.newsModalForms.controls;
  }
  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getnews(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getnews(null, this.pager.currentPage);
  }
  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }
    this.getdisablenews(null, page);
  }
  savedisableItems(number) {
    this.showItemDisable = number;
    this.getdisablenews(null, this.pagerdisable.currentPage);
  }
  search() {
    this.getdisablenews(this.term, 1)
    this.getnews(this.term, 1)
    this.spinner.hide();
  }
  status(id, type) {
   this.newtype=type
   this.newsid=id
    }
    movetodisable(){
      if (this.newtype == 'enable' || this.newtype == "disable") {
        this.spinner.show();
        this.apiService.putMethod("/news/status/" + this.newtype, this.newsid).subscribe(
          data => {
            $("#disableModal").modal("hide");    
            $("#activeModal").modal("hide");   
            this.getnews(null, 1);
            this.getdisablenews(null, 1);
           
  
          }, err => {
            this.spinner.hide()
            console.log(err)
          }
        )
        }
    }

  public getnews(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Active"],
      "sortBy": "title",
      "sortOrder": 1,
      
      
    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          title: search
        }
      }
    }
    this.apiService.postMethod("/news/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.newsDetails = data.response.data.News;
      console.log("kiki",this.newsDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.newsDetails.length)) {
        this.getnews(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public getdisablenews(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Disabled"],
      "sortBy": "title",
      "sortOrder": 1,
      
      
    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          title: search
        }
      }
    }
    this.apiService.postMethod("/news/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, body).subscribe(data => {
      this.spinner.hide();
      this.newsdisableDetails = data.response.data.News;
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.newsdisableDetails.length)) {
        this.getdisablenews(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  delete(){
    this.apiService.deleteMethod1('/news/status/delete', this.id).subscribe(data => {
      this.spinner.hide();
      console.log(data);
    $("#deleteModal").modal('hide')

      this.getnews(null, 1);
      this.getdisablenews(null, 1);
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }


  public setStatus(e, type) {
    if (type === 'Deleted') {
      this.id = e;
    $("#deleteModal").modal('show')

      return;
    } else if (type === 'Edit') {
      this.edit_id = e;
      this.modalHeaderText = 'Edit news';
      this.modalButtonText = 'Update';
      this.spinner.show();
      this.apiService.getMethod2('/news', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.News;
        this.newsModalForms.get("name").setValue(this.modal_data.title);
        this.newsModalForms.get("description").setValue(this.modal_data.message);
        this.newsModalForms.get("organisation").setValue(this.modal_data.organisationId);

      }, err => {
        console.log(err);
      });
    }
    else if (type === 'View') {
      this.edit_id = e;
      this.modalHeaderText = 'View news';
    
      this.spinner.show();
      this.apiService.getMethod2('/news', this.edit_id).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        this.modal_data = data.response.data.News;
        this.newsModalForms.get("name").setValue(this.modal_data.title);
        this.newsModalForms.get("description").setValue(this.modal_data.message);
        this.newsModalForms.get("organisation").setValue(this.modal_data.organisationId);

      }, err => {
        console.log(err);
      });
    }
  }
  

  public addnews(type) {
    this.Submitted = true;
    if(this.newsModalForms.invalid){
    alert("Fill all the Fields")
   console.log("working");
   console.log("Form Data ", this.newsModalForms.controls)
   return
 }
    if (this.newsModalForms.invalid) {
      return;
    }
    if (type === 'Save') {
      let body = {
        "title": this.newsModalForms.controls.name.value,
        "message": this.newsModalForms.controls.description.value,   
        "organisationId":this.newsModalForms.controls.organisation.value,
      
      }  
      this.spinner.show();
      this.apiService.postMethod('/news', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        alert("Added Successfully")
        this.getnews(null, 1);
        this.getdisablenews(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
     } else if (type == 'Update') {
      this.Submitted = true;
      if(this.newsModalForms.invalid){
      alert("Fill all the Fields")
     console.log("working");
     console.log("Form Data ", this.newsModalForms.controls)
     return
   }
      let body = {
        "title": this.newsModalForms.controls.name.value,
        "message":this.newsModalForms.controls.description.value,
        "organisationId":this.newsModalForms.controls.organisation.value,
        "uniqueId": this.modal_data.uniqueId,
      }
      console.log(body);
      this.spinner.show();
      this.apiService.putMethod2('/news', body).subscribe(data => {
        this.spinner.hide();
        console.log(data);
        $("#langModal").modal("hide");
        this.getnews(null, 1);
        this.getdisablenews(null, 1);
      }, err => {
        this.spinner.hide();
        console.log(err);
      });
    }
   
  }

  public openNewModal() {
    this.modalButtonText = 'Save';
    this.modalHeaderText = 'Add news';
    this.newsModalForms.get("name").setValue('');
    this.newsModalForms.get("description").setValue('');
    this.newsModalForms.get("organisation").setValue('');
  }
}
