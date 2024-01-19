import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from "../../../services/api.service";
import * as myGlobals from '../../../shared/globals';
import { Router } from '@angular/router'
declare var $: any;
@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  notifyforms: FormGroup
  payrollForms: FormGroup
  Submitted: boolean
  empid: any;
  getapplication: any;
  organisation: any;
  org_dd: any;
  onchecklist_drop: any;
  onchecklist_dd: any;
  prob_drop: any;
  notice_policy: any;
  payroll_policy: any;
  work_policy: any;
  doc_policy: any;
  leave_policy: any;
  line_manager: any;
  branch_drop: any;
  dept_drop: any;
  desig_drop: any;
  id: any;
  payroll_dd: any;
  prob_dd: any;
  notice_dd: any;
  lm_dd: any;
  work_dd: any;
  doc_dd: any;
  leave_dd: any;
  deletedata: any;
  desig_dropname: any;
  payrolldata: any;
  empmoveid: any;
  postpayroll: any;
  mindate: any;
  maxdate: any;
  Dobmaxdate: any;
  employestatus: any


  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.datepicker()

    this.empid = sessionStorage.getItem("empid"),
      this.employestatus = sessionStorage.getItem("empmoveId");

    this.notifyforms = new FormGroup({
      first_name: new FormControl("", Validators.required),
      last_name: new FormControl("", Validators.required),
      father_name: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      p_email: new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      gender: new FormControl('', Validators.required),
      off_email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      join_date: new FormControl('', Validators.required),
      onchecklist_drop: new FormControl('', Validators.required),
      organisation: new FormControl('', Validators.required),
      mob_no: new FormControl("", [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),
      prob_drop: new FormControl('', Validators.required),
      notice_policy: new FormControl('', Validators.required),
      work_policy: new FormControl('', Validators.required),
      doc_policy: new FormControl('', Validators.required),
      leave_policy: new FormControl('', Validators.required),
      line_manager: new FormControl(''),
      payroll_policy: new FormControl(''),

    })

    this.payrollForms = new FormGroup({
      name: new FormControl("",),
      salry: new FormControl("", Validators.required),
      basicsalary: new FormControl("", Validators.required),
      hra: new FormControl("", Validators.required),
      conveyallownce: new FormControl("", Validators.required),
      educationallow: new FormControl("", Validators.required),
      totalgs: new FormControl("", Validators.required),
      pf: new FormControl("", Validators.required),
      esic: new FormControl("", Validators.required),
      totaldeduc: new FormControl("", Validators.required),
      netsalary: new FormControl("", Validators.required),



    })
    this.getorganisation();
    // this.getonboardingchecklist();
    // this.getprobationary();
    // this. getnoticepolicy();
    // this.getworkpolicy();
    // this.getleavepolicy();
    // this.getdocpolicy();
    // this.getlinemanager();
    this.getsingleapi();
    this.getpayrollapi();
  }
  get fr() {
    return this.notifyforms.controls;
  }
  get fr1() {
    return this.payrollForms.controls;
  }
  getValue(val) {
    this.onchecklist_drop = val;
    console.log("thisssss", this.onchecklist_drop);
  }
  getValue1(val) {
    this.organisation = val;
    console.log("thisssss", this.organisation);
  }

  getValue2(val) {
    this.notice_policy = val;
    console.log("thisssss", this.notice_policy);
  }
  getValue4(val) {
    this.prob_drop = val;
    console.log("thisssss", this.prob_drop);
  }
  // getValue2(val) {
  //   this.offcheck_drop = val;
  //   console.log("thisssss",this.offcheck_drop);
  // }
  getValue3(val) {
    this.work_policy = val;
    console.log("thisssss", this.work_policy);
  }
  getValue5(val) {
    this.leave_policy = val;
    console.log("thisssss", this.leave_policy);
  }
  getValue6(val) {
    this.doc_policy = val;
    console.log("thisssss", this.doc_policy);
  }
  getValue7(val) {
    this.line_manager = val;
    console.log("thisssss", this.line_manager);
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
  getprobationary(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]
    }
    this.apiService.postMethod("/probationary/filter?pageno=no", body).subscribe(data => {
      console.log('probationary filter', data);
      this.prob_dd = data.response.data.Probationary;
    })
  }
  getnoticepolicy(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]
    }
    this.apiService.postMethod("/noticepolicy/filter?pageno=no", body).subscribe(data => {
      console.log('Noticepolicy filter', data);
      this.notice_dd = data.response.data.NoticePolicy;

    })
  }
  getworkpolicy(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]
    }
    this.apiService.postMethod("/workSchedule/filter?pageno=no", body).subscribe(data => {
      console.log('Workpolicy filter', data);
      this.work_dd = data.response.data.workSchedule;

    })
  }

  getleavepolicy(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]
    }
    this.apiService.postMethod("/leavepolicy/filter?pageno=no", body).subscribe(data => {
      console.log('leavepolicy filter', data);
      this.leave_dd = data.response.data.LeavePolicy;

    })
  }
  getdocpolicy(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]
    }
    this.apiService.postMethod("/documentpolicy/filter?pageno=no", body).subscribe(data => {
      console.log('documentpolicy filter', data);
      this.doc_dd = data.response.data.DocumentPolicy;

    })
  }
  getpayrollpolicy(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id],
      "dataAccess": {
        "isAccess": true,
        "userName": ""

      },
    }
    this.apiService.postMethod("/payrollpolicy/filter?pageno=no", body).subscribe(data => {
      console.log('payroll_policy', data);
      this.payroll_dd = data.response.data.PayrollPolicy;
    })
  }
  getlinemanager(id) {
    let body = {
      "status": ["Activeemployee"],

      "organisationId": [id],
    }
    this.apiService.postMethod("/user/filter?pageno=no", body).subscribe(data => {
      console.log('linemanager filter', data);
      this.lm_dd = data.response.data.user;


    })
  }

  getsingleapi() {
    // let body ={
    //   "status":["Allocated"]
    // }
    this.apiService.getMethod2("/employee", this.empid).subscribe(data => {
      console.log("hello", data);
      this.getapplication = data.response.data.data;
      this.payrollForms.controls['name'].setValue(this.getapplication.name);

      this.notifyforms.controls['first_name'].setValue(this.getapplication.name);
      this.notifyforms.controls['last_name'].setValue(this.getapplication.lastName);
      this.notifyforms.controls['father_name'].setValue(this.getapplication.fatherName);
      this.notifyforms.controls['dob'].setValue(this.apiService.getDate1(this.getapplication.dob));
      this.notifyforms.controls['p_email'].setValue(this.getapplication.email);
      this.notifyforms.controls['gender'].setValue(this.getapplication.gender);
      this.notifyforms.controls['off_email'].setValue(this.getapplication.officialEmail);
      this.notifyforms.controls['join_date'].setValue(this.apiService.getDate1(this.getapplication.joiningDate));
      this.notifyforms.controls['mob_no'].setValue(this.getapplication.mobile);
      this.getorganisation();
      this.notifyforms.controls['organisation'].setValue(this.getapplication.organisationId);
      this.getonboardingchecklist(this.getapplication.organisationId);
      this.notifyforms.controls['onchecklist_drop'].setValue(this.getapplication.onboardingpolicyId);


      this.getnoticepolicy(this.getapplication.organisationId);
      this.notifyforms.controls['notice_policy'].setValue(this.getapplication.noticeId);
      this.getworkpolicy(this.getapplication.organisationId);
      this.notifyforms.controls['work_policy'].setValue(this.getapplication.workscheduleId);
      this.getleavepolicy(this.getapplication.organisationId);
      this.notifyforms.controls['leave_policy'].setValue(this.getapplication.leavePolicyID);
      this.getdocpolicy(this.getapplication.organisationId);
      this.notifyforms.controls['doc_policy'].setValue(this.getapplication.documentPolicyID);
      this.getlinemanager(this.getapplication.organisationId);
      this.notifyforms.controls['line_manager'].setValue(this.getapplication.lineManager);
      this.getprobationary(this.getapplication.organisationId);
      this.notifyforms.controls['prob_drop'].setValue(this.getapplication.probationaryId);
      this.getpayrollpolicy(this.getapplication.organisationId)
      // this.notifyforms.controls['payroll_policy'].setValue(this.getapplication.payrollPolicyId);
      this.Datepickermin(this.getapplication.dob)

      // payrollpopup


    }, err => {
      console.log(err);
    });
  }
  Datepickermin(e) {
    var date: any = new Date(e);
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear();
    if (todayDate < 10) {
      todayDate = '0' + todayDate
    }
    if (month < 10) {
      month = '0' + month
    }
    var vaildateyear = year + 18
    this.mindate = vaildateyear + '-' + month + '-' + todayDate;
  }
  datepicker() {
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

    this.maxdate = year + '-' + month + '-' + todayDate;
    var vaildateyear = year - 18
    this.Dobmaxdate = vaildateyear + '-' + month + '-' + todayDate;
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
      "noticeId": this.notifyforms.value.notice_policy,
      "workscheduleId": this.notifyforms.value.work_policy,
      "leavePolicyID": this.notifyforms.value.leave_policy,
      "documentPolicyID": this.notifyforms.value.doc_policy,
      "lineManager": this.notifyforms.value.line_manager,
      "probationaryId": this.notifyforms.value.prob_drop,
      "payrollPolicyId": this.notifyforms.controls?.payroll_policy?.value?.toString()
    }
    this.apiService.putMethod2('/employee', body).subscribe(data => {
      console.log(data);
      alert("Updated Successfully")
      this.router.navigate(['/employee/allemployee'])
    }, err => {
      console.log(err);
    });

  }
  // payrollpopup

  getpayroll(val) {
    $('#payrollModal').modal("show")
    this.payroll_policy = val;
    var e = document.getElementById("desgination") as HTMLSelectElement;
    this.desig_dropname = e.options[e.selectedIndex].text;
    console.log("isss", this.payroll_policy);
  }
  manualcalcluation() {
    let val = (parseInt(this.payrollForms.controls.basicsalary.value) + parseInt(this.payrollForms.controls.hra.value) + parseInt(this.payrollForms.controls.conveyallownce.value) + parseInt(this.payrollForms.controls.educationallow.value))

    console.log("val", val)
    this.payrollForms.controls['totalgs'].setValue(val);
    this.netsalvalue()
  }
  dedctioncal() {
    let dedctionval = (parseInt(this.payrollForms.controls.pf.value) - parseInt(this.payrollForms.controls.esic.value))
    this.payrollForms.controls['totaldeduc'].setValue(dedctionval);
    this.netsalvalue()
  }
  netsalvalue() {
    let netsalval = (parseInt(this.payrollForms.controls.totalgs.value) - parseInt(this.payrollForms.controls.totaldeduc.value))
    console.log("netsal", netsalval)
    this.payrollForms.controls['netsalary'].setValue(netsalval);
  }
  payroll(pay) {

    // if(pay){
    // this.salaryacc=true
    this.payrollForms.controls['totalgs'].setValue(pay);

    // }


    this.apiService.getMethod8('/salarycalc/employeeType', this.payrollForms.controls.salry.value).subscribe(data => {

      this.payrolldata = data.response.data.PayrollPolicy;
      this.payrollForms.controls['basicsalary'].setValue(this.payrolldata.earnings.basicSalary);
      this.payrollForms.controls['hra'].setValue(this.payrolldata.earnings.hra);
      this.payrollForms.controls['conveyallownce'].setValue(this.payrolldata.earnings.conveyanceAllowances);
      this.payrollForms.controls['educationallow'].setValue(this.payrolldata.earnings.educationAllowance);
      // this.payrollForms.controls['totalgs'].setValue(this.payrolldata.grossAmount);
      this.payrollForms.controls['netsalary'].setValue(this.payrolldata.netSalary);
      this.payrollForms.controls['totaldeduc'].setValue(this.payrolldata.totalDeduction);

      this.payrollForms.controls['pf'].setValue(this.payrolldata.detections.pfContribution);
      this.payrollForms.controls['esic'].setValue(this.payrolldata.detections.eSICContribution);



      // this.payrollForms.reset();

      console.log("pay", this.payrolldata);

    })
  }
  getpayrollapi() {
    this.apiService.getMethod2('/payroll/getemployee', this.empid).subscribe(data => {

      this.payrolldata = data.response.data.data;
      this.payrollForms.controls['basicsalary'].setValue(this.payrolldata?.earnings?.basicSalary);
      this.payrollForms.controls['hra'].setValue(this.payrolldata?.earnings?.hra);
      this.payrollForms.controls['conveyallownce'].setValue(this.payrolldata?.earnings?.conveyanceAllowances);
      this.payrollForms.controls['educationallow'].setValue(this.payrolldata?.earnings?.educationAllowance);
      this.payrollForms.controls['totalgs'].setValue(this.payrolldata?.grossAmount);
      this.payrollForms.controls['netsalary'].setValue(this.payrolldata?.netSalary);
      this.payrollForms.controls['totaldeduc'].setValue(this.payrolldata?.totalDeduction);
      this.payrollForms.controls['salry'].setValue(this.payrolldata?.grossAmount);
      this.payrollForms.controls['pf'].setValue(this.payrolldata?.detections?.pfContribution);
      this.payrollForms.controls['esic'].setValue(this.payrolldata?.detections?.eSICContribution);
      this.notifyforms.controls['payroll_policy'].setValue(this.payrolldata?.grossAmount);

    })
  }

  savepayroll() {

    this.empmoveid = sessionStorage.getItem("empid");
    console.log('id', this.empmoveid)
    if (this.payrollForms.controls.salry.value !== this.payrollForms.controls.totalgs.value) {
      alert("Please check gross amount")
      return;
    }

    let body = {

      "organisationId": this.notifyforms.controls.organisation.value,
      "employeeId": this.empmoveid,
      "grossAmount": parseFloat(this.payrollForms.controls.totalgs.value),
      "totalDeduction": parseFloat(this.payrollForms.controls.totaldeduc.value),
      "netSalary": parseFloat(this.payrollForms.controls.netsalary.value),
      earnings: {
        "basicSalary": parseFloat(this.payrollForms.controls.basicsalary.value),
        "hra": parseFloat(this.payrollForms.controls.hra.value),
        "conveyanceAllowances": parseFloat(this.payrollForms.controls.conveyallownce.value),
        "educationAllowance": parseFloat(this.payrollForms.controls.educationallow.value)
      },

      detections: {
        "pfContribution": parseFloat(this.payrollForms.controls.pf.value),
        "eSICContribution": parseFloat(this.payrollForms.controls.esic.value),
      }
    }
    this.apiService.postMethod('/payroll/employee', body).subscribe(data => {
      this.postpayroll = data.response.data.EmployeePayroll;
      this.notifyforms.controls['payroll_policy'].setValue(this.postpayroll.grossAmount)

    })
  }

}


