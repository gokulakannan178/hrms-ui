import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import { Router } from '@angular/router'
@Component({
  selector: 'app-onboardingedit',
  templateUrl: './onboardingedit.component.html',
  styleUrls: ['./onboardingedit.component.css']
})
export class OnboardingeditComponent implements OnInit {

  notifyforms: FormGroup
  Submitted: boolean
  empid: any;
  getapplication: any;
  organisation: any;
  org_dd: any;
  onchecklist_drop: any;
  onchecklist_dd: any;
  branch_drop: any;
  dept_drop: any;
  desig_drop: any;
  maxdate: any;

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.empid = sessionStorage.getItem("empid"),
      this.futureDateDisable()
    this.notifyforms = new FormGroup({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      father_name: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      p_email: new FormControl("", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      gender: new FormControl('', Validators.required),

      join_date: new FormControl('', Validators.required),
      onchecklist_drop: new FormControl('', Validators.required),
      organisation: new FormControl('', Validators.required),
      mob_no: new FormControl('', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),


    })
    this.getorganisation();
    this.getonboardingchecklist();

    this.getsingleapi();
  }
  get fr() {
    return this.notifyforms.controls;
  }
  getValue(val) {
    this.onchecklist_drop = val;
    console.log("thisssss", this.onchecklist_drop);
  }
  getValue1(val) {
    this.organisation = val;
    console.log("thisssss", this.organisation);
  }
  futureDateDisable() {
    var date: any = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    if (todayDate < 10) {
      todayDate = '0' + todayDate
    }
    if (month < 10) {
      month = '0' + month
    }
    var vaildateyear = year - 18
    this.maxdate = vaildateyear + '-' + month + '-' + todayDate;

  }

  getorganisation() {
    let body = {
      "status": ["Active"]
    }
    this.apiService.postMethod("/organisation/filter?pageno=no", body).subscribe(data => {
      console.log('organisation filter', data);
      this.org_dd = data.response.data.organisation;
    })
  }
  getonboardingchecklist() {
    let body = {
      "status": ["Active"]
    }
    this.apiService.postMethod("/onboardingpolicy/filter?pageno=no", body).subscribe(data => {
      console.log('onboarding policy filter', data);
      this.onchecklist_dd = data.response.data.OnboardingPolicy;
    })
  }


  getsingleapi() {
    // let body ={
    //   "status":["Allocated"]
    // }
    this.apiService.getMethod2("/employee", this.empid).subscribe(data => {
      console.log("hello", data);
      this.getapplication = data.response.data.data;
      this.notifyforms.controls['first_name'].setValue(this.getapplication.name);
      this.notifyforms.controls['last_name'].setValue(this.getapplication.lastName);
      this.notifyforms.controls['father_name'].setValue(this.getapplication.fatherName);
      this.notifyforms.controls['dob'].setValue(this.apiService.getDate1(this.getapplication.dob));
      this.notifyforms.controls['p_email'].setValue(this.getapplication.email);
      this.notifyforms.controls['gender'].setValue(this.getapplication.gender);
      // this.notifyforms.controls['off_email'].setValue( this.getapplication.officialEmail);
      this.notifyforms.controls['join_date'].setValue(this.apiService.getDate1(this.getapplication.joiningDate));
      this.notifyforms.controls['mob_no'].setValue(this.getapplication.mobile);
      this.notifyforms.controls['organisation'].setValue(this.getapplication.organisationId);
      this.notifyforms.controls['onchecklist_drop'].setValue(this.getapplication.onboardingpolicyId);


    }, err => {
      console.log(err);
    });
  }

  updateimp() {
    this.Submitted = true;
    if (this.notifyforms.invalid) {
      alert("Fill all the Fields")
      console.log("working");
      console.log("Form Data ", this.notifyforms.controls)
      return
    }
    var body = {
      "uniqueId": this.empid,
      "name": this.notifyforms.value.first_name,
      "lastName": this.notifyforms.value.last_name,
      "fatherName": this.notifyforms.value.father_name,
      "dob": this.apiService.getDatee(this.notifyforms.value.dob),
      "gender": this.notifyforms.value.gender,
      "mobile": this.notifyforms.value.mob_no,
      "email": this.notifyforms.value.p_email,
      "officialEmail": this.notifyforms.value.off_email,
      "joiningDate": this.apiService.getDatee(this.notifyforms.value.join_date),
      "organisationId": this.notifyforms.value.organisation,
      "onboardingpolicyId": this.notifyforms.value.onchecklist_drop,

    }
    this.apiService.putMethod2('/employee', body).subscribe(data => {
      console.log(data);
      alert("Updated Successfully")
      this.router.navigate(['/employee/allemployee'])
    }, err => {
      console.log(err);
    });

  }


}
