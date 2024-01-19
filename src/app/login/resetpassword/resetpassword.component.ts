import { DataSharingServiceService } from './../../service/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../services/api.service';
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetpasswordForm:FormGroup
  updatepassword: any
  newpassSubmitted: boolean = false;
  username: any;
  userObj:any;
  
  errorVal: any;
   isLoading=false;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService,
    private dataSharingService: DataSharingServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
    this.resetpasswordForm = this.formBuilder.group({
      resetPassword: ["", Validators.required],
      resetPasswordcheck:["",Validators.required],
    }) 
  }
  get fa() {
    return this.resetpasswordForm.controls;
  }

  submitLogin() {
    if (this.resetpasswordForm.invalid) {
      this.newpassSubmitted = true
      return
    }
  }

  resetpassword(){
    this.updatepassword = this.resetpasswordForm.value.resetPassword;
    if(this.resetpasswordForm.invalid){
      this.newpassSubmitted = true
      return
    }

    this.username = sessionStorage.userName
    this.newpassSubmitted = false
    if(this.resetpasswordForm.value.resetPassword == this.resetpasswordForm.value.resetPasswordcheck){
      let body ={
        "userName": this.userObj.userName,
        "password": this.updatepassword,
        // "token": sessionStorage.token,
        "token": "9999",
      }
      console.log("Updatepassword Body",body)
      this.apiService.putMethod2("/user/forgetpassword/newpassword", body).subscribe(
        data =>{
            console.log("Updated Response", data)
            if (data.response.statusCode == 500) {
  
              this.errorVal = data.response.message
    
            }
            else if(data.response.statusCode == 200){
              alert("Password Updated Successfully")
              this.router.navigate(['/login'])
            }
            else{
              // alert(data.response.statusCode + "Password Updation Failed")
              this.errorVal = data.response.message;
              this.isLoading = false;
            }
        }, err =>{
          console.log(err)
        }
      )

    }
    else{
      alert("Check your password");
    }
   
  }

}
