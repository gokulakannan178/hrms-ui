import { DataSharingServiceService } from './../../service/data-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../shared/auth.service';
import { ApiService } from '../../services/api.service';
import * as myGlobals from '../../shared/globals';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForms: FormGroup;
  loggedIn: boolean = false
  submittedLog: boolean = false
  errorVal: any;
    public fieldTextType: boolean

  // public submittedLog: boolean;

  isLoading=false;
 

  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder, private dataSharingService: DataSharingServiceService, private authService: AuthService) {
    this.registerForms = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {
  }


  get fa() {
    return this.registerForms.controls;
  }

  submitLogin() {
    if (this.registerForms.invalid) {
      this.submittedLog = true
      return
    }
    setTimeout(() => {
      this.authService.signIn(this.registerForms.value).subscribe(data => {
        // if (data.response.statusCode == 500) {
        //   this.errorVal = data.response.message
        // }

         if (data.response.statusCode == 200) {
          localStorage.setItem('isUserLoggedIn', 'true')
          this.dataSharingService.isUserLoggedIn.next(true)
          this.dataSharingService.userDetails.next(data)
          localStorage.setItem('Role', btoa(data.response.data.user.role))
          this.authService.StoreUserDetailsLocally(data.response.data)
          sessionStorage.setItem('userObj', JSON.stringify(data.response.data.user))
          this.apiService.getUserACL()
         

        //  this.apiService.getUserACL()
         // this.getAcl(data.response.data.user.type)

        let userdetail=data.response.data.user
        console.log("emid",userdetail)
          this.apiService.getMethod2("/employee/linemanagercheck",userdetail.employeeId).subscribe(data =>{
                sessionStorage.setItem('linemangerid',data.response.data.data.lineManager)
          })


          this.router.navigate(['/dashboard/employee_dashbaord'])
          // this.router.navigate(['/employee'])

          //  alert("You are successfully loggedin")
        } else {
          this.errorVal = data.response.message;
            this.isLoading = false;

            
        }
      });
    }, 1000)

  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  // getAcl(id) {
  //   console.log(id)
  //   this.apiService.getMethod3("/acl/access?userTypeId=" + id).subscribe(
  //     data => {
  //       console.log("ACL Data", data)
  //       // this.router.navigate(['/admin/dashboard'])
  //       let role = data.response.data.access;
  //       this.dataSharingService.isUserLoggedIn.next(true);
  //       this.dataSharingService.userDetails.next({
  //         userName: this.registerForms.value.userName,
  //         password: this.registerForms.value.password
  //       });
  //       role = JSON.stringify(role);
  //       sessionStorage.setItem("moduleAcl", role);

  //     },
  //     err => {
  //     }
  //   )
  // }

}
