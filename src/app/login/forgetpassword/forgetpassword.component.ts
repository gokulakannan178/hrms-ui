import { DataSharingServiceService } from './../../service/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../services/api.service';
declare var $: any;
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgetpasswordForm: FormGroup;
  forgetpassSubmitted: boolean = false;
  user: any;
  userObj:any;
 
  errorVal: any;
  isLoading=false;
  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: ApiService,
    private dataSharingService: DataSharingServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.forgetpasswordForm = this.formBuilder.group({
      userName: ["", Validators.required]
    })
  }
  get fa() {
    return this.forgetpasswordForm.controls;
  }

  submitLogin() {
    if (this.forgetpasswordForm.invalid) {
      this.  forgetpassSubmitted = true
      return
    }
    
  }
  forgetpassword(){
    this.user = this.forgetpasswordForm.value.userName
    if(this.forgetpasswordForm.invalid){
      this.forgetpassSubmitted = true
      return
    }
    this.forgetpassSubmitted = false
    this.apiService.getMethod4("/user/forgetpassword/generateotp?username=" + this.user).subscribe
    (data =>{
      console.log("Forgetpassword", data)
     
      if(data.response.statusCode == 200){
        
        this.router.navigate(['/login/forgototpgeneration'])
      }else{
        this.errorVal = data.response.message;
        this.isLoading = false;
      }
    }, err =>{
      this.errorVal = err.error.response.message

      console.log(err)
    })
  }

}
