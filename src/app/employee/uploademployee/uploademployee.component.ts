import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { PagerService } from "../../services/pager.service";
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $:any;

@Component({
  selector: 'app-uploademployee',
  templateUrl: './uploademployee.component.html',
  styleUrls: ['./uploademployee.component.css']
})
export class UploademployeeComponent implements OnInit {
  public term: any;
  uploadfile:FormGroup
  fileName: any;
  employeedata:any;
  
   constructor(
    private apiService: ApiService,
    private readonly router: Router, private spinner: NgxSpinnerService,
    public pagerservice: PagerService,
    private formBuilder: FormBuilder,
    
  ) { }

  ngOnInit(): void {
    this.uploadfile = this.formBuilder.group({
      'profile':new FormControl(null, Validators.required),
    });
   
  }
  search(){

  }
  Fileselect(event){
    console.log(event)
   if(event.target.files.length > 0){
    let file = event.target.files[0];
    this.fileName = file.name;
    console.log(file);
    this.uploadfile.get('profile').setValue(file);
   
   }

  }
  uploading(pageno){
    let formData = new FormData();
    console.log(formData);
    console.log(this.uploadfile.get('profile').value);
    formData.append('file', this.uploadfile.get('profile').value);
     this.apiService.postMethod("/employee/upload",formData).subscribe(
      (data=>{
      this.employeedata=data.response.data.EmployeeUpload
        console.log(data)
      })
     )
  }
  reset(){
    this.uploadfile.get('profile').setValue("");
   this.fileName='';

  }
}
