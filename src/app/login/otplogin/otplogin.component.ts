import { DataSharingServiceService } from './../../service/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../services/api.service';
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-otplogin',
  templateUrl: './otplogin.component.html',
  styleUrls: ['./otplogin.component.css']
})
export class OtploginComponent implements OnInit {

  resetpasswordotpForm: FormGroup;
  otpSubmitted: boolean = false;
  user: any;
  otp: any;
  userObj:any;
  otpsubmitted: boolean = false
  errorVal: any;
  isLoading=false;
  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService,
    private dataSharingService: DataSharingServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.resetpasswordotpForm = this.formBuilder.group({
      resetPassword: ["", Validators.required]
    })  
  }
  get fa() {
    return this.resetpasswordotpForm.controls;
  }

  submitLogin() {
    if (this.resetpasswordotpForm.invalid) {
      this.otpsubmitted = true
      return
    }
    
  }

  resetpasswordOtp(){
    this.user = sessionStorage.username
    this.otp = this.resetpasswordotpForm.value.resetPassword; 
    if(this.resetpasswordotpForm.invalid){
      this.otpSubmitted = true
      return
    }
    this.otpSubmitted = false
    this.apiService.getMethod4("/user/forgetpassword/validateotp?username=" + this.userObj.userName + "&otp=" + this.otp).subscribe
        (data =>{
            console.log("validateOTP", data)
            
             if(data.response.statusCode == 200)
            {
              sessionStorage.setItem("userName", this.user)
              sessionStorage.setItem("token", data.response.data.token)
              this.router.navigate(['/login/resetpassword'])
            } 
            else{
              this.errorVal = data.response.message;
              this.isLoading = false;
            }
          }, 
          err =>{
            this.errorVal = err.error.response.message
          })
  }
}
