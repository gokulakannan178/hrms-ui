import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { data } from 'jquery';

declare var angular: any;
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };
  sendnewsforms: FormGroup
  news_title: any
  news_content: any
  employee_name: any
  selectedItemsDept: any
  selectedItemsemp: any
  dept_multi_dd: any
  deptdropdown: IDropdownSettings = {};
  employeedropdown: IDropdownSettings = {};
  empname: any
  keyword: "name"
  _employeename: any = []
  organisation: any
  contentmodel: any
  employeefield: boolean = false;
  Departmentfield: boolean = false;
  everyonefield: boolean = false;
  select: any
  singleselect: any = []
  constructor(public apiService: ApiService, private readonly router: Router,) { }

  ngOnInit(): void {
    this.organisation = JSON.parse(sessionStorage.getItem('userObj'))
    console.log("org", this.organisation)
    this.multideptdd()
    this.getemployename()
    this.deptdropdown = {
      singleSelection: false,
      idField: 'uniqueId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.employeedropdown = {
      singleSelection: false,
      idField: 'userName',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.sendnewsforms = new FormGroup({
      title: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required),
      name: new FormControl(""),
      multidepartment: new FormControl(""),
      everyone: new FormControl("")
    })
  }
  getemployename() {
    let body = {
      "status": ["Probationary", "Activeemployee", "Bench", "Notice"],
      "sortBy": "name",
      "sortOrder": 1,
    }
    this.apiService.postMethod("/employee/filter?pageno=no", body).subscribe(data => {
      this.empname = data.response.data.data
    })
  }
  selectEvent(data) {

  }
  onChangeSearch(search: string) {

  }
  onFocused(e) {

  }
  getUserIdsFirstWay(e) {
    console.log("lll", e)
    //  this._employeename.push(e.target.value)
    //  console.log("emp",this._employeename)
  }
  Everyone_(e) {
    console.log("e", e)
    if (e == 'Everyone') {
      this.everyonefield = true
      this.employeefield = false
      this.Departmentfield = false
      this.sendnewsforms.get("name").setValue("")
      this.sendnewsforms.get("multidepartment").setValue("")
    }

    if (e == 'Employee') {
      this.employeefield = true
      this.Departmentfield = false
      this.everyonefield = false
      this.sendnewsforms.get("multidepartment").setValue("")
      this.sendnewsforms.get("everyone").setValue("")
      this._employeename = []
    }

    if (e == 'Department') {
      this.Departmentfield = true
      this.employeefield = false
      this.everyonefield = false
      this.sendnewsforms.get("everyone").setValue("")
      this.sendnewsforms.get("name").setValue("")
    }
    if (e == 'Reset') {
      this.employeefield = false
      this.everyonefield = false
      this.Departmentfield = false
      this.sendnewsforms.get("everyone").setValue("")
      this.sendnewsforms.get("name").setValue("")
      this.sendnewsforms.get("multidepartment").setValue("")

    }
  }

  everyemp(e) {
    console.log("uname", e)
    if (e.target.checked == true) {
      this._employeename = []
      for (let i = 0; i < this.empname.length; i++) {
        this._employeename.push(this.empname[i].name)
        console.log("eve", this._employeename)
      }
    } else {
      this._employeename = []
      this.sendnewsforms.get("name").setValue("")
    }
  }

  multideptdd() {
    // let dept_id=[]
    // dept_id.push(event.uniqueId)
    let body = {
      "status": ["Active"],

    }
    this.apiService.postMethod("/Department/filter?pageno=no", body).subscribe(data => {
      console.log('States', data);
      this.dept_multi_dd = data.response.data.Department
    })
  }

  // onSelectAll(event){
  //   console.log('unmae',event)
  // this._employeename=[]
  // var e= document.getElementById("dynmicUserIds") as HTMLSelectElement;
  //   let singleempName= e.options[e.selectedIndex].text;
  //   this._employeename.push(event.target.value)
  //   console.log("emp",this._employeename)
  // }
  removename(i) {

    console.log("remove", i)
    this._employeename.splice(i, 1)
    console.log("cut", this._employeename)
  }
  onemployeeSelect(e) {

    console.log("onse", e)

    // this.singleselect.push(e.userName)

    // console.log("check",this.singleselect)



  }
  onemployeeSelectAll(e) {
    console.log("onseA", e)

  }
  sendall() {
    this.singleselect = []
    if (this.sendnewsforms.invalid) {
      alert("Enter Mandatory Field")
      return
    } else {

      for (let i = 0; i < this.selectedItemsemp.length; i++) {
        this.singleselect.push(this.selectedItemsemp[i].userName)
        console.log("payload", this.singleselect)
      }
    }


    let body = {
      "title": this.sendnewsforms.controls.title.value,
      "message": this.sendnewsforms.controls.content.value,
      "organisationId": this.organisation.ref.organisation.uniqueId,
      "sendTo": {
        "departmentId": this.sendnewsforms?.controls?.multidepartment?.value ? [this.sendnewsforms?.controls?.multidepartment?.value] : [],
        "employee": this.singleselect ? this.singleselect : [],
      },
      "createdBy": this.organisation.userName
    }
    this.apiService.postMethod("/news/status/published ", body).subscribe(data => {
      console.log("sms", data)
      alert('Successfully Send')
      this.sendnewsforms.reset()
      this.selectedItemsemp = ''
    })
    console.log("send", body)
  }
  onItemSelect(event) {
    console.log("dep", event)
  }
  onItemDeSelect(e) {
    console.log('onItemDeSelect', e);

  }
  onSelectAll(event) { }

}
