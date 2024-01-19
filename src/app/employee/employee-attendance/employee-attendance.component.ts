import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { PagerService } from "../../services/pager.service";
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import * as myGlobals from '../../shared/globals';
// import { log } from 'console';


@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})



export class EmployeeAttendanceComponent implements OnInit {

  public apiUrl = myGlobals.base_api_url;
  employeeid:any
  userObj:any;
  month:any;
  year:any;
  attedance;
  public term:any;
  showItemActive: number = 10;
  pageractive: any = {};
  pagenactive: any = {};
  active_count: 0
  attedancedatelist:any=[]
  attedancelist:any=[]
  showItemActiveEmp:number=10;
  pageractiveemp: any = {};
  pagenactiveemp: any = {};
  activeemp_count: 0
  attedancedates:any
  employeattendance:boolean=false;

  checkbox=[]
  approvecheckbox=[]
  allselectcheckbox:boolean=false
  checks:any
  selectcheckbox:boolean
  constructor(public apiService: ApiService,public pageservice:PagerService,private readonly router:Router) { }

  ngOnInit(): void {
    let date=new Date().getDate()
    this.selectcheckbox=false;
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'));

    let curentdate=new Date().getMonth()+1
    console.log("date",curentdate)
    this.month=this.prependZero(curentdate)
    console.log("date",this.month)
    this.year=new Date().getFullYear()
    this.search(1,null)
  }

   prependZero(number) {
    if (number < 9)
        return "0" + number;
    else
        return ""+ number;
}

  // searchbox
  setPageactiveemp(page: number) {
    if (page < 1 || page > this.pagenactiveemp.totalPage) {
      return;
    }
    this.search(page,null);
  }
saveactiveempItems(number) {
  this.showItemActiveEmp = number;
  this.search(this.pageractiveemp.currentPage,null);
}

  search(pageno,searchdata){
    
    if (pageno){
      this.employeattendance=true
    }
    else{
      this.employeattendance=false
    }
    if(searchdata=='search'){
      sessionStorage.removeItem('year')
      sessionStorage.removeItem('month')
    }
    let monthyear=sessionStorage.getItem('year')
    let monthyear1=sessionStorage.getItem('month')
     if( monthyear){
       this.year=monthyear
     }
    if( monthyear1){
      this.month=monthyear1
    }
   

    
    let date=new Date().getDate()
    let body={
      searchBox:{
        name: this.term
        },
      "startDate":new Date(this.year+'-'+this.month+'-'+date).toJSON(),
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy":"name",
   "sortOrder":1,
      "manager":this.userObj.userName,

    }
    sessionStorage.setItem('year',this.year)
    sessionStorage.setItem('month',this.month)
    
    this.attedancedatelist=[]
    

    
    this.apiService.postMethod("/attendance/employeedaywisereport?pageno=" + pageno + "&limit=" + this.showItemActiveEmp ,body).subscribe(
      data => {
        this.allselectcheckbox=false
        this.attedance = data.response.data.employee
        this.attedancedates = data.response.data.employee.days
        this. activeemp_count = data.response.data.pagination.count;
        this.pagenactiveemp.totalUsers = data.response.data.pagination.count;
        this.pagenactiveemp.totalPage = data.response.data.pagination.totalPage;
        this.pagenactiveemp.currentPage = data.response.data.pagination.pageNum;
        this.pageractiveemp = this.pageservice.getPager(this.pagenactiveemp.totalUsers, pageno, this.showItemActiveEmp);
        if ((pageno > 1) && (!this.attedance.length)) {
          this.search(pageno - 1,null)
        }
        for(let i=0;i<=this.attedance.length;i++){
          for(let j=0;j<=this.attedance[i].days.length;j++){
            this.attedance[i].isChecked = false
            var datee=this.attedance[i].days[j].date
            this.attedancedatelist.push(datee)
            console.log("GGGGGGGGGGG",this.attedancedatelist)
          }
        }
       
       
      },
      err => {
        
      }
    )
  }

 approve( ){
let approvedArray = [];
    for(let i=0;i<this.attedance.length;i++){
// let that = this;
      if (this.attedance[i].isChecked){
        console.log(this.attedance[i].days);
        
        approvedArray.push(
          {
            "employeeId":this.attedance[i].uniqueId, 
            "uniqueId":function(days){
              console.log(days);
              
              let daysArray = [];

              for(let j=0;j<days.length;j++){

                //check wether it is not undefined
                if(days[j].attendance.uniqueId){
                  daysArray.push(days[j].attendance.uniqueId)
                }
              }
              return daysArray;
            }(this.attedance[i].days)
            
        
          }
          );
      }
    }

    let body={

      "employees":approvedArray
    }
    console.log(body);
    this.apiService.putMethod2('/attendance/approved/allemployee',body).subscribe(data =>{
      alert("Approved Successfully");
      this.search(1,null)
     })

  }

  selcted(e,data,i){
    console.log("kkkkk",data)
    this.employeeid=data.uniqueId
    // this.checkbox=[]
    if(e.target.checked==true ){
    this.attedance[i].isChecked = true
      
      // for(let i=0;i<data.days.length;i++){
      //   this.checkbox.push(data.days[i].attendance.uniqueId);
      //   let body={
      //     "employeeId":data.uniqueId,
      //     "uniqueId":this.checkbox,
      //     }
      //     this.approvecheckbox.push(body)}
      // this.checkbox.push(data.days[i].attendance.uniqueId);}

     
    }else{
    this.attedance[i].isChecked = false

    }
   
    console.log( this.checkbox)
    
    // else {
    //   for(let i=0;i<this.checkbox.length;i++){
    //   if(data.uniqueId==this.checkbox[i])
    //   this.checkbox.splice(i, 1);
    //   }
    //   }
    }

    selectall(e){
      if(e.target.checked==true){
        // console.log("att",this.selectcheckbox)
      for (let i=0; i< this.attedance.length;i++){
        this.attedance[i].isSelected=this.selectcheckbox
        this.attedance[i].isChecked=true
        // console.log("attand",i)
        // for (let j=0; j < this.attedance[i].days.length;j++){
          
        //     this.checkbox.push(this.attedance[i].days[j].attendance.uniqueId);
           
        // }
        // let body={
        //   "employeeId":this.attedance[i].uniqueId,
        //   "uniqueId":this.checkbox,
        //   }
        //   this.approvecheckbox.push(body)
      }
      }else{
      for (let i=0; i< this.attedance.length;i++){
        this.attedance[i].isChecked=false
      }
      }
    }
  
    documentexcel(){
      let date=new Date().getDate()
      let body={
        "startDate":new Date(this.year+'-'+this.month+'-'+date).toJSON(),
        "dataAccess": {
          "isAccess": true,
          "userName":this.userObj.userName
        },
        "sortBy":"name",
     "sortOrder":1,
     "manager":this.userObj.userName,
    
     
      }
      this.apiService.downloadReport("/attendance/employeedaywisereport?resType=reportexcel", body).subscribe((data:any) =>{
        saveAs(data, 'attendance.xlsx')
      })
    }
    
    // Reject

    Reject( ){
      let rejectedArray = [];
          for(let i=0;i<this.attedance.length;i++){
      // let that = this;
            if (this.attedance[i].isChecked){
              console.log(this.attedance[i].days);
              
              rejectedArray.push(
                {
                  "employeeId":this.attedance[i].uniqueId, 
                  "uniqueId":function(days){
                    console.log(days);
                    
                    let daysArray = [];
      
                    for(let j=0;j<days.length;j++){
      
                      //check wether it is not undefined
                      if(days[j].attendance.uniqueId){
                        daysArray.push(days[j].attendance.uniqueId)
                      }
                    }
                    return daysArray;
                  }(this.attedance[i].days)
                  
              
                }
                );
            }
          }
      
          let body={
      
            "employees":rejectedArray
          }
          console.log(body);
          this.apiService.putMethod2('/attendance/rejected/allemployee',body).subscribe(data =>{
            alert("Rejected Successfully");
            this.search(1,null)
           })
      
        }

}
