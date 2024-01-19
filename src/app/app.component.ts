import { DataSharingServiceService } from './service/data-sharing-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LogikoofHRMS';
  loginStatus:boolean=false;

  constructor(private dataSharingService: DataSharingServiceService){
    this.dataSharingService.userDetails.subscribe(value => {
      console.log("user Details", value)
      if (value) {
        this.dataSharingService.isUserLoggedIn.next(true);
      } else if (this.checkLoginStatus()) {
        this.dataSharingService.isUserLoggedIn.next(true);
      }
    });

    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.loginStatus = value;
      console.log("logged in status==>", value);
    });
  } 
  checkLoginStatus(){
    if (localStorage.getItem('isUserLoggedIn')=='true') {
      return true;
    } else {
      return false;
    }
  }
}
