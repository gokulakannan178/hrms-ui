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
 
declare var $:any;
@Component({
  selector: 'app-edit-billclaim',
  templateUrl: './edit-billclaim.component.html',
  styleUrls: ['./edit-billclaim.component.css']
})
export class EditBillclaimComponent implements OnInit {
  public apiUrl = myGlobals.base_api_url;
  addclaimforms:FormGroup;
  editbillForms:FormGroup;
  newbillForms:FormGroup;
  public Submittedview: boolean;
  public Submitted: boolean;
  public Submittedadd: boolean;
  public Submittedviewview: boolean;
  public billDetails: any = []; 
  subbilldetails:any=[];
  cert:any;
  editIndex:number;
  certUrl:any;
  id:any;
  edit_id:any;
  total:any=0;
  buttonText1:any;
  userObj:any;
  empid:any;
  uniqId:any;
  getapplication:any;
  public modalHeaderText: string = 'New Bill';
  public modalButtonText:string = 'Submit';
maxDate:any;
  constructor( public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService) { }

  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj')),
    this.empid=sessionStorage.getItem("empid"),
this.futureDateDisable();
    this.addclaimforms = new FormGroup({
      tit: new FormControl("", Validators.required),
      desc: new FormControl("", Validators.required),

    })
    this.editbillForms = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required),
      index: new FormControl(0),

    })
    this.newbillForms = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      amount: new FormControl("", Validators.required),

    })
    this.getsingleapi();
  }
  addbill(type){

    if(this.newbillForms.invalid){
      alert("Fill all fields")
      console.log(this.newbillForms)
      this.Submittedadd = false
      return
    }
    this.Submittedadd = true;
    // this.subbilldetails=[];
    if (type === 'Save') {
      let body = {
        "title": this.newbillForms.controls.title.value,
        "desc": this.newbillForms.controls.description.value,
        "amount":this.newbillForms.controls.amount.value, 
        "date":new Date(this.newbillForms.controls.date.value).toJSON(), 
        "file":this.certUrl,
      }
      this.subbilldetails.push(body);
    
    //add total amount
    this.billtotal();
      console.log("billcheck",this.subbilldetails);
    
      $("#langModal").modal("hide");
      this.newbillForms.get("title").setValue('');
      this.newbillForms.get("description").setValue('');
      this.newbillForms.get("amount").setValue('');
      this.newbillForms.get("date").setValue('');
      }
      err => {
        this.spinner.hide();
        console.log(err);
      };
     
      }

  get fr() {
    return this.addclaimforms.controls;
  }
  get fradd() {
    return this.newbillForms.controls;
  }

  get frview() {
    return this.editbillForms.controls;
  }

  openNewModal(){
    this.modalButtonText = 'Save';
    this.modalHeaderText = 'Add Expense';
    this.editbillForms.get("title").setValue('');
    this.editbillForms.get("description").setValue('');
    this.editbillForms.get("date").setValue('');
    this.editbillForms.get("amount").setValue('');

  }

  saveCertImage(event) {
    console.log("event",event)
    console.log("eventtttt",event.target.files[0])
    this.spinner.show();
    this.apiService.postFile('/common/docupload/billclaims', event.target.files[0]).subscribe(
      data => {
        this.spinner.hide();
        this.certUrl = data.response.data.uri;
      },
      err => {
        this.spinner.hide();
        console.log(err);
      }
    )
  }
  
 
getsingleapi(){
  this.uniqId= localStorage.getItem('uniqueid'),

  this.apiService.getMethod2("/billClaim", this.uniqId).subscribe( data => {
    console.log("hello",data);
    this.getapplication = data.response.data.data;
    this.subbilldetails=this.getapplication.bills,
     this.billtotal();
    this.addclaimforms.controls['tit'].setValue( this.getapplication.title);
    this.addclaimforms.controls['desc'].setValue( this.getapplication.desc);
    
    // this.subbilldetails[i].title=this.editbillForms.controls.title.value
   
  },err=> {
    console.log(err); 
});
}
futureDateDisable(){
  var date:any=new Date();
  var todayDate:any=date.getDate();
  var month:any=date.getMonth()+1;
  var year:any=date.getFullYear();
  if(todayDate < 10){
    todayDate='0' + todayDate
  }
  if(month < 10){
    month='0' + month
  }
  this.maxDate = year + '-' + month + '-' + todayDate;

}
//Looping amount into array
  billtotal(){
    this.total=0;
    for (let i=0;i<this.subbilldetails.length;i++){
     this.total = this.total + this.subbilldetails[i].amount;
     console.log("totallll",this.total);
     } 
   }
// Sub Edit icon
    editsubbill(bill,index){
      this.certUrl = "";
      this.editIndex=index;
      console.log("index value",bill)
      this.modalButtonText = 'Update';
    this.modalHeaderText = 'Edit Expense';

    this.editbillForms.get("title").setValue(bill.title);
    this.editbillForms.get("description").setValue(bill.desc);
     this.editbillForms.get("amount").setValue(bill.amount);
    this.editbillForms.get("date").setValue(this.apiService.getDate1(bill.date) );
    this.editbillForms.get("index").setValue(index);
    this.cert=bill.file;
    
    this.billtotal();

  }
//End Sub Edit icon

//Pop up Update
  updatebill(){
    // "title": this.editbillForms.controls.title.value,
      this.subbilldetails[this.editIndex].title=this.editbillForms.controls.title.value
      this.subbilldetails[this.editIndex].desc=this.editbillForms.controls.description.value
      this.subbilldetails[this.editIndex].amount=this.editbillForms.controls.amount.value
      this.subbilldetails[this.editIndex].date= new Date(this.editbillForms.controls.date.value).toJSON(),
      // this.editbillForms.controls.date.value
      console.log("this.certUrl",this.certUrl); 
      
      if ( this.certUrl != ""){
        this.subbilldetails[this.editIndex].file=this.certUrl

      }
      alert("Updated Successfully")
      console.log("updated index",this.editIndex);
      console.log(this.subbilldetails);
    $("#langModalEdit").modal("hide");
    this.billtotal();

  }
  //End popup Update

  delete(index){
    this.subbilldetails.splice(index,1);
    this.billtotal();
  }

  // Page Update

  updatetotbill(){
    var body={
      "uniqueId":this.uniqId,
      "title": this.addclaimforms.controls.tit.value,
      "desc": this.addclaimforms.controls.desc.value,
      "employeeId":this.userObj.employeeId,
      "bills":this.subbilldetails,
    }
    console.log("payload",body)
    this.apiService.putMethod2('/billClaim',body).subscribe( data => {
      console.log(data);
        alert("Updated Successfully")  
        this.router.navigate(['/accounts/bill_claim'])
    },err=> {
      console.log(err); 
    }); 
    this.billtotal();
  }
  //End Page update 
  


}
