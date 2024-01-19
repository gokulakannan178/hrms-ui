import { DataSharingServiceService } from './../../service/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../services/api.service';
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changepasswordForm:FormGroup
  updatepassword: any
  newpassSubmitted: boolean = false;
  username: any;
  userObj:any;
  public fieldTextType: boolean
  public fieldTextType1: boolean
  public fieldTextType2: boolean
  errorVal: any;
   isLoading=false;

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService,
    private dataSharingService: DataSharingServiceService, private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
      this.userObj= JSON.parse(sessionStorage.getItem('userObj'))
      this.changepasswordForm = this.formBuilder.group({
        password: ["", Validators.required],
        newpassword:["",Validators.required],
        rechecknewpassword:["",Validators.required]

      }) 
    }

  get fa() {
    return this.changepasswordForm.controls;
  }

  submitLogin() {
    if (this.changepasswordForm.invalid) {
      this.newpassSubmitted = true
      return
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  

  resetpassword(){
    this.updatepassword = this.changepasswordForm.value.resetPassword;
    if(this.changepasswordForm.invalid){
      this.newpassSubmitted = true
      return
    }

    this.username = sessionStorage.userName
    this.newpassSubmitted = false
    if(this.changepasswordForm.value.newpassword == this.changepasswordForm.value.rechecknewpassword){
      let body ={
        "userName": this.userObj.userName,
        "oldPassword":this.changepasswordForm.value.password, 
        "newPassword": this.changepasswordForm.value.newpassword,
      }
      console.log("Updatepassword Body",body)
      this.apiService.putMethod2("/user/changepassword", body).subscribe(
        data =>{
            console.log("Updated Response", data)
            if(data.response.statusCode == 200){
              alert ("Password Changed Successfully")

              localStorage.setItem("isUserLoggedIn", "false");
    this.dataSharingService.isUserLoggedIn.next(false);
    sessionStorage.removeItem('useracl');
    sessionStorage.removeItem("linemangerid");
    this.dataSharingService.userDetails.next('');
    this.router.navigate(['/login']);
    
         
      }
      else if(data.response.statusCode == 500){
        this.errorVal = data.response.data.user;
        this.isLoading = false;
        
      }
      
      else{
        this.errorVal = data.response.message;
        this.isLoading = false;
      }
    }, err =>{
      this.errorVal = err.error.response.message

      console.log(err)
    })

    }
    else{
      alert("Check your password");
    }
   
  }


}
