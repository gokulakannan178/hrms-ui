import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import { Router } from '@angular/router'
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  notifyforms: FormGroup
  Submitted: boolean
  empid: any;
  onchecklist_dd: any;
  onchecklist_drop: any;
  organisation: any;
  org_dd: any;
  empmob: any;
  maxdate: any
  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.empid = sessionStorage.getItem("empid"),
      this.getorganisation();
    //this.getonboardingchecklist();
    this.futureDateDisable()
    this.notifyforms = new FormGroup({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      father_name: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      p_email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      gender: new FormControl('', Validators.required),
      // off_email:new FormControl(""),
      join_date: new FormControl('', Validators.required),
      onchecklist_drop: new FormControl('', Validators.required),
      organisation: new FormControl('', Validators.required),
      mob_no: new FormControl("", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),

    })
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

  getValue(val) {
    this.onchecklist_drop = val;
    console.log("thisssss", this.onchecklist_drop);
  }
  getValue1(val) {
    this.organisation = val;
    console.log("thisssss", this.organisation);
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
  getonboardingchecklist(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]

    }
    this.apiService.postMethod("/onboardingpolicy/filter?pageno=no", body).subscribe(data => {
      console.log('onboarding policy filter', data);
      this.onchecklist_dd = data.response.data.OnboardingPolicy;
    })
  }
  get fr() {
    return this.notifyforms.controls;
  }
  saveimp() {
    this.Submitted = true;
    if (this.notifyforms.invalid) {
      alert("Fill all the Fields")
      console.log("working");
      console.log("Form Data ", this.notifyforms.controls)
      return
    }
    var body = {
      "name": this.notifyforms.value.first_name,
      "lastName": this.notifyforms.value.last_name,
      "fatherName": this.notifyforms.value.father_name,
      "dob": this.apiService.getDatee(this.notifyforms.value.dob),
      "gender": this.notifyforms.value.gender,
      "mobile": this.notifyforms.value.mob_no + "",
      "email": this.notifyforms.value.p_email,
      "officialEmail": this.notifyforms.value.off_email,
      "joiningDate": this.apiService.getDatee(this.notifyforms.value.join_date),
      "organisationId": this.organisation,
      "onboardingpolicyId": this.onchecklist_drop,

    }
    console.log("payload", body)
    this.apiService.postMethod('/employee', body).subscribe(data => {
      console.log(data);

      alert("Added Successfully")
      this.notifyforms.reset();
      this.router.navigate(['/employee/add_employee'])
    }, err => {
      console.log(err);
    });
  }

  get vmobile() {
    return this.notifyforms.get('mobile')
  }
  getData(e, type) {
    console.log(e, type)
    if (type == 'Gender') {
      this.notifyforms.controls.gender.setValue(e.target.value);
    }
  }

}
