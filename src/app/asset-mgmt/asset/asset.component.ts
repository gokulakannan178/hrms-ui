import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as myGlobals from '../../shared/globals';
import { NgxSpinnerService } from 'ngx-spinner';
import { saveAs } from 'file-saver';
declare var $:any;
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  showItemActive: number = 10;
  showItemDisabled: number = 10;
  showItemAssigned: number = 10;
  
  active_count: 0
  disabled_count: 0
  assigned_count: 0

  pagerActive: any = {};
  pagenActive: any = {};

  pagerDisabled: any = {};
  pagenDisabled: any = {};

  pagerAssigned:any = {};
  pagenAssigned: any = {};
  asset_assign:any;

  public activeAsset: any = [];
  public disabledAsset: any = [];
  public AssignedAsset: any = [];
  employeforms:FormGroup;
  org_dd :any [];
  typedetials:any;
  empid:any;
  employe_id:any;
  addemploye;any;
  assetid:any
  userObj:any;
  selectedPropertiesObj : any={};
  public term: any;
  submitted:boolean;
  constructor(
    public apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService
  ) { }
  ngOnInit(): void {
    this.userObj= JSON.parse(sessionStorage.getItem('userObj'))

    this.getAllActiveAsset(null,1);
    this.getAllDisabledAsset(null,1);
    this.getAllAssingedAsset(null,1);
    this.getemploye();
    this.employeforms=new FormGroup({
      name:new FormControl("",Validators.required),
    })
  }
 

  search(){
    this.getAllActiveAsset(this.term, 1)
    this.getAllDisabledAsset(this.term, 1)
    this.getAllAssingedAsset(this.term, 1)

    this.spinner.hide();
  }
  status(id, type) {
    this.empid=id;
    this.typedetials=type
    
  }

  sumbitstatus(){
  
    if (this.typedetials == 'enable' || this.typedetials == "disable") {
      this.spinner.show();
      this.apiService.putMethod("/asset/status/" + this.typedetials, this.empid).subscribe(
        data => {
          // var result1 = confirm("Are you sure to move?")
          $("#disableModal").modal("hide");    
           $("#activeModal").modal("hide");    
           
  
           this.getAllActiveAsset(null, 1);
          this.getAllDisabledAsset(null, 1);
          
        }, err => {
          this.spinner.hide()
          console.log(err)
        }
      )
    }
  }
  delete(){
    
    if (this.typedetials == 'delete') {
        this.spinner.show();
        this.apiService.deleteMethod1('/asset/status/delete', this.empid).subscribe(
          data => {
            $("#deleteModal").modal("hide");  
  
            this.getAllActiveAsset(null, 1);
          this.getAllDisabledAsset(null, 1);
          this.getAllAssingedAsset(null,1);
        }, err => {
          this.spinner.hide();
          console.log(err);
        });
      } 
    }
  
  cancelpop(){
   
    this.getAllActiveAsset(null, 1);
    this.getAllDisabledAsset(null, 1);
    this.getAllAssingedAsset(null,1);
  }
  
  useraction(type,data){
    if(type == 'view'){
      sessionStorage.setItem("assetTypeViewId",data)
     }
     else if(type == 'edit'){
      sessionStorage.setItem("assetTypeViewId",data)
     }
    else if(type == 'assignedEmploye'){
      // this.emplyoeeforms=data.employee.uniqueId
      this.assetid=data.uniqueId

      sessionStorage.setItem("assetTypeViewId",data.id)
    }
  }
  
  saveActiveItems(num){}
  saveDisabledItems(num){}
  saveAssignedItems(num){}
  setPage(page: number) {
    if (page < 1 || page > this.pagenActive.totalPage) {
      return;
    }
    this.getAllActiveAsset(null, page);
  }

  setPageDisabled(page: number) {
    if (page < 1 || page > this.pagenDisabled.totalPage) {
      return;
    }
    this.getAllDisabledAsset(null, page);
  }
   setpagedAssigned(page:number){
    if  (page < 1 || page > this.pagenAssigned.totalPage){
      return;
    }
    this.getAllAssingedAsset(null,page);
   }
active(){
  this.asset_assign="Active";
}
  public getAllActiveAsset(search, pageno) {

    this.spinner.show();
    var body =
    {
      "status": ["Active"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy": "name",
      "sortOrder": 1 
      
    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          name: search
        }
      }
    }
    this.apiService.postMethod("/asset/filter?pageno=" + pageno + "&limit=" + this.showItemActive, body).subscribe(data => {
      this.spinner.hide();
      this.activeAsset = data.response.data.Asset;
      this.active_count = data.response.data.pagination.count;
      this.pagenActive.totalUsers = data.response.data.pagination.count;
      this.pagenActive.totalPage = data.response.data.pagination.totalPage;
      this.pagenActive.currentPage = data.response.data.pagination.pageNum;
      this.pagerActive = this.pagerservice.getPager(this.pagenActive.totalUsers, pageno, this.showItemActive);
      if ((pageno > 1) && (!this.activeAsset.length)) {
        this.getAllActiveAsset(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
getemploye(){
  let body={
    
  }
  this.apiService.postMethod("/employee/filter?pageno=no" ,body).subscribe( data => {
   console.log('employe',data);
   this.employe_id=data.response.data.data
  } ) 
  }
  addemp(){
    this.submitted=true;
    if(this.employeforms.invalid){
      alert("Fill all the Fields ")
      return
    } 
    var body ={
      assetId:this.assetid,
      employeeId:this.employeforms.value.name,
      // "uniqueId":this.addemploye,
      // "name":this.employeforms.value.name
    }
    // let sendingProp = []
    //   for (const [key, value] of Object.entries(this.selectedPropertiesObj)) {
    //     // console.log("hhhhhhhhhhhh",`${key}: ${value}`);
    //     sendingProp.push(
    //       {
    //         "assetPropertyId":key,
    //         "value":value,
    //       }
    //     )
    //   }
    //   body["assetPropertysId"]=sendingProp

      this.apiService.postMethod('/asset/assign',body).subscribe( data => {
        console.log(data);
          
          $('#AssignModal').modal('hide')
          this.getAllActiveAsset(null,1)
          this.getAllDisabledAsset(null,1)
          this.getAllAssingedAsset(null,1)

          // this.router.navigate(['/asset-mgmt/asset'])
      },err=> {
        console.log(err);
      }); 
 
  }
 
disabled(){
  this.asset_assign="Disabled"
}
  public getAllDisabledAsset(search, pageno) {
   
    this.spinner.show();
    
    var body =
    {
      "status": ["Disabled"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy": "name",
      "sortOrder": 1
      
    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          name: search
        }
      }
    }
    this.apiService.postMethod("/asset/filter?pageno=" + pageno + "&limit=" + this.showItemDisabled, body).subscribe(data => {
      this.spinner.hide();
      this.disabledAsset= data.response.data.Asset;
      this.disabled_count = data.response.data.pagination.count;
      this.pagenDisabled.totalUsers = data.response.data.pagination.count;
      this.pagenDisabled.totalPage = data.response.data.pagination.totalPage;
      this.pagenDisabled.currentPage = data.response.data.pagination.pageNum;
      this.pagerDisabled = this.pagerservice.getPager(this.pagenDisabled.totalUsers, pageno, this.showItemDisabled);
      if ((pageno > 1) && (!this.disabledAsset.length)) {
        this.getAllDisabledAsset(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
assigned(){
  this.asset_assign="Assigned"
}
  public getAllAssingedAsset(search, pageno) {
   
    this.spinner.show();
    var body =
    {
      "status": ["Assigned"],
      "dataAccess": {
        "isAccess": true,
        "userName":this.userObj.userName
      },
      "sortBy": "name",
      "sortOrder": 1
      
    }
    if (search) {
      if (search != "") {
        body["regex"] =
        {
          name: search
        }
      }
    }
    this.apiService.postMethod("/asset/filter?pageno=" + pageno + "&limit=" + this. showItemAssigned, body).subscribe(data => {
      this.spinner.hide();
      this.AssignedAsset = data.response.data.Asset;
      this.assigned_count = data.response.data.pagination.count;
      this.pagenDisabled.totalUsers = data.response.data.pagination.count;
      this.pagenDisabled.totalPage = data.response.data.pagination.totalPage;
      this.pagenDisabled.currentPage = data.response.data.pagination.pageNum;
      this.pagerDisabled = this.pagerservice.getPager(this.pagenDisabled.totalUsers, pageno, this.showItemAssigned);
      if ((pageno > 1) && (!this.AssignedAsset.length)) {
        this.getAllDisabledAsset(null, pageno - 1)
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }
  excel(){
  
      let body ={
        "status":[this.asset_assign],
        "dataAccess": {
          "isAccess": true,
          "userName":this.userObj.userName
        },
      }
      this.apiService.downloadReport("/asset/filter?resType=reportexcel" ,body).subscribe( data => {
        saveAs(data, 'asset.xlsx')
      })
    }

}
