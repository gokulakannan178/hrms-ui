import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  getgenerateslip:any
  getpayslip:any

  constructor(public apiservice:ApiService) { }

  ngOnInit(): void {
    this.getgenerateslip=JSON.parse(sessionStorage.getItem("payslip"))
    console.log("slip",this.getgenerateslip)
    this.showpayslip()
  }
  showpayslip(){
    let body={
      "employeeId" :this.getgenerateslip.employeeId,
      "startDate":this.getgenerateslip.startDate
    }
    this.apiservice.postMethod("/payroll/employeesalaryslip",body).subscribe(data =>{
      this.getpayslip=data.response.data.data
    })
  }
  pdf(){
    let body={
      "employeeId" :this.getgenerateslip.employeeId,
      "startDate":this.getgenerateslip.startDate
    } 
    this.apiservice.downloadReport("/payroll/employeesalaryslip?resType=pdf",body).subscribe(data=>{
      saveAs(data, 'asset.pdf')
    })
  }
}
