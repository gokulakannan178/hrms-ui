import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-employeesalary',
  templateUrl: './employeesalary.component.html',
  styleUrls: ['./employeesalary.component.css']
})
export class EmployeesalaryComponent implements OnInit {
  payrolldata:any;

  constructor(private readonly router: Router,public apiService: ApiService,) {  }

  ngOnInit(): void {
    alert("Ss")
    this.getemployee()
  }

  getemployee(){
       let body={
           status:["Active"],
           organisationId:[],
          dataAccess:{
              "isAccess":true,
              "userName":"",
           }
        }
       this.apiService.postMethod("/payroll/filter",body).subscribe(data => {
          this.payrolldata=data.response.data;

})
  }

}
