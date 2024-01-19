import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { PagerService } from "../../services/pager.service";
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-admin-attendance',
  templateUrl: './admin-attendance.component.html',
  styleUrls: ['./admin-attendance.component.css']
})
export class AdminAttendanceComponent implements OnInit {

  month: any;
  year: any;
  attedance;
  public term: any;
  showItemActive: number = 10;
  userObj: any;
  pageractive: any = {};
  pagenactive: any = {};
  active_count: 0
  getactivity: any;
  attedancedatelist: any = []
  showItemActiveEmp: number = 10;
  pageractiveemp: any = {};
  pagenactiveemp: any = {};
  activeemp_count: 0
  getapplication: any = {};
  constructor(public apiService: ApiService, public pageservice: PagerService, private readonly router: Router) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));

    let year = new Date().getFullYear()

    let curentdate = new Date().getMonth() + 1
    console.log("date", curentdate)
    this.month = this.prependZero(curentdate)
    console.log("date", this.month)
    this.year = new Date().getFullYear()
    this.search(1)

  }
  prependZero(number) {
    if (number < 9)
      return "0" + number;
    else
      return "" + number;
  }
  setPageactiveemp(page: number) {
    if (page < 1 || page > this.pagenactiveemp.totalPage) {
      return;
    }
    this.search(page);
  }
  documentexcel() {
    let date = new Date().getDate()
    date = 5
    let body = {
      "startDate": new Date(this.year + '-' + this.month + '-' + date).toJSON(),
      //"manager":this.userObj.uniqueId,
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "manager": this.userObj.userName,

    }
    this.apiService.downloadReport("/attendance/employeedaywisereport?resType=reportexcel", body).subscribe((data: any) => {
      saveAs(data, 'attendance.xlsx')
    })

  }
  saveactiveempItems(number) {
    this.showItemActiveEmp = number;
    this.search(this.pageractiveemp.currentPage);
  }
  search(pageno) {
    let date = new Date().getDate()
    date = 5
    let month = new Date(this.year + '-' + this.month + '-' + date).toJSON()
    console.log("month", month)
    sessionStorage.setItem('month', this.month);
    sessionStorage.setItem('year', this.year);
    let body = {
      searchBox: {
        name: this.term
      },
      "startDate": new Date(this.year + '-' + this.month + '-' + date).toJSON(),
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "sortBy": "name",
      "sortOrder": 1,
      "manager": this.userObj.userName,

    }
    this.attedancedatelist = []
    this.apiService.postMethod("/attendance/employeedaywisereport?pageno=" + pageno + "&limit=" + this.showItemActiveEmp, body).subscribe(
      data => {
        this.attedance = data.response.data.employee
        this.activeemp_count = data.response.data.pagination.count;
        this.pagenactiveemp.totalUsers = data.response.data.pagination.count;
        this.pagenactiveemp.totalPage = data.response.data.pagination.totalPage;
        this.pagenactiveemp.currentPage = data.response.data.pagination.pageNum;
        this.pageractiveemp = this.pageservice.getPager(this.pagenactiveemp.totalUsers, pageno, this.showItemActiveEmp);
        if ((pageno > 1) && (!this.attedance.length)) {
          this.search(pageno - 1)
        }
        for (let i = 0; i <= this.attedance.length; i++) {
          for (let j = 0; j <= this.attedance[i].days.length; j++) {
            var datee = this.attedance[i].days[j].dates
            this.attedancedatelist.push(datee)
            console.log("GGGGGGGGGGG", this.attedancedatelist)


            // if(this.attedance[i].days[j].date)
          }
        }

      },
      err => {
        // this.spinner.hide();
      }
    )
  }



  route1(id) {
    sessionStorage.setItem('individualId', JSON.stringify(id))
    this.router.navigate(['/employee/individual_attendance'])
  }
  route2(id) {
    console.log("iddddd==", id)
    this.getapplication = id
    this.getactivity = id.attendance.attandanceLog

    console.log("hello", this.getapplication);
    console.log("this.getactivity", this.getactivity);
  }

  search1() { }


}
