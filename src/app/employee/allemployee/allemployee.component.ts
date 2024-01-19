import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
// var functionName = 'theFunction';

@Component({
  selector: 'app-allemployee',
  templateUrl: './allemployee.component.html',
  styleUrls: ['./allemployee.component.css']
})
export class AllemployeeComponent implements OnInit {
  desig_dropname: any
  dropdownList = [];
  selectedItemsOrg = []
  selectedItemsBranch = []
  selectedItemsDept = []
  deletedataid
  dropdownSettings: IDropdownSettings = {};
  payroll_dd: any;
  payroll_list: any;
  payroll_deduction: any;
  payrollPolicyData: any;
  payrollPolicyforms: any;
  employestatus: any
  selectedPropertiesObjEarning: any = {};
  selectedPropertiesObjDeduction: any = {};
  payrollPolicyId: any;
  public term: any;
  public dataLoaded: boolean = true;
  public afterLoad: boolean = false;
  public allemployeeDetails: any = [];
  public allemployee: any = [];
  public allemployeeCount: number;
  public filteredData: any = [];
  public notifyforms: FormGroup;
  public payrollForms: FormGroup;
  public probationModalForms: FormGroup;
  public bentonotcModalForms: FormGroup;
  public probtoactiveModalForms: FormGroup;
  public noticetooffboardModalForms: FormGroup;
  public activetobenchModalForms: FormGroup;
  public offboardtoreleiveModalForms: FormGroup;
  public releivetorejectModalForms: FormGroup;
  public rejecttoonboardingModalForms: FormGroup;
  public showItem: number = 10;
  public page: number = 1;
  public totalRec: number;
  public buttonText: string = 'Active';
  public activeStatues: boolean = false;
  public id: any;
  public edit_id: any;
  public activate_id: any;
  public modalHeaderText: string = 'Move to Probation';
  public modalButtonText: string = 'Move to Probation';
  public modalHeaderText1: string = 'Move to Notice';
  public modalButtonText1: string = 'Submit';
  public modalHeaderText2: string = 'Move to Active';
  public modalHeaderText3: string = 'Move to Bench';
  public modalHeaderText4: string = 'Move to Offboard';
  public modalHeaderText5: string = 'Move to Releive';
  public modalHeaderText6: string = 'Move to Reject';
  public modalHeaderText7: string = 'Move to Onboarding';

  public modal_data: any;
  public Submitted: boolean;
  public Submitted1: boolean;
  public Submitted2: boolean;
  public Submitted3: boolean;


  onboardingBody: any = {};
  probationBody: any = {};
  activeeBody: any = {};
  benchBody: any = {};
  noticeBody: any = {};
  offboardBody: any = {};
  releiveBody: any = {};
  rejectBody: any = {};
  public sort: any = {};


  public saveData: any;
  allemployeedisableDetails
  activeDetails
  allemployeebenchDetails
  allemployeeNoticeDetails
  allemployeeOffboardDetails
  allemployeereleiveDetails
  allemployeerejectDetails
  activeBody: any = {};
  disableBody: any = {};
  showItemActive: number = 10;
  showItemDisable: number = 10;
  showItemActiveEmp: number = 10;
  showItemBench: number = 10;
  showItemNotice: number = 10;
  showItemOffboard: number = 10;
  showItemReleive: number = 10;
  showItemReject: number = 10;
  org_multi_dd: any;
  branch_multi_dd: any;
  dept_multi_dd: any;
  orgdropdown: IDropdownSettings = {};
  branchdropdown: IDropdownSettings = {};
  deptdropdown: IDropdownSettings = {};
  prob_dd: any;
  notice_dd: any;
  active_dd: any;
  branch_dd: any;
  work_dd: any;
  doc_dd: any;
  leave_dd: any;
  dept_dd: any;
  lm_dd: any;
  desig_dd: any;
  org_dd: any;
  organisation: any;
  active_count: 0
  pager: any = {};
  pagen: any = {};
  empid: any;
  empmoveid: any;
  getapplication: any;
  NoticePolicyId: any;


  pagerdisable: any = {};
  pagendisable: any = {};
  disable_count: 0

  pageractiveemp: any = {};
  pagenactiveemp: any = {};
  activeemp_count: 0

  pagerbench: any = {};
  pagenbench: any = {};
  bench_count: 0

  pagernotice: any = {};
  pagennotice: any = {};
  notice_count: 0

  pageroffboard: any = {};
  pagenoffboard: any = {};
  offboard_count: 0

  pagerreleive: any = {};
  pagenreleive: any = {};
  releive_count: 0

  pagerreject: any = {};
  pagenreject: any = {};
  reject_count: 0

  userObj: any;
  prob_drop: any;
  notice_policy: any;
  work_policy: any;
  doc_policy: any;
  leave_policy: any;
  offchecklist_dd: any;
  offcheck_drop: any
  line_manager: any;
  branch_drop: any;
  dept_drop: any;
  payroll_policy: any;
  desig_drop: any;
  uniqueid_org = [];
  uniqueid_branch = [];
  uniqueid_dept = [];
  branch_id = [];
  org_id = [];
  payrolldata: any;
  salaryacc: boolean = false;
  postpayroll: any;
  maxdate: any;
  mindate: any;
  emailalert: any;
  offcialemailalert: any;
  constructor(public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'))
    // console.log("objectttttttttttt",this.userObj),
    this.empid = sessionStorage.getItem("empid"),
      // this.payroll();

      this.datepicker()
    this.activeeBody = {

      "status": ["Activeemployee"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1

    }
    this.onboardingBody = {

      "status": ["Onboarding"],
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1,
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },


    }
    this.probationBody = {

      "status": ["Probationary"],
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1,
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },



    }
    this.noticeBody = {

      "status": ["Notice"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1


    }
    this.benchBody = {

      "status": ["Bench"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1


    }
    this.offboardBody = {

      "status": ["Offboard"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1


    }
    this.releiveBody = {

      "status": ["Relieve"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1


    }
    this.rejectBody = {

      "status": ["Reject"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      // "manager":this.userObj.uniqueId,
      "sortBy": "name",
      "sortOrder": 1


    }
    this.noticetooffboardModalForms = new FormGroup({
      'offcheck_drop': new FormControl("", Validators.required),
      'remarks': new FormControl(""),

    });
    this.notifyforms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'description': new FormControl("", Validators.required)
    });


    this.probationModalForms = new FormGroup({
      'name': new FormControl("", Validators.required),
      'persmail': new FormControl("", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'prob_drop': new FormControl("", Validators.required),
      'joining_date': new FormControl("", Validators.required),
      'notice_policy': new FormControl("", Validators.required),
      'work_policy': new FormControl("", Validators.required),
      'leave_policy': new FormControl("", Validators.required),
      'doc_policy': new FormControl("", Validators.required),
      'officialmail': new FormControl("", [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'branch_drop': new FormControl("", Validators.required),
      'dept_drop': new FormControl("", Validators.required),
      'desig_drop': new FormControl("", Validators.required),
      'organisation': new FormControl("", Validators.required),
      'line_manager': new FormControl(""),
      'payroll_policy': new FormControl(""),

    });
    this.payrollPolicyId = sessionStorage.getItem('payrollPolicyEditId'),
      this.getSinglepayrollPolicy(this.payrollPolicyId)
    this.payrollForms = new FormGroup({
      'name': new FormControl(""),
      'salry': new FormControl(""),
      'basicsalary': new FormControl(""),
      'hra': new FormControl(""),
      'conveyallownce': new FormControl(""),
      'educationallow': new FormControl(""),
      'totalgs': new FormControl(""),
      'pf': new FormControl(""),
      'esic': new FormControl(""),
      'totaldeduc': new FormControl(""),
      'netsalary': new FormControl(""),




    });
    this.probtoactiveModalForms = new FormGroup({
      'remarks': new FormControl(""),
    });

    this.activetobenchModalForms = new FormGroup({
      'remarks': new FormControl(""),
    });
    this.bentonotcModalForms = new FormGroup({
      'remarks': new FormControl(""),
      'notice_policy': new FormControl("", Validators.required),
    });

    this.offboardtoreleiveModalForms = new FormGroup({
      'remarks': new FormControl(""),
    })
    this.releivetorejectModalForms = new FormGroup({
      'remarks': new FormControl(""),
    })
    this.rejecttoonboardingModalForms = new FormGroup({
      'remarks': new FormControl(""),
    })
    this.noticetooffboardModalForms = new FormGroup({
      'offcheck_drop': new FormControl("", Validators.required),
      'remarks': new FormControl(""),
    })

    this.multiorgdd();
    this.getorganisation();
    this.getoffboardpolicy()

    //this.getbranch();
    //this.getdepartment();
    //this.getdesignation();
    //  this.getprobationary();
    //   this.getnoticepolicy();
    // this.getworkpolicy();
    //   this.getleavepolicy();
    //   this.getoffboardpolicy();
    // this.getdocpolicy();
    //this.getlinemanager();
    this.getonboardingemployee(null, 1);
    this.getprobationemployee(null, 1);
    this.getactiveemployee(null, 1);
    this.getbenchallemployee(null, 1);
    this.getnoticeallemployee(null, 1);
    this.getoffboardallemployee(null, 1);
    this.getreleiveallemployee(null, 1);
    this.getrejectallemployee(null, 1);
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Logikoof' },
    //   { item_id: 2, item_text: 'Technologies' },
    //   { item_id: 3, item_text: 'TCS' },
    //   { item_id: 4, item_text: 'CTS' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];

    this.orgdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.branchdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.deptdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }

  getValue4(val) {
    this.organisation = val;
    console.log("thisssss", this.organisation);
  }
  getorganisation() {
    let body = {
      "status": ["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
    }
    this.apiService.postMethod("/organisation/filter?pageno=no", body).subscribe(data => {
      console.log('organisation filter', data);
      this.org_dd = data.response.data.organisation;
    })
  }
  get fr() {
    return this.notifyforms.controls;
  }
  get fr1() {
    return this.probationModalForms.controls;
  }
  get fr2() {
    return this.noticetooffboardModalForms.controls;
  }

  get frbench() {
    return this.bentonotcModalForms.controls;
  }
  get fractive() {
    return this.probtoactiveModalForms.controls;
  }

  getsingleapi(id) {
    // let body ={
    //   "status":["Allocated"]
    // }
    this.emailalert = null
    this.offcialemailalert = null

    this.apiService.getMethod2("/employee", id).subscribe(data => {
      console.log("hello", data);
      this.getapplication = data.response.data.data;
      this.probationModalForms.controls['name'].setValue(this.getapplication.name);
      this.payrollForms.controls['name'].setValue(this.getapplication.name);
      this.probationModalForms.controls['persmail'].setValue(this.getapplication.email);
      this.probationModalForms.controls['officialmail'].setValue(this.getapplication.officialEmail);
      this.probationModalForms.controls['joining_date'].setValue(this.apiService.getDate1(this.getapplication.joiningDate));
      this.getorganisation();
      this.probationModalForms.controls['organisation'].setValue(this.getapplication.organisationId);
      this.getbranch(this.getapplication.organisationId)
      this.probationModalForms.controls['branch_drop'].setValue(this.getapplication.branchId);
      this.getworkpolicy(this.getapplication.organisationId)
      this.probationModalForms.controls['work_policy'].setValue(this.getapplication.workscheduleId);
      this.getprobationary(this.getapplication.organisationId)
      this.probationModalForms.controls['prob_drop'].setValue(this.getapplication.probationary);
      this.getnoticepolicy(this.getapplication.organisationId)
      this.probationModalForms.controls['notice_policy'].setValue(this.getapplication.noticeId);
      this.getdepartment(this.getapplication.organisationId)
      this.probationModalForms.controls['doc_policy'].setValue(this.getapplication.departmentId);
      this.getleavepolicy(this.getapplication.organisationId)
      this.probationModalForms.controls['leave_policy'].setValue(this.getapplication.leavePolicyID);
      this.getdesignation(this.getapplication.organisationId)
      this.probationModalForms.controls['desig_drop'].setValue(this.getapplication.designationId);
      this.getdocpolicy(this.getapplication.organisationId)
      this.probationModalForms.controls['doc_policy'].setValue(this.getapplication.documentPolicyID);
      this.getlinemanager(this.getapplication.organisationId)
      this.probationModalForms.controls['line_manager'].setValue(this.getapplication.lineManager);
      this.getpayrollpolicy(this.getapplication.organisationId)

      this.probationModalForms.controls['payroll_policy'].setValue(this.getapplication.payrollPolicyId)
      this.Datepickermin(this.getapplication.dob)
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
    // var vaildateyear = year
    this.maxdate = year + '-' + month + '-' + todayDate;
  }
  updateimp() {
    this.Submitted = true;
    if (this.probationModalForms.invalid) {
      alert("Fill all the Fields")
      console.log("working");
      console.log("Form Data ", this.probationModalForms.controls);
      return
    }
    var body = {
      "uniqueId": this.id,
      "name": this.probationModalForms.value.name,
      "email": this.probationModalForms.value.persmail,
      "officialEmail": this.probationModalForms.value.officialmail,
      "joiningDate": this.apiService.getDatee(this.probationModalForms.value.joining_date),

    }
    this.apiService.putMethod2('/employee/probationary', body).subscribe(data => {
      console.log(data);
      alert("Updated Successfully")
      this.probationModalForms.reset();
    }, err => {
      console.log(err);
    });

  }

  getprobationary(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]
      //  "organisationId":[this.organisation.uniqueId]
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
  getbranch(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]

    }
    this.apiService.postMethod("/Branch/filter?pageno=no", body).subscribe(data => {
      console.log('Branch filter', data);
      this.branch_dd = data.response.data.Branch;

    })
  }
  getdepartment(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id]
    }
    this.apiService.postMethod("/Department/filter?pageno=no", body).subscribe(data => {
      console.log('Department filter', data);
      this.dept_dd = data.response.data.Department;

    })
  }
  getdesignation(id) {
    let body = {
      "status": ["Active"],
      "organisationId": [id],
    }
    this.apiService.postMethod("/designation/filter?pageno=no", body).subscribe(data => {
      console.log('Designation filter', data);
      this.desig_dd = data.response.data.Designation;

    })
  }
  getoffboardpolicy() {
    let body = {
      "status": ["Active"],

    }
    this.apiService.postMethod("/offboardingpolicy/filter?pageno=no", body).subscribe(data => {
      console.log('offboardingpolicy filter', data);
      this.offchecklist_dd = data.response.data.OffboardingPolicy;

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
  getpayrollpolicy(id) {
    console.log("id", id)
    let body = {
      "status": ["Active"],
      "organisationId": [id],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },

    }
    this.apiService.postMethod("/payrollpolicy/filter?pageno=no", body).subscribe(data => {
      console.log('payroll_policy', data);
      this.payroll_dd = data.response.data.PayrollPolicy;
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

    }
    )
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

  //Onboarding
  setPage(page: number) {
    if (page < 1 || page > this.pagen.totalPage) {
      return;
    }
    this.getonboardingemployee(null, page);
  }
  saveActiveItems(number) {
    this.showItemActive = number;
    this.getonboardingemployee(null, this.pager.currentPage);
  }
  //Probation
  setPagedisable(page: number) {
    if (page < 1 || page > this.pagendisable.totalPage) {
      return;
    }
    this.getprobationemployee(null, page);
  }
  savedisableItems(number) {
    this.showItemDisable = number;
    this.getprobationemployee(null, this.pagerdisable.currentPage);
  }
  //Active
  setPageactiveemp(page: number) {
    if (page < 1 || page > this.pagenactiveemp.totalPage) {
      return;
    }
    this.getactiveemployee(null, page);
  }
  saveactiveempItems(number) {
    this.showItemActiveEmp = number;
    this.getactiveemployee(null, this.pageractiveemp.currentPage);
  }
  //Bench
  setPagebench(page: number) {
    if (page < 1 || page > this.pagenbench.totalPage) {
      return;
    }
    this.getbenchallemployee(null, page);
  }
  savebenchItems(number) {
    this.showItemBench = number;
    this.getbenchallemployee(null, this.pagerbench.currentPage);
  }
  //Notice
  setPagenotice(page: number) {
    if (page < 1 || page > this.pagennotice.totalPage) {
      return;
    }
    this.getnoticeallemployee(null, page);
  }
  savenoticeItems(number) {
    this.showItemNotice = number;
    this.getnoticeallemployee(null, this.pagernotice.currentPage);
  }
  //Offboard
  setPageoffboard(page: number) {
    if (page < 1 || page > this.pagenoffboard.totalPage) {
      return;
    }
    this.getoffboardallemployee(null, page);
  }
  saveoffboardItems(number) {
    this.showItemOffboard = number;
    this.getoffboardallemployee(null, this.pageroffboard.currentPage);
  }
  //Releive
  setPagereleive(page: number) {
    if (page < 1 || page > this.pagenreleive.totalPage) {
      return;
    }
    this.getreleiveallemployee(null, page);
  }
  savereleiveItems(number) {
    this.showItemReleive = number;
    this.getreleiveallemployee(null, this.pagerreleive.currentPage);
  }

  //Reject
  setPagereject(page: number) {
    if (page < 1 || page > this.pagenreject.totalPage) {
      return;
    }
    this.getrejectallemployee(null, page);
  }
  saverejectItems(number) {
    this.showItemReject = number;
    this.getrejectallemployee(null, this.pagerreject.currentPage);
  }

  search() {
    this.activeeBody =
    {
      "status": ["Activeemployee"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }
    this.onboardingBody =
    {
      "status": ["Onboarding"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },

      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }
    this.probationBody =
    {
      "status": ["Probationary"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }
    this.noticeBody =
    {
      "status": ["Notice"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }
    this.benchBody =
    {
      "status": ["Bench"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }
    this.offboardBody =
    {
      "status": ["Offboard"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }
    this.releiveBody =
    {
      "status": ["Releive"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }
    this.rejectBody =
    {
      "status": ["Reject"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
      "regex":
      {
        name: this.term,
      },
      "sortBy": "name",
      "sortOrder": 1

    }


    this.getonboardingemployee(this.term, 1);
    this.getprobationemployee(this.term, 1);
    this.getactiveemployee(this.term, 1);
    this.getbenchallemployee(this.term, 1);
    this.getnoticeallemployee(this.term, 1);
    this.getoffboardallemployee(this.term, 1);
    this.getreleiveallemployee(this.term, 1);
    this.getrejectallemployee(this.term, 1);
    this.spinner.hide();
  }
  status(id, type) {
    if (type == 'enable' || type == "disable") {
      this.spinner.show()
      this.apiService.putMethod("/employee/status/" + type, id).subscribe(
        data => {
          this.spinner.hide()
          this.getonboardingemployee(null, 1);
          this.getprobationemployee(null, 1);
          this.getactiveemployee(null, 1);
          this.getbenchallemployee(null, 1);
          this.getnoticeallemployee(null, 1);
          this.getoffboardallemployee(null, 1);
          this.getreleiveallemployee(null, 1);
          this.getrejectallemployee(null, 1);

        }, err => {
          this.spinner.hide()
          console.log(err)
        }
      )
    }
  }

  //Organisation Dropdown
  validateEmail(value) {
    console.log("dddd", value)
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (value.match(mailformat)) {
      this.emailalert = null
      return true;
    } else {
      this.emailalert = "*Invalid email address."

    }

  }
  validateOffEmail(value) {
    console.log("dddd", value)
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (value.match(mailformat)) {
      this.offcialemailalert = null
      return true;
    } else {
      this.offcialemailalert = "*Invalid email address."

    }

  }
  multiorgdd() {
    let body = {
      "status": ["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },
    }
    this.apiService.postMethod("/organisation/filter?pageno=no", body).subscribe(data => {
      console.log('States', data);

      this.org_multi_dd = data.response.data.organisation;
    })
  }

  multibranchdd(event) {
    //  this.branch_id=[]
    this.branch_id.push(event.uniqueId)
    let body = {
      "status": ["Active"],
      "organisationId": this.branch_id,
    }
    this.apiService.postMethod("/Branch/filter?pageno=no", body).subscribe(data => {
      console.log('States', data);
      this.branch_multi_dd = data.response.data.Branch;
    })
  }

  multideptdd(event) {
    // let dept_id=[]
    // dept_id.push(event.uniqueId)
    let body = {
      "status": ["Active"],
      "organisationId": this.branch_id,
    }
    this.apiService.postMethod("/Department/filter?pageno=no", body).subscribe(data => {
      console.log('States', data);
      this.dept_multi_dd = data.response.data.Department;
    })
  }

  normalSearch(search, pageno) {
    this.uniqueid_org = [],
      this.uniqueid_branch = [],
      this.uniqueid_dept = [],

      this.selectedItemsOrg.forEach(element => {
        this.uniqueid_org.push(element.uniqueId)
      });
    this.selectedItemsBranch.forEach(element => {
      this.uniqueid_branch.push(element.uniqueId)
    });
    this.selectedItemsDept.forEach(element => {
      this.uniqueid_dept.push(element.uniqueId)
    });
    this.activeeBody = {
      "status": ["Activeemployee"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }
    this.onboardingBody = {
      "status": ["Onboarding"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }
    this.probationBody = {
      "status": ["Probationary"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }
    this.benchBody = {
      "status": ["Bench"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }
    this.noticeBody = {
      "status": ["Notice"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }
    this.offboardBody = {
      "status": ["Offboard"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }
    this.releiveBody = {
      "status": ["Relieve"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }
    this.rejectBody = {
      "status": ["Reject"],

      "organisation": this.uniqueid_org ? this.uniqueid_org : [],

      "branch": this.uniqueid_branch ? this.uniqueid_branch : [],

      "department": this.uniqueid_dept ? this.uniqueid_dept : [],
    }

    // this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemActive ,body).subscribe( data => {
    //   this.allemployeeDetails = data.response.data.data;

    // })

    this.getonboardingemployee(null, 1);
    this.getprobationemployee(null, 1);
    this.getactiveemployee(null, 1);
    this.getbenchallemployee(null, 1);
    this.getnoticeallemployee(null, 1);
    this.getoffboardallemployee(null, 1);
    this.getreleiveallemployee(null, 1);
  }

  close() {
    this.selectedItemsOrg = [];
    this.selectedItemsBranch = [];
    this.selectedItemsDept = [];
    this.normalSearch(null, 1)
    // this.getonboardingemployee(null, 1);
    // this.getprobationemployee(null, 1);
    // this.getactiveemployee(null, 1);
    // this.getbenchallemployee(null, 1);
    // this.getnoticeallemployee(null, 1);
    // this.getoffboardallemployee(null, 1);
    // this.getreleiveallemployee(null, 1); 
  }

  // futureDateDisable(){
  //   var date:any=new Date();
  //   var todayDate:any=date.getDate();
  //   var month:any=date.getMonth()+1;
  //   var year:any=date.getFullYear();
  //   if(todayDate < 10){
  //     todayDate='0' + todayDate
  //   }
  //   if(month < 10){
  //     month='0' + month
  //   }
  //   this.maxDate = year + '-' + month + '-' + todayDate;

  // }

  //Onboarding
  public getonboardingemployee(search, pageno) {
    this.spinner.show();
    var body =
    {
      "status": ["Onboarding"],
      "sortBy": "name",
      "sortOrder": 1,
      "dataAccess": {
        "isAccess": true,
        "userName": this.userObj.userName
      },


    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          name: search
        }
      }
    }

    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemActive, this.onboardingBody).subscribe(data => {
      this.spinner.hide();
      this.allemployeeDetails = data.response.data.data;
      console.log("kiki", this.allemployeeDetails);
      this.active_count = data.response.data.pagination.count;
      this.pagen.totalUsers = data.response.data.pagination.count;
      this.pagen.totalPage = data.response.data.pagination.totalPage;
      this.pagen.currentPage = data.response.data.pagination.pageNum;
      this.pager = this.pagerservice.getPager(this.pagen.totalUsers, pageno, this.showItemActive);
      // if ((pageno > 1) && (!this.allemployeeDetails.length)) {
      //   this.getonboardingemployee(null, pageno - 1)
      // }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  //Probation
  public getprobationemployee(search, pageno) {
    this.spinner.show();
    // var body =
    // {
    //   "status": ["Probationary"],
    //   "sortBy": "name",
    //   "sortOrder": 1

    // }
    // if (search) {
    //   if (search != "") {
    //     body["regex"] =
    //     {
    //       name: search
    //     }
    //   }
    // }


    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemDisable, this.probationBody).subscribe(data => {
      this.spinner.hide();
      this.allemployeedisableDetails = data.response.data.data;
      this.disable_count = data.response.data.pagination.count;
      this.pagendisable.totalUsers = data.response.data.pagination.count;
      this.pagendisable.totalPage = data.response.data.pagination.totalPage;
      this.pagendisable.currentPage = data.response.data.pagination.pageNum;
      this.pagerdisable = this.pagerservice.getPager(this.pagendisable.totalUsers, pageno, this.showItemDisable);
      if ((pageno > 1) && (!this.allemployeedisableDetails.length)) {
        this.getprobationemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //Active

  public getactiveemployee(search, pageno) {
    this.spinner.show();


    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemActiveEmp, this.activeeBody).subscribe(data => {
      this.spinner.hide();

      this.activeDetails = data.response.data.data;
      this.activeemp_count = data.response.data.pagination.count;
      this.pagenactiveemp.totalUsers = data.response.data.pagination.count;
      this.pagenactiveemp.totalPage = data.response.data.pagination.totalPage;
      this.pagenactiveemp.currentPage = data.response.data.pagination.pageNum;
      this.pageractiveemp = this.pagerservice.getPager(this.pagenactiveemp.totalUsers, pageno, this.showItemActiveEmp);
      if ((pageno > 1) && (!this.activeDetails.length)) {
        this.getactiveemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //Bench

  public getbenchallemployee(search, pageno) {
    this.spinner.show();


    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemBench, this.benchBody).subscribe(data => {
      this.spinner.hide();

      this.allemployeebenchDetails = data.response.data.data;
      this.bench_count = data.response.data.pagination.count;
      this.pagenbench.totalUsers = data.response.data.pagination.count;
      this.pagenbench.totalPage = data.response.data.pagination.totalPage;
      this.pagenbench.currentPage = data.response.data.pagination.pageNum;
      this.pagerbench = this.pagerservice.getPager(this.pagenbench.totalUsers, pageno, this.showItemBench);
      if ((pageno > 1) && (!this.allemployeebenchDetails.length)) {
        this.getbenchallemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //Notice
  public getnoticeallemployee(search, pageno) {
    this.spinner.show();

    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemNotice, this.noticeBody).subscribe(data => {
      this.spinner.hide();

      this.allemployeeNoticeDetails = data.response.data.data;
      this.notice_count = data.response.data.pagination.count;
      this.pagennotice.totalUsers = data.response.data.pagination.count;
      this.pagennotice.totalPage = data.response.data.pagination.totalPage;
      this.pagennotice.currentPage = data.response.data.pagination.pageNum;
      this.pagernotice = this.pagerservice.getPager(this.pagennotice.totalUsers, pageno, this.showItemNotice);
      if ((pageno > 1) && (!this.allemployeeNoticeDetails.length)) {
        this.getnoticeallemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //OffBoard
  public getoffboardallemployee(search, pageno) {
    this.spinner.show();

    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemOffboard, this.offboardBody).subscribe(data => {
      this.spinner.hide();

      this.allemployeeOffboardDetails = data.response.data.data;
      this.offboard_count = data.response.data.pagination.count;
      this.pagenoffboard.totalUsers = data.response.data.pagination.count;
      this.pagenoffboard.totalPage = data.response.data.pagination.totalPage;
      this.pagenoffboard.currentPage = data.response.data.pagination.pageNum;
      this.pageroffboard = this.pagerservice.getPager(this.pagenoffboard.totalUsers, pageno, this.showItemOffboard);
      if ((pageno > 1) && (!this.allemployeeOffboardDetails.length)) {
        this.getoffboardallemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //Releive
  public getreleiveallemployee(search, pageno) {
    this.spinner.show();

    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemReleive, this.releiveBody).subscribe(data => {
      this.spinner.hide();

      this.allemployeereleiveDetails = data.response.data.data;
      this.releive_count = data.response.data.pagination.count;
      this.pagenreleive.totalUsers = data.response.data.pagination.count;
      this.pagenreleive.totalPage = data.response.data.pagination.totalPage;
      this.pagenreleive.currentPage = data.response.data.pagination.pageNum;
      this.pagerreleive = this.pagerservice.getPager(this.pagenreleive.totalUsers, pageno, this.showItemReleive);
      if ((pageno > 1) && (!this.allemployeereleiveDetails.length)) {
        this.getreleiveallemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  //Reject
  public getrejectallemployee(search, pageno) {
    this.spinner.show();

    this.apiService.postMethod("/employee/filter?pageno=" + pageno + "&limit=" + this.showItemReject, this.rejectBody).subscribe(data => {
      this.spinner.hide();

      this.allemployeerejectDetails = data.response.data.data;
      this.reject_count = data.response.data.pagination.count;
      this.pagenreject.totalUsers = data.response.data.pagination.count;
      this.pagenreject.totalPage = data.response.data.pagination.totalPage;
      this.pagenreject.currentPage = data.response.data.pagination.pageNum;
      this.pagerreject = this.pagerservice.getPager(this.pagenreject.totalUsers, pageno, this.showItemReject);
      if ((pageno > 1) && (!this.allemployeerejectDetails.length)) {
        this.getrejectallemployee(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }


  useraction(type, id) {
    if (type == 'viewid') {
      sessionStorage.setItem("empid", id)
    }
    if (type == 'editid') {
      sessionStorage.setItem("empid", id)
    }
    if (type == 'view') {
      sessionStorage.setItem("empid", id)
    }
    else if (type == 'edit') {
      sessionStorage.setItem("empid", id)
    }
    else if (type == 'move') {
      //this.getbranch();
      //this.getdepartment();
      //this.getdesignation();
      //  this.getprobationary();
      //   this.getnoticepolicy();
      //   this.getworkpolicy();
      //   this.getleavepolicy();
      //   this.getoffboardpolicy();
      // this.getdocpolicy();
      //this.getlinemanager(); 
      sessionStorage.setItem("empmoveid", id)
      this.getsingleapi(id);
      console.log("jhkjkjjk", id)
    }

    else if (type == 'delete') {
      // var result = confirm("Are you sure to delete?");
      this.deletedataid = id
    }
  }
  useractions(type, id, status) {
    if (type == 'move') {
      //this.getbranch();
      //this.getdepartment();
      //this.getdesignation();
      //  this.getprobationary();
      //   this.getnoticepolicy();
      //   this.getworkpolicy();
      //   this.getleavepolicy();
      //   this.getoffboardpolicy();
      // this.getdocpolicy();
      //this.getlinemanager(); 
      sessionStorage.setItem("empmoveid", id)
      sessionStorage.setItem("empmoveId", status)
      this.getsingleapi(id);
      console.log("jhkjkjjk", id)
    }
  }
  userAction(type, id, status) {
    if (type == 'editid') {
      sessionStorage.setItem("empid", id)
      sessionStorage.setItem("empmoveId", status)
    }
  }
  deletedata() {
    this.apiService.deleteMethod1('/employee/status/delete', this.deletedataid).subscribe(data => {
      $("#deleteModal").modal("hide");
      console.log(data);

      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
    }, err => {
      console.log(err);
    });
  } return;

  getpayroll(val) {
    console.log("sat", val)
    $('#payrollModal').modal("show")
    this.payroll_policy = val;
    var e = document.getElementById("desgination") as HTMLSelectElement;
    this.desig_dropname = e.options[e.selectedIndex]?.text;
    console.log("isss", this.payroll_policy);
  }
  // payrollpopup
  manualcalcluation() {
    let val = (parseInt(this.payrollForms.controls.basicsalary.value) + parseInt(this.payrollForms.controls.hra.value) + parseInt(this.payrollForms.controls.conveyallownce.value) + parseInt(this.payrollForms.controls.educationallow.value))

    console.log("val", val)
    this.payrollForms.controls['totalgs'].setValue(val);
    this.netsalvalue()
  }
  dedctioncal() {
    let dedctionval = (parseInt(this.payrollForms.controls.pf.value) + parseInt(this.payrollForms.controls.esic.value))
    console.log("esci", this.payrollForms.controls.esic.value)
    console.log("pf", this.payrollForms.controls.pf.value)
    console.log("dedctionval", dedctionval)
    console.log("totaldeduc", this.payrollForms.controls['totaldeduc'].value)
    this.payrollForms.controls['totaldeduc'].setValue(dedctionval);
    this.netsalvalue()
  }
  netsalvalue() {
    let netsalval = (parseInt(this.payrollForms.controls.totalgs.value) - parseInt(this.payrollForms.controls.totaldeduc.value))
    console.log("netsal", netsalval)
    this.payrollForms.controls['netsalary'].setValue(netsalval);
  }
  payroll(pay) {
    this.employestatus = sessionStorage.getItem("empmoveId");
    console.log("pay", pay)
    if (pay) {
      this.salaryacc = true
      this.payrollForms.controls['totalgs'].setValue(pay);

    }
    else {
      this.salaryacc = false
    }
    this.apiService.getMethod8('/salarycalc/employeeType', this.payrollForms.controls.salry.value,).subscribe(data => {

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

  savepayroll() {
    this.empmoveid = sessionStorage.getItem("empmoveid");
    if (this.payrollForms.controls.salry.value !== this.payrollForms.controls.totalgs.value) {
      alert("Please check gross amount")
      return;
    }

    let body = {

      "organisationId": this.probationModalForms.controls.organisation.value,
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
      this.probationModalForms.controls['payroll_policy'].setValue(this.postpayroll.grossAmount)

    })
  }


  getValue(val) {
    this.notice_policy = val;
    console.log("thisssss", this.notice_policy);
  }
  getValue1(val) {
    this.prob_drop = val;

    console.log("thisssss", this.prob_drop);
  }
  getValue2(val) {
    this.offcheck_drop = val;
    console.log("thisssss", this.offcheck_drop);
  }
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

  getValuebranch(val) {
    this.branch_drop = val;
    console.log("thisssss", this.branch_drop);
  }
  getValuedept(val) {
    this.dept_drop = val;
    console.log("thisssss", this.dept_drop);
  }
  getValuedesig(val) {
    this.desig_drop = val;
    var e = document.getElementById("desgination") as HTMLSelectElement;
    this.desig_dropname = e.options[e.selectedIndex].text;
    console.log("thisssss", this.desig_dropname);
  }

  public movetoprob(type) {
    this.Submitted1 = true;
    if (this.probationModalForms.invalid) {
      alert("Fill all the Fields")
      console.log("working");
      console.log("Form Data ", this.probationModalForms.controls)
      return
    }
    if (this.probationModalForms.invalid) {
      return;
    }

    this.Submitted1 = true;
    if (this.probationModalForms.invalid) {
      alert("Fill all the Fields")
      console.log("working");
      console.log("Form Data ", this.probationModalForms.controls)
      return
    }
    if (this.emailalert != null || this.offcialemailalert != null) {
      alert("Fill the valid Email")
      return
    }
    this.empmoveid = sessionStorage.getItem("empmoveid");
    this.empid = sessionStorage.getItem("empid");
    let body = {

      "employeeId": this.empmoveid,
      "name": this.probationModalForms.controls.name.value,
      "email": this.probationModalForms.controls.persmail.value,
      "officialEmail": this.probationModalForms.controls.officialmail.value,
      "joiningDate": this.probationModalForms.controls.joining_date.value,
      "probationaryId": this.prob_drop,
      "noticeId": this.notice_policy,
      "branchId": this.branch_drop,
      "departmentId": this.dept_drop,
      "designationId": this.desig_drop,
      "organisationId": this.organisation,
      "workscheduleId": this.work_policy,
      "leavePolicyID": this.leave_policy,
      "documentPolicyID": this.doc_policy,
      "lineManager": this.line_manager,
      // "payrollPolicyId":this.probationModalForms.controls.payroll_policy.value.toString(),


      // "uniqueId": this.modal_data.uniqueId,
    }

    console.log(body);
    this.spinner.show();
    this.apiService.putMethod2('/employee/probationary', body).subscribe(data => {
      this.spinner.hide();
      console.log(data);
      $("#langModal").modal("hide");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);
      this.probationModalForms.get("name").setValue('');
      this.probationModalForms.get("persmail").setValue('');
      this.probationModalForms.get("officialmail").setValue('');
      this.probationModalForms.get("joining_date").setValue('');
      this.probationModalForms.get("prob_drop").setValue('');
      this.probationModalForms.get("notice_policy").setValue('');
      this.probationModalForms.get("branch_drop").setValue('');
      this.probationModalForms.get("dept_drop").setValue('');
      this.probationModalForms.get("desig_drop").setValue('');
      this.probationModalForms.get("organisation").setValue('');
      this.probationModalForms.get("payroll_policy").setValue('');

    }, err => {
      this.spinner.hide();
      console.log(err);
    });


  }

  public movetoactive(type) {
    this.empmoveid = sessionStorage.getItem("empmoveid");
    let body = {
      "employeeId": this.empmoveid,
      "remark": this.probtoactiveModalForms.value.remarks,
      "by": this.userObj.userName,
      "byId": "",
      "byType": this.userObj.type,
    }

    this.spinner.show();
    this.apiService.putMethod2('/employee/activeemployee', body).subscribe(data => {
      console.log(data);
      $("#langModalprob").modal("hide");
      alert("Updated Successfully");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);
      this.probtoactiveModalForms.get("remarks").setValue('');

    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public movetobench(type) {
    this.empmoveid = sessionStorage.getItem("empmoveid");

    let body = {
      "employeeId": this.empmoveid,
      "remark": this.activetobenchModalForms.value.remarks,
      "by": this.userObj.userName,
      "byId": "",
      "byType": this.userObj.type,
    }

    this.spinner.show();
    this.apiService.putMethod2('/employee/bench', body).subscribe(data => {
      console.log(data);
      $("#langModalactive").modal("hide");
      alert("Updated Successfully");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);
      this.activetobenchModalForms.get("remarks").setValue('');


    }, err => {
      this.spinner.hide();
      console.log(err);
    });

  }

  public movetonotice(type) {
    this.Submitted2 = true;
    if (this.bentonotcModalForms.invalid) {
      alert("Fill Notice Policy")
      console.log("working");
      console.log("Form Data ", this.bentonotcModalForms.controls)
      return
    }
    if (this.bentonotcModalForms.invalid) {
      return;
    }
    this.Submitted2 = true;
    if (this.bentonotcModalForms.invalid) {
      alert("Fill Notice Policy")
      console.log("working");
      console.log("Form Data ", this.bentonotcModalForms.controls)
      return
    }

    this.empmoveid = sessionStorage.getItem("empmoveid");
    let body = {
      "employeeId": this.empmoveid,
      "noticeId": this.notice_policy,
      "remark": this.bentonotcModalForms.value.remarks,
      "by": this.userObj.userName,
      "byId": "",
      "byType": this.userObj.type,
    }
    this.spinner.show();
    this.apiService.putMethod2('/employee/notice', body).subscribe(data => {
      console.log(data);
      $("#langModal1").modal("hide");
      alert("Updated Successfully");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);

      this.bentonotcModalForms.get("remarks").setValue('');
      this.bentonotcModalForms.get("notice_policy").setValue('');

      //  this.bentonotcModalForms.reset();
    }, err => {
      this.spinner.hide();
      console.log(err);
    });


  }

  public movetooffboard(type) {
    //     this.Submitted3 = true;
    //     if(this.noticetooffboardModalForms.invalid){
    //     alert("Fill Notice Policy")
    //    console.log("working");
    //    console.log("Form Data ", this.noticetooffboardModalForms.controls)
    //    return
    //  }
    //     if (this.noticetooffboardModalForms.invalid) {
    //       return;
    //     }
    //       this.Submitted3 = true;
    //       if(this.noticetooffboardModalForms.invalid){
    //       alert("Fill Offboard checklist Policy")   
    //      console.log("working");
    //      console.log("Form Data ", this.noticetooffboardModalForms.controls)
    //      return
    //    }
    if (this.noticetooffboardModalForms.value.offcheck_drop == "") {
      alert("Fill all the Fields")
      console.log("Form Data ", this.noticetooffboardModalForms.controls)

      return
    }

    this.empmoveid = sessionStorage.getItem("empmoveid");

    let body = {
      "employeeId": this.empmoveid,
      "offboardingchecklistId": this.offcheck_drop,
      "remark": this.noticetooffboardModalForms.value.remarks,
      "by": this.userObj.userName,
      "byId": "",
      "byType": this.userObj.type,

    }
    this.spinner.show();
    this.apiService.putMethod2('/employee/offboard', body).subscribe(data => {
      console.log(data);
      $("#langModalprob1").modal("hide");
      alert("Updated Successfully");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);
      this.noticetooffboardModalForms.get("remarks").setValue('');

    }, err => {
      this.spinner.hide();
      console.log(err);
    });

  }

  public movetoreleive(type) {
    this.empmoveid = sessionStorage.getItem("empmoveid");
    let body = {
      "employeeId": this.empmoveid,
      "remark": this.offboardtoreleiveModalForms.value.remarks,
      "by": this.userObj.userName,
      "byId": "",
      "byType": this.userObj.type,

    }
    this.spinner.show();
    this.apiService.putMethod2('/employee/relieve', body).subscribe(data => {
      console.log(data);
      $("#langModalreleive").modal("hide");
      alert("Updated Successfully");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);
      this.offboardtoreleiveModalForms.get("remarks").setValue('');


    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  public movetoreject(type) {
    this.empmoveid = sessionStorage.getItem("empmoveid");
    let body = {
      "employeeId": this.empmoveid,
      "remark": this.releivetorejectModalForms.value.remarks,
      "by": this.userObj.userName,
      "byId": "",
      "byType": this.userObj.type,

    }
    this.spinner.show();
    this.apiService.putMethod2('/employee/reject', body).subscribe(data => {
      console.log(data);
      $("#langModalreject").modal("hide");
      alert("Updated Successfully");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);
      this.releivetorejectModalForms.get("remarks").setValue('');


    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  public movetoonboarding(type) {
    this.empmoveid = sessionStorage.getItem("empmoveid");
    let body = {
      "employeeId": this.empmoveid,
      "remark": this.rejecttoonboardingModalForms.value.remarks,
      "by": this.userObj.userName,
      "byId": "",
      "byType": this.userObj.type,

    }
    this.spinner.show();
    this.apiService.putMethod2('/employee/onboarding', body).subscribe(data => {
      console.log(data);
      $("#langModalrejtoonboard").modal("hide");
      alert("Updated Successfully");
      this.getonboardingemployee(null, 1);
      this.getprobationemployee(null, 1);
      this.getactiveemployee(null, 1);
      this.getbenchallemployee(null, 1);
      this.getnoticeallemployee(null, 1);
      this.getoffboardallemployee(null, 1);
      this.getreleiveallemployee(null, 1);
      this.getrejectallemployee(null, 1);
      this.rejecttoonboardingModalForms.get("remarks").setValue('');


    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  getSinglepayrollPolicy(id) {
    this.apiService.getMethod2("/payrollpolicy", id).subscribe(data => {
      console.log("hello", data);
      this.payrollPolicyData = data.response.data.PayrollPolicy;

      this.payrollForms.controls['name'].setValue(this.payrollPolicyData.name);

      console.log("spr", this.org_dd);
      // console.log("selectorg====>",this.payrollPolicyData.ref.organisationId)
      // this.getorg();
      this.payroll_deduction = this.payrollPolicyData.ref.detectionMaster
      for (let i = 0; i < this.payroll_deduction.length; i++) {
        this.selectedPropertiesObjDeduction[this.payroll_deduction[i].detectionMasterId] = this.payroll_deduction[i].amount
        console.log("selectedPropertiesObjDeduction====>", this.selectedPropertiesObjDeduction)
      }

      this.payroll_list = this.payrollPolicyData.ref.earningMaster
      for (let i = 0; i < this.payroll_list.length; i++) {
        this.selectedPropertiesObjEarning[this.payroll_list[i].earningMasterId] = this.payroll_list[i].amount
        console.log("selectedPropertiesObjEarning====>", this.selectedPropertiesObjEarning)
      }

    }, err => {
      console.log(err);
    });
  }
  getearning(val) {

    console.log("thisssss", val);

    let body = {
      "status": ["Active"],
      "organisationId": [val.uniqueId]

    }
    console.log(this.payroll_list);

    this.apiService.postMethod("/employeeearningmaster/filter?pageno=no", body).subscribe(data => {
      console.log('EarningMaster_getvalueDD', data);
      this.payroll_list = data.response.data.EmployeeEarningMaster;
      console.log('EarningMaster_getvalueDD', this.payroll_list);

    })
  }
  getdeduction(val) {

    console.log("thisssss", val);

    let body = {
      "status": ["Active"],
      "organisationId": [val.uniqueId]

    }
    // console.log(this.payroll_list);

    this.apiService.postMethod("/employeedeductionmaster/filter?pageno=no", body).subscribe(data => {
      console.log('DeductionMaster_getvalueDD', data);
      this.payroll_deduction = data.response.data.EmployeeDeductionMaster;
      console.log('DeductionMaster_getvalueDD', this.payroll_deduction);

    })
  }
  getEarningValues(key, event) {
    console.log(key, event.target.amount);
    this.selectedPropertiesObjEarning[key] = event.target.value
    console.log(this.selectedPropertiesObjEarning);
  }
  getDeductionValues(key, event) {
    console.log(key, event.target.value);
    this.selectedPropertiesObjDeduction[key] = event.target.value
    console.log(this.selectedPropertiesObjDeduction);

  }

  onSelectAll(event) { }
  onItemSelect(event) { }

}

