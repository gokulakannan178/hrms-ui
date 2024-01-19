import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { DomSanitizer} from "@angular/platform-browser";
// import { $ } from 'protractor';
declare var $: any;
import * as myGlobals from '../../shared/globals';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  empid:any
  userObj:any
  emplyoee:any = {};
  emergencycontact:FormGroup;
  personalInformation:FormGroup;
  profile:FormGroup
  family:FormGroup
  departmentdetials:any
  designationdetials:any
  documentdetails:any 
  report:any
  familyunique:any=''
  employeeeducation:any
  educationinfo:any
  emplyoeeid:any
  employeeexp:any
  cert:any;
  experienceinfo:FormGroup
  addeducationinfo:FormGroup
  addexperienceinfo:FormGroup
  bankinfo:FormGroup
  addfamily:FormGroup
  educationid:any
  expid:any
  bankdetials:any
  maxDate:any;
  public apiUrl = myGlobals.base_api_url;
  photoUrldata:any;
 
  documentMasterId:any;
  documentpolcyid:any;
  employee:any;
  // spinner:any;
  certUrl:any;
  
  constructor(public apiService: ApiService,private sanitizer:DomSanitizer ,private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
     this.userObj=JSON.parse(sessionStorage.getItem("userObj")),
    this.empid=sessionStorage.getItem("empid"),
     this.emplyoeeid=this.empid.employeeId
    this.emergencycontact = new FormGroup({
      Primaryname: new FormControl("", Validators.required),
      Primaryrelation: new FormControl("", Validators.required),
      primaryphone: new FormControl("", Validators.required),
      primaryphone1: new FormControl("", Validators.required),
      secondaryname: new FormControl("", Validators.required),
      secondaryrelation: new FormControl("", Validators.required),
      secondaryphone: new FormControl("", Validators.required),
      secondaryphone1: new FormControl("", Validators.required),
    })
    this.personalInformation = new FormGroup({
      passportno: new FormControl("", Validators.required),
      passexpdate: new FormControl("", Validators.required),
      tel: new FormControl("", Validators.required),
      nationality: new FormControl("", Validators.required),
      Religion: new FormControl("", Validators.required),
      maritial: new FormControl("", Validators.required),
      spouse: new FormControl("", Validators.required),
      children: new FormControl("", Validators.required),
    })
    this.profile = new FormGroup({
      firstname: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      pincode: new FormControl("", Validators.required),
      phno: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      designation: new FormControl("", Validators.required),
      Reports: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),

    })
    this.family = new FormGroup({
      name: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      relationship: new FormControl("", Validators.required),
      mobile: new FormControl("", Validators.required),
    })

    this.addfamily = new FormGroup({
      name: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      relationship: new FormControl("", Validators.required),
      mobile: new FormControl("", Validators.required),
    })


    this.bankinfo = new FormGroup({
      bankname: new FormControl("", Validators.required),
      accountno: new FormControl("", Validators.required),
      ifsc: new FormControl("", Validators.required),
      accountName: new FormControl("", Validators.required),
      branch: new FormControl("", Validators.required),

    })

    this.educationinfo = new FormGroup({
      Institution: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      PassedOut: new FormControl("", Validators.required),
      Percentage: new FormControl("", Validators.required),
    })

    this.addeducationinfo = new FormGroup({
      Institution: new FormControl("", Validators.required),
      department: new FormControl("", Validators.required),
      PassedOut: new FormControl("", Validators.required),
      Percentage: new FormControl("", Validators.required),
    })
    this.experienceinfo = new FormGroup({
      companyname: new FormControl("", Validators.required),
      experience: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      yearOfWorking: new FormControl("", Validators.required),
    })
    this.addexperienceinfo = new FormGroup({
      companyname: new FormControl("", Validators.required),
      experience: new FormControl("", Validators.required),
      role: new FormControl("", Validators.required),
      yearOfWorking: new FormControl("", Validators.required),
    })
    this.getsingle()
    this.reports()
    this.department()
    this.designation()
    this.futureDateDisable()
    this.document()
    
    this.photoURL("")
  }
  education(id){
     this.educationid=id
    this.apiService.getMethod2("/employeeeducation",id).subscribe(
      data => {
        this.employeeeducation = data.response.data.EmployeeEducation
        this.educationinfo.get("Institution").setValue(this.employeeeducation.instituteName)
        this.educationinfo.get("department").setValue(this.employeeeducation.department)
        this.educationinfo.get("PassedOut").setValue(this.employeeeducation.yearOfPassout)
        this.educationinfo.get("Percentage").setValue(this.employeeeducation.percentage)
      })
}

experience(id){
  this.expid=id
  this.apiService.getMethod2("/employeeexperience",id).subscribe(
    data => {
      this.employeeexp = data.response.data.EmployeeExperience
      this.experienceinfo.get("companyname").setValue(this.employeeexp.companyName)
      this.experienceinfo.get("experience").setValue(this.employeeexp.experience)
      this.experienceinfo.get("role").setValue(this.employeeexp.role)
      this.experienceinfo.get("yearOfWorking").setValue(this.employeeexp.yearOfWorking)
      console.log("exp",this.employeeexp)
    })
}

singlebankinfo(id)
{
  this.apiService.getMethod2("/bankInformation",id).subscribe(
    data => {
      this.bankdetials = data.response.data.bankInformation
      this.bankinfo.get("bankname").setValue(this.bankdetials.bankName)
      this.bankinfo.get("accountno").setValue(this.bankdetials.accountNumber)
      this.bankinfo.get("ifsc").setValue(this.bankdetials.ifsc)
      this.bankinfo.get("accountName").setValue(this.bankdetials.accountName)
      this.bankinfo.get("branch").setValue(this.bankdetials.branch)

   
    })
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

  reports(){
    let body=
    {
      "status":['Active'],
      
    }
    this.apiService.postMethod("/user/filter",body).subscribe(
      data => {
        this.report = data.response.data.user
      })
}

  department(){
      let body=
      {
        "status":['Active']
      }
      this.apiService.postMethod("/Department/filter",body).subscribe(
        data => {
          this.departmentdetials = data.response.data.Department
        })
  }

  designation(){
    let body=
    {
      "status":['Active']
    }
    this.apiService.postMethod("/designation/filter",body).subscribe(
      data => {
        this.designationdetials = data.response.data.Designation
      })
}
document(){
  let body=
    {
      "employeeID" : this.empid.toString()
    }
    this.apiService.postMethod("/employeeDocuments/list",body).subscribe(
      data => {
        this.documentdetails = data.response.data.employeeDocuments.data
        console.log("docMaaster",data.response.data.employeeDocuments.data)
        this.documentpolcyid=data.response.data.employeeDocuments
        this.documentMasterId = data.response.data.employeeDocuments.data.uniqueId
        console.log("docMaster",this.documentMasterId)
        console.log("document", this.documentpolcyid.documentPolicyID)
        if (this.documentdetails.length >0){
          if (this.documentdetails[0].file != ""){
            // this.showdoc(this.documentdetails[0].file);
 console.log("first uri",this.documentdetails[0].file);

            this.photoURL(this.documentdetails[0].file)
          }
        }
      })
    }
      saveCertImage(event,data2,uri,index) {
        // alert(index)
        this.employee=data2;
        console.log("data?",data2,index   )
        console.log("uri?",uri)
        console.log("event",event)
        console.log("eventtttt",event.target.files[0])
        // this.spinner.show();
        this.apiService.postFile('/common/docupload/documents', event.target.files[0]).subscribe(
          data => {
            // this.spinner.hide();
            this.certUrl = data.response.data.uri;
            console.log("uploaded file data", data);
            console.log("uploaded file", this.certUrl);
            let body={
              employeeID:this.empid.toString(),
              documentPolicyID:this.documentpolcyid.documentPolicyID,
              documentMasterID:data2.uniqueId,
              uri:this.certUrl,
           
            }
            this.apiService.putMethod2('/employeeDocuments/updateDocument',body).subscribe( data => {
              console.log(data);
                alert("Uploaded Successfully")  
                this.photoURL(null)
                this.document()
            },err=> {
              console.log(err); 
            }); 
            
          },
          err => {
            this.spinner.hide();
            console.log(err);
          }
        )
      } 
      photoURL(url) {
        this.photoUrldata=""
      if (url == ""){
       return "../../../assets/img/download.png"
      }
      
       this.photoUrldata = this.sanitizer.bypassSecurityTrustResourceUrl(this.apiUrl+ url);
       console.log("photoUrldata",this.photoUrldata);
       
       return this.photoUrldata;
       }
    showdoc(file){
        console.log("view file - ",file);
        
        this.photoURL(file)
      }
      public downloadExcel(fileuri) {
        // this.spinner.show();
        // this.apiService.downloadReport(fileuri, {}).subscribe(
        //   data => {
        //     this.spinner.hide();
            
        //     saveAs(data);
        //   },
        //   err => {
        //     this.spinner.hide();
        //   }
        // )
       
            // saveAs(this.certUrl);
            saveAs(this.apiUrl+fileuri);

        
      }

  getsingle(){
    this.apiService.getMethod2("/employee" ,this.empid).subscribe(
      data => {
        this.emplyoee = data.response.data.data
        console.log("AAA",this.emplyoee)

        this.profile.get("firstname").setValue(this.emplyoee.name)
        this.profile.get("dob").setValue(this.apiService.getDate1(this.emplyoee.dob))
        this.profile.get("gender").setValue(this.emplyoee.gender)
        this.profile.get("address").setValue(this.emplyoee.address.al1)
        this.profile.get("state").setValue(this.emplyoee.address.stateCode)
        this.profile.get("phno").setValue(this.emplyoee.mobile)
        this.profile.get("department").setValue(this.emplyoee.departmentId)
        this.profile.get("pincode").setValue(this.emplyoee.address.postalCode)
        this.profile.get("designation").setValue(this.emplyoee.designationId)
        this.profile.get("Reports").setValue(this.emplyoee.lineManager)
        this.profile.get("email").setValue(this.emplyoee.email)
        
        this.personalInformation.get("passportno").setValue(this.emplyoee.personalInformation.passportNo)
        this.personalInformation.get("passexpdate").setValue(this.emplyoee.personalInformation.passportExpDate)
        this.personalInformation.get("tel").setValue(this.emplyoee.personalInformation.telephone)
        this.personalInformation.get("nationality").setValue(this.emplyoee.personalInformation.nationality)
        this.personalInformation.get("Religion").setValue(this.emplyoee.personalInformation.religion)
        this.personalInformation.get("maritial").setValue(this.emplyoee.personalInformation.maritalStatus)
        this.personalInformation.get("spouse").setValue(this.emplyoee.personalInformation.maritalStatus)
        this.personalInformation.get("children").setValue(this.emplyoee.personalInformation.noOfChildrens)

        this.emergencycontact.get("Primaryname").setValue(this.emplyoee.emergencyContact.primary.fullName)
        this.emergencycontact.get("Primaryrelation").setValue(this.emplyoee.emergencyContact.primary.relationship)
        this.emergencycontact.get("primaryphone").setValue(this.emplyoee.emergencyContact.primary.phoneNumber)
        // this.emergencycontact.get("primaryphone1").setValue(this.emplyoee.emergencyContact.primary.phoneNumber[1])
        this.emergencycontact.get("secondaryname").setValue(this.emplyoee.emergencyContact.secondary.fullName)
        this.emergencycontact.get("secondaryrelation").setValue(this.emplyoee.emergencyContact.secondary.relationship)
        this.emergencycontact.get("secondaryphone").setValue(this.emplyoee.emergencyContact.secondary.phoneNumber)
        // this.emergencycontact.get("secondaryphone1").setValue(this.emplyoee.emergencyContact.secondary.phoneNumber[1])
      },
      err => {
        // this.spinner.hide();
      }
    )
  }
// update emergency
  emergencycont(){
  
    let phno=[]
    phno.push(this.emergencycontact.value.primaryphone)
    phno.push(this.emergencycontact.value.primaryphone1)
    let phno1=[]
    phno1.push(this.emergencycontact.value.secondaryphone)
    phno1.push(this.emergencycontact.value.secondaryphone1)

    var body={
      "primary" : {
        "fullName" : this.emergencycontact.value.Primaryname,
        "relationship" : this.emergencycontact.value.Primaryrelation,
        "phoneNumber" :phno
    },
    "secondary" : {
        "fullName" : this.emergencycontact.value.secondaryname,
        "relationship" : this.emergencycontact.value.secondaryrelation,
        "phoneNumber" :phno1

    }

  }
  this.apiService.putMethod6("/employee/updateEmergencyContact" ,this.emplyoee.uniqueId,body).subscribe(
    data => {
      this.getsingle()
      // $('#emergency_contact_modal').modal('hide')
      $("#emergency_contact_modal").modal("hide");

      // this.emplyoee = data.response.data.data
    },
    err => {
      // this.spinner.hide();
    }
  )
}
// update personalinfo
personalinfo(){
 
  var body={
    "passportNo" : this.personalInformation.value.passportno,
    "passportExpDate" : new Date (this.personalInformation.value.passexpdate).toJSON(),
    "telephone" : this.personalInformation.value.tel,
    "nationality" : this.personalInformation.value.nationality,
    "religion" : this.personalInformation.value.Religion,
    "maritalStatus" : this.personalInformation.value.maritial,
    "employmentOfSpouse" : this.personalInformation.value.spouse,
    "noOfChildrens" : this.personalInformation.value.children

}
this.apiService.putMethod6("/employee/updatePersonalInformation" ,this.emplyoee.uniqueId,body).subscribe(
  data => {
    this.getsingle()
    // $('#emergency_contact_modal').modal('hide')
    $("#personal_info_modal").modal("hide");

    // this.emplyoee = data.response.data.data
  },
  err => {
    // this.spinner.hide();
  }
)
}

profileupdate(){

  var body={
    "mobile" : this.profile.value.phno,
    "email":this.profile.value.email,
    "dob":new Date(this.profile.value.dob).toJSON(),
                 "address":{
                    "stateCode": this.profile.value.state,
                    "al1": this.profile.value.address,
                    "postalCode": this.profile.value.pincode,
                   },
    "gender":this.profile.value.gender,
    "lineManager":this.profile.value.Reports,
    "designationId":this.profile.value.designation,
    "departmentId":this.profile.value.department,
    "name":this.profile.value.firstname

}
this.apiService.putMethod6("/employee/updateBioData" ,this.emplyoee.uniqueId,body).subscribe(
  data => {
    this.getsingle()
    $("#profile_info").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}

// getsingle of family information
familyinfo(data){
        this.familyunique=data.uniqueId
        this.family.get("name").setValue(data.name)
        this.family.get("dob").setValue(this.apiService.getDate1(data.dob))
        this.family.get("relationship").setValue(data.relationship)
        this.family.get("mobile").setValue(data.phone)
}

addfamilyinfo(){
  if(this.addfamily.invalid){
    alert("Fill all the Fields")
   return
  }
  var body=
  {
    "employeeID":this.emplyoee.uniqueId,
    "name":this.addfamily.value.name,
    "relationship":this.addfamily.value.relationship,
    "dob":new Date(this.addfamily.value.dob).toJSON(),
    "phone":this.addfamily.value.mobile,
}
this.apiService.postMethod("/employeefamilymembers",body).subscribe(
  data => {
    this.getsingle()
    $("#addfamily_info_modal").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}

familyinfoupdate(){

  var body=
  {
    "uniqueId": this.familyunique,
    "employeeID":this.emplyoee.uniqueId,
    "name":this.family.value.name,
    "relationship":this.family.value.relationship,
    "dob":new Date(this.family.value.dob).toJSON(),
    "phone":this.family.value.mobile,
}
this.apiService.putMethod2("/employeefamilymembers",body).subscribe(
  data => {
    this.getsingle()
    $("#family_info_modal").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}

familyinfodelete(data){
  var result = confirm("Are you sure to delete?");
  if (result) {
this.apiService.deleteMethod1("/employeefamilymembers/status/delete",data.uniqueId).subscribe(
  data => {
    this.getsingle()
  },
  err => {
    // this.spinner.hide();
  }
)
  }
}

delexperience(id){
  var result = confirm("Are you sure to delete?");
  if (result) {
this.apiService.deleteMethod1("/employeeexperience/status/delete",id).subscribe(
  data => {
    this.getsingle()
  },
  err => {
    // this.spinner.hide();
  }
)
  }
}

deleducation(id){
  var result = confirm("Are you sure to delete?");
  if (result) {
this.apiService.deleteMethod1("/employeeeducation/status/delete",id).subscribe(
  data => {
    this.getsingle()
  },
  err => {
    // this.spinner.hide();
  }
)
  }
}

// education add
addeducation(){
  if(this.addeducationinfo.invalid){
    alert("Fill all the Fields")
   return
  }
  var body=
  {
    
    "employeeID":this.emplyoee.uniqueId,
    "instituteName":this.addeducationinfo.value.Institution,
    "yearOfPassout": parseInt(this.addeducationinfo.value.PassedOut),
    "percentage": parseFloat(this.addeducationinfo.value.Percentage),
    "department": this.addeducationinfo.value.department,
    // "organisationId": "1"
}
this.apiService.postMethod("/employeeeducation",body).subscribe(
  data => {
    this.getsingle()
    this.addeducationinfo.reset();
    $("#addeducation_info").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}

// education update
updateeducation(){

  var body=
  {
    "uniqueId": this.educationid,
    "employeeID":this.emplyoee.uniqueId,
    "instituteName":this.educationinfo.value.Institution,
    "yearOfPassout": parseInt(this.educationinfo.value.PassedOut),
    "percentage": parseFloat(this.educationinfo.value.Percentage),
    "department": this.educationinfo.value.department,
    // "organisationId": "1"
}
this.apiService.putMethod2("/employeeeducation",body).subscribe(
  data => {
    this.getsingle();
    this.addeducationinfo.reset();
    $("#education_info").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}

// experience update

// educationexp update
addexp(){
  if(this.addexperienceinfo.invalid){
    alert("Fill all the Fields")
   return
  }
  var body=
  {

      "employeeID": this.emplyoee.uniqueId,
      "companyName":this.addexperienceinfo.value.companyname,
      "yearOfWorking":parseInt(this.addexperienceinfo.value.yearOfWorking),
      "experience": this.addexperienceinfo.value.experience,
      "role": this.addexperienceinfo.value.role,
  }
  
  
this.apiService.postMethod("/employeeexperience",body).subscribe(
  data => {
    this.getsingle()
    $("#addexperience_info").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}
// educationexp update
updateexp(){

  var body=
  {
      "uniqueId": this.expid,
      "employeeID": this.emplyoee.uniqueId,
      "companyName":this.experienceinfo.value.companyname,
      "yearOfWorking":this.experienceinfo.value.yearOfWorking,
      "experience": this.experienceinfo.value.experience,
      "role": this.experienceinfo.value.role,
  }
  
  
this.apiService.putMethod2("/employeeexperience",body).subscribe(
  data => {
    this.getsingle()
    $("#experience_info").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}

// update bank
bankupdate(){

  var body=
  {
      "uniqueId": this.bankdetials.uniqueId,
      "employeeID": this.emplyoee.uniqueId,
    "bankName":this.bankinfo.value.bankname,
    "branch":this.bankinfo.value.branch,
    "accountName":this.bankinfo.value.accountName,
    "ifsc":this.bankinfo.value.ifsc,
    "accountNumber":this.bankinfo.value.accountno
  }
  
  
this.apiService.putMethod2("/bankInformation/updateEmployeBankInfromation",body).subscribe(
  data => {
    this.getsingle()
    $("#bank_info").modal("hide");

  },
  err => {
    // this.spinner.hide();
  }
)
}
}
