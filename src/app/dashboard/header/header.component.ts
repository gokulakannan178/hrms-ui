import { JSDocCommentStmt } from '@angular/compiler';
import { DataSharingServiceService } from './../../service/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;
import * as myGlobals from '../../shared/globals';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public apiUrl = myGlobals.base_api_url;
  userId: String;
  clockInButton = "Clock In"
  clockTitle = "Click to Clock IN"
  toggle: boolean = false
  userObj: any;
  user: any;
  emplyoeeid: any
  emplyoee: any
  usertype: any;
  shownotification: any
  objectKeys: any
  profileimage: any = {}
  linmanagercheck: string = "false"
  badge: number = 0

  constructor(private router: Router, public apiService: ApiService, private dataSharingService: DataSharingServiceService) {

    this.dataSharingService.profilepic.subscribe(value => {

      if (value == '' || value == null) {
        if (this.profileimage.gender == 'Male') {
          this.profileimage.profileImg = '../../../assets/img/profile_male.png';
        } else if (this.profileimage.gender == 'Female') {
          this.profileimage.profileImg = '../../../assets/img/profile_female.png';
        }

      } else {
        console.log("Profile pic changed1", value);

        this.profileimage.profileImg = myGlobals.base_api_url + value
      }

    })
  }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.userObj)
    // JSON.stringify
    // const userDetails = sessionStorage.userObj
    this.usertype = JSON.parse(sessionStorage.userObj)
    console.log("yyyyyyyyyyyyyyy", this.usertype)
    this.emplyoeeid = this.userObj.userName
    console.log("User Details In header", this.userObj)
    this.userId = this.usertype.employeeId

    // this.userId = userDetails.employeeId
    console.log("hello", this.userId)

    this.linmanagercheck = sessionStorage.getItem("linemangerid")
    console.log("line", this.linmanagercheck)

    this.apiService.getUserACL()
    this.getsingle()
    this.notification()
  }

  notification() {
    let body = {
      "status": ["Active"],
      "userName": [this.userObj.userName]
    }
    this.apiService.postMethod("/notificationLog/filter?pageno=no", body).subscribe(data => {
      this.shownotification = data.response.data.notificationlog
      console.log("noti")
      for (let i = 0; i < this.shownotification.length; i++) {
        console.log("noti", i + 1)
        this.badge = i + 1
        console.log("bad", this.badge)
      }
    })
  }

  logoutFun() {
    console.log("working ", localStorage.isUserLoggedIn);
    localStorage.setItem("isUserLoggedIn", "false");
    this.dataSharingService.isUserLoggedIn.next(false);
    sessionStorage.removeItem('useracl');
    sessionStorage.removeItem("linemangerid");
    this.dataSharingService.userDetails.next('');
    this.router.navigate(['/login']);
  }
  getsingle() {
    this.apiService.getMethod2("/employee", this.emplyoeeid).subscribe(
      data => {
        this.emplyoee = data.response.data.data.name
        this.profileimage = data.response.data.data

        console.log("AAA", this.emplyoee)
        console.log("dhgdhdh", this.profileimage)
        this.dataSharingService.profilepic.next(this.profileimage.profileImg)

        // alert("AA")
        // if (this.profileimage.profileImg == '') {
        //   if(this.profileimage.gender == 'male'){
        //     this.profileimage.profileImg = '../../../assets/img/profile_male.png';
        //   }else if(this.profileimage.gender == 'female'){
        //     this.profileimage.profileImg = '../../../assets/img/profile_female.png';
        // }
        // }
        // else{
        //   this.dataSharingService.profilepic.subscribe(value => {
        //     console.log("Profile pic changed4", value);
        //     this.profileimage.profileImg = myGlobals.base_api_url + value

        //   })
        // }

      })
  }

  clockInAndOut() {

    let body = {
      "employeeId": this.userId
    }
    if (this.clockInButton == 'Clock In') {
      this.apiService.postMethod('/attendance/login', body).subscribe(data => {
        if (data.response.statusCode == 200) {
          this.clockInButton = "Clock Out"
          this.clockTitle = "Click to Clock Out"
          this.toggle = true
        }
      })
    } else if (this.clockInButton == 'Clock Out') {
      this.apiService.putMethod2('/attendance/logout', body).subscribe(data => {
        if (data.response.statusCode == 200) {
          this.clockInButton = "Clock In"
          this.clockTitle = "Click to Clock In"
          this.toggle = false
        }
      })
    }
  }


}
$(".menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});
// -------multilevel-accordian-menu---------
