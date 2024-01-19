import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import {Router} from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any;
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
 constructor(
  public apiService:ApiService,
  public router:Router,
  public pagerservice: PagerService,
  private spinner: NgxSpinnerService,) { }
  editforms:FormGroup
  addholiday:FormGroup
  submitted:boolean;
  organisation:any;
  org_dd:any;
  filterorganisation:any
  public modalHeaderText: string = 'Add Holida';
  public modalButtonText: string = 'Save';
  
  showItemActive: number = 10;
  showItemDisable: number = 10;
  active_count: 0
  pager: any = {};
  pagen: any = {};
  disable_count: 0
  pagerdisable: any = {};
  pagendisable: any = {};
  Activeholiday:any

  Disableholiday:any
  empid:any
  typedetials:any
  editdetails:any

  ngOnInit(): void {
    this.getorganisation();
    this.activeholiday(1);
    this.disableholiday(1);


    this.addholiday=new FormGroup({
      holiday_name: new FormControl("", Validators.required),
      holiday_date:new FormControl("",Validators.required),
      organisation:new FormControl("",Validators.required)
   })
   this.editforms= new FormGroup({
    edit_name:new FormControl("",Validators.required),
    edit_date:new FormControl("",Validators.required),
    edit_organisation:new FormControl("",Validators.required)
   })
}

getValue1(val) {
  this.organisation = val;
  console.log("thisssss",this.organisation);
}
getorganisation(){
  let body ={
    "status":["Active"]
  }
  this.apiService.postMethod("/organisation/filter?pageno=no" ,body).subscribe( data => {
    console.log('organisation filter',data);
    this.org_dd = data.response.data.organisation;
  })
}
get fr() {
  return this.addholiday.controls;
}

status(id, type) {
  this.empid=id;
  this.typedetials=type
  
}

sumbitstatus(){
  
  if ( this.typedetials == "enable" ||this.typedetials == "disable") {
    this.spinner.show();
    this.apiService.putMethod("/holidays/status/" + this.typedetials, this.empid).subscribe(
      data => {
        // var result1 = confirm("Are you sure to move?")
        $("#disableModal").modal("hide");    
         $("#activeModal").modal("hide");    

        this.activeholiday( 1);
        this.disableholiday( 1);

      }, err => {
        this.spinner.hide()
        console.log(err)
      }
    )
  }
}
cancelpop(){
 
  this.activeholiday( 1);
  this.disableholiday( 1); 
}

setPage(page: number) {
  if (page < 1 || page > this.pagen.totalPage) {
    return;
  }
  
  this.activeholiday(page);
}
saveActiveItems(number) {
  this.showItemActive = number;
  this.activeholiday(this.pager.currentPage);
}
setPagedisable(page: number) {
  if (page < 1 || page > this.pagendisable.totalPage) {
    return;
  }
  this.disableholiday(page);
}
savedisableItems(number) {
  this.showItemDisable = number;
  this.activeholiday(this.pager.currentPage);
}

public save(){
  this.submitted=true;
  if(this.addholiday.invalid){
    alert("Fill all the Fields")
    return
  }
  
  
  var body={
    "name":this.addholiday.value.holiday_name,
    "date":new Date(this.addholiday.value.holiday_date).toJSON(),
    "organisationId":this.addholiday.value.organisation
  }
    this.apiService.postMethod('/holidays',body).subscribe(data =>{
      alert("Added Successfully")
       $("#add_holiday").modal("hide");
       this.activeholiday(1);
       this.addholiday.reset()
    })
  }
  search(){
 this.activeholiday(1)
  }

  public activeholiday(pageno){
    var body=
    {"status":["Active"],
     "organisationId":this.filterorganisation?[this.filterorganisation]:[],
     "dataAccess":{"isAccess":true,
                   "userName":"admin"},
     "sortBy":"name",
     "sortOrder":1
    }

     this.apiService.postMethod("/holidays/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data=>{
      this.Activeholiday = data.response.data.Holidays;
      console.log("kiki",this.Activeholiday);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (! this.Activeholiday.length)) {
        this.activeholiday( pageno - 1)
      }
     })
    }

public disableholiday(pageno){
  var body=
  {
    "status":["Disabled"],
    "organisationId":this.filterorganisation?[this.filterorganisation]:[],
    "dataAccess":{"isAccess":true,
                  "userName":"admin"},
    "sortBy":"name",
    "sortOrder":1
  }
  this.apiService.postMethod("/holidays/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, body).subscribe(data=>{
 this.Disableholiday = data.response.data.Holidays;
      console.log("kiki",this.Disableholiday);
      this.disable_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (! this.Disableholiday.length)) {
        this.disableholiday( pageno - 1)
      }
  }, err => {
    this.spinner.hide();
    console.log(err);
   })
  }

  public editupdate(id,edit){
this.apiService.getMethod2('/holidays',id).subscribe(data =>{
  this.editdetails=data.response.data.Holidays
  this.editforms.get("edit_name").setValue(this.editdetails.name);
  this.editforms.get("edit_date").setValue(this.apiService.getDate1(this.editdetails.date));
  this.editforms.get("edit_organisation").setValue(this.editdetails.organisationId);

})

  }

  updateholday(){
    if(this.editforms.invalid){
      alert("Fill all the Fields")
      return
    }
    let body={
      "name":this.editforms.value.edit_name,
     "date":new Date(this.editforms.value.edit_date).toJSON(),
     "organisationId":this.editforms.value.edit_organisation,
     "uniqueId":this.editdetails.uniqueId
    }
    this.apiService.putMethod2('/holidays',body).subscribe(data =>{
      alert("Update Successfully")
      $("#edit_holiday").modal("hide");
      this.activeholiday(1);
      this.disableholiday(1);
      this.editforms.reset()
    })

  }

  delete(){
    if (this.typedetials === 'Deleted') {
        this.spinner.show();
        this.apiService.deleteMethod1('/holidays/status/delete', this.empid).subscribe(
          data => {
            $("#delete_holiday").modal("hide");  
  
          this.activeholiday( 1);
          this.disableholiday( 1);
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } 
    }
}
