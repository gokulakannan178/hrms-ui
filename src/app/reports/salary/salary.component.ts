import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';




@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  public apiUrl = myGlobals.base_api_url;
  searchForms: FormGroup
  payrolldata: any;
  username: any;
  pageractiveemp: any = {};
  pagenactiveemp: any = {};
  activeemp_count: 0
  activeeBody: any = {};
  showItemActiveEmp: number = 10;
  activeDetails: any;
  roledata: any;
  datafilter: any;
  employee: any
  profileimg: string;
  emplyoeeid: any
  userObj: any

  constructor(public readonly router: Router, public apiService: ApiService, private spinner: NgxSpinnerService, public pagerservice: PagerService) { }

  ngOnInit(): void {
    this.username = JSON.parse(sessionStorage.getItem("userObj"))

    console.log("payr", this.username)
    this.getdesignation();
    // this.getdate();
    this.searchForms = new FormGroup({
      sdate: new FormControl((new Date()).toISOString().substring(0, 10)),
      role_id: new FormControl(""),
      name: new FormControl(""),


    });
    this.datafilter = {
      // status:["Active"],
      // organisationId:[null],
      "startDate": new Date(this.searchForms.controls.sdate.value).toJSON(),
      dataAccess: {
        "isAccess": true,
        "userName": this.username.userName,
      }
    }
    this.getemployee(null, 1);

    // this.getactiveemployee(null, 1);
    console.log("date", this.searchForms)



  }

  viewprofileimg(imguri) {
    this.profileimg = this.apiUrl + imguri
    console.log("prof", this.profileimg);

  }

  getemployee(search, pageno) {


    this.apiService.postMethod("/payroll/list?pageno=" + pageno + "&limit=" + this.showItemActiveEmp, this.datafilter).subscribe(data => {
      this.payrolldata = data.response.data.data
      this.spinner.hide();
      this.viewprofileimg(this.payrolldata.profileImg)
      this.profileimg = this.apiUrl + this.payrolldata.profileImg
      console.log("view", this.profileimg)
      this.activeDetails = data.response.data.data;
      this.activeemp_count = data.response.data.pagination.count;
      this.pagenactiveemp.totalUsers = data.response.data.pagination.count;
      this.pagenactiveemp.totalPage = data.response.data.pagination.totalPage;
      this.pagenactiveemp.currentPage = data.response.data.pagination.pageNum;
      this.pageractiveemp = this.pagerservice.getPager(this.pagenactiveemp.totalUsers, pageno, this.showItemActiveEmp);
      if ((pageno > 1) && (!this.activeDetails.length)) {
        this.getemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });

  }

  setPagepayrolleemp(page: number) {
    if (page < 1 || page > this.pagenactiveemp.totalPage) {
      return;
    }
    this.getemployee(null, page);
  }
  saveactiveempItems(number) {
    this.showItemActiveEmp = number;
    this.getactiveemployee(null, this.pageractiveemp.currentPage);
  }
  public getactiveemployee(search, pageno) {
    this.spinner.show();


    // this.apiService.postMethod("/payrolllog/filter?pageno=" + pageno + "&limit=" + this.showItemActiveEmp,  this.activeeBody).subscribe(data => {
    //   this.spinner.hide();

    //   this.activeDetails = data.response.data.data;
    //   this.activeemp_count = data.response.data.pagination.count;
    //   this.pagenactiveemp.totalUsers = data.response.data.pagination.count;
    //   this.pagenactiveemp.totalPage = data.response.data.pagination.totalPage;
    //   this.pagenactiveemp.currentPage = data.response.data.pagination.pageNum;
    //   this.pageractiveemp = this.pagerservice.getPager(this.pagenactiveemp.totalUsers, pageno, this.showItemActiveEmp);
    //   if ((pageno > 1) && (!this.activeDetails.length)) {
    //     this.getactiveemployee(null, pageno - 1)
    //   }
    // }, err => {
    //   this.spinner.hide();
    //   console.log(err);
    // }); 
  }
  getdesignation() {
    let body = {
      status: ["Active"],
      // organisationId:[null],
      dataAccess: {
        "isAccess": true,
        "userName": this.username.userName,
      }
    }
    this.apiService.postMethod("/designation/filter?pageno=no", body).subscribe(data => {
      this.roledata = data.response.data.Designation;
    })
  }
  // getdate(){
  //   const date = new Date().toJSON();

  //   // let day = date.getDate();
  //   // let month = date.getMonth() + 1;
  //   // let year = date.getFullYear();
  //   // let whole=day+'-'+month+'-'+year
  //   this.searchForms.controls['sdate'].setValue( this.apiService.getDate1(date));

  //   // console.log("date",whole)
  // }
  search() {
    this.datafilter = {
      regex: {
        employeeName: this.searchForms.controls.name.value
      },
      designationId: this.searchForms.controls.role_id.value ? [this.searchForms.controls.role_id.value] : [],
      startDate: new Date(this.searchForms.controls.sdate.value).toJSON()
    }
    this.getemployee(null, 1)
  }

  reset() {
    // this.searchForms.reset();
    this.searchForms.controls.name.reset()
    this.searchForms.controls.role_id.reset(),
      this.searchForms.controls.sdate.setValue((new Date()).toISOString().substring(0, 10))


    this.datafilter = {
      // status:["Active"],
      // organisationId:[null],
      "startDate": new Date(this.searchForms.controls.sdate.value).toJSON(),
      dataAccess: {
        "isAccess": true,
        "userName": this.username.userName,
      }
    }
    this.getemployee(null, 1);

  }
  useraction(type, id) {

    if (type == 'view') {
      sessionStorage.setItem("empid", id)
    }

  }
  generate(slip) {
    sessionStorage.setItem("payslip", JSON.stringify(slip))
  }

}
