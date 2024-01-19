import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as myGlobals from '../../shared/globals';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {


  dataList1: any = [];
  dataList2: any = [];
  dataList3: any = [];
  departmentId: string;
  moduleId: string;
  checkList: any = [];

  constructor(public apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getList1();
  }

  getList1() {
    let body = {
      "status": ["Active"]
    }
    
    this.apiService.postMethod("/usertype/filter?pageno=no", body).subscribe(
      data => {
        
        this.dataList1 = data.response.data.userType;
        this.getList2(this.dataList1[0].uniqueId);
      },
      err => {
        alert(err)
      }
    )
  }

  getList2(id) {
    
    let body = {
      "userType": [id],
      "check": ["Yes"]
    }
    this.apiService.postMethod("/acl/usertype/modules/filter?pageNo=no", body).subscribe(
      data => {
        this.departmentId = id;
        this.dataList2 = data.response.data.modules;
        this.getList3(this.dataList2[0].moduleId);
      },
      err => {
        alert(err)
      }
    )
  }

  getList3(id) {
    
    this.apiService.getMethod3("/acl/usertype/menus?userTypeId=" + this.departmentId + "&moduleId=" + id).subscribe(
      data => {        
        this.dataList3 = data.response.data.userType;
        this.moduleId = id;
        this.checkList = [];
        if (this.dataList3.module.menus)
          for (let i = 0; i < this.dataList3.module.menus.length; i++) {
            if (this.dataList3.module.menus[i].access.check == 'Yes') {
              this.checkList.push({ "id": this.dataList3.module.menus[i].uniqueId, "val": "Yes" });
            } else {
              this.checkList.push({ "id": this.dataList3.module.menus[i].uniqueId, "val": "No" });
            }
          }
      },
      err => {
        alert(err)
      }
    )
  }

  checkAll() {
    for (let i = 0; i < this.checkList.length; i++) {
      this.checkList[i].val = "Yes";
    }
  }
  unCheckAll() {
    for (let i = 0; i < this.checkList.length; i++) {
      this.checkList[i].val = "No";
    }
  }
  changeDept(index) {
    this.checkList[index].val = this.checkList[index].val == "Yes" ? "No" : "Yes";
  }
  save() {
    let body = []
    for (let i = 0; i < this.checkList.length; i++) {
      body.push({
        "moduleId": this.moduleId,
        "menuId": this.checkList[i].id,
        "userTypeId": this.departmentId,
        "check": this.checkList[i].val
      })
    }
    this.apiService.postMethod("/acl/usertype/menus", body).subscribe(
      data => {
        alert("Update Successfully Done")
      },
      err => {
        alert(err)
      }
    )
  }



}
