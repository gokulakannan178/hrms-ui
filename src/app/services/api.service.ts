import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../shared/globals';
import { Observable } from 'rxjs';
import { ApiResponse } from "../services/api.response";
import { DataSharingServiceService } from '../service/data-sharing-service.service';
import { Router } from '@angular/router';
// import { DatePipe } from '@angular/common';   
import{map}from 'rxjs/operators'


// import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  role: any
  private LoggedInStatus: boolean = false;

  public APIURL = myGlobals.base_api_url;
  private AccessToken = sessionStorage.getItem('UserToken');
  

  constructor(private http: HttpClient,private dataSharingService: DataSharingServiceService, private router: Router) { }

  postMethod(type, body): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIURL + type, body)
  }
  postMethodwithBUrl(type, body): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(type, body)
  }
  putMethodwithBUrl(type, body): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(type, body)
  }
  
  putmethod1(type,id): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type+'?id='+id,'')
  }
  putMethod6(type, id,body): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type + '?id=' + id,body);
  }
  postMethod1(type, body): Observable<any> {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<any>(this.APIURL + type, body, {
      headers: new HttpHeaders().append("Content-Type", "application/x-www-form-urlencoded"),
      withCredentials: true
    })
  }
  getMethodWithOutUrl(type): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(type);
  }
  getMethod(type, id): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIURL + type + '/' + id,)
  }

  getMethod2(type, id): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIURL + type + '?id=' + id,)
  }
  getMethod1(type, id): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIURL + type + '?Employeeid=' + id,)
  }
  getMethod5(type, id): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIURL + type + '?employeeId=' + id,)
  }
  getMethod8(type, id): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIURL + type + '?amount=' + id,)
  }

  getMethod3(type): Observable<ApiResponse> {
    // let obj = JSON.parse(sessionStorage.userObj);
    // let headers = new HttpHeaders({ "X-Requested-With": "Mobile" });
    //  "token": obj.id
    return this.http.get<ApiResponse>(this.APIURL + type,);
  } 
  getMethod4(type): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(this.APIURL + type)
    }

  putMethod(type, id): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type + '?id=' + id,'');
  }

  putMethod2(type, body): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type, body)
  }
  postMethod2Doc(type, body): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.APIURL + type, body,)
  }

  putMethod3(type, id): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type + '/' + id,'');
  }

  putMethod4(type, id): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type + id, '',);
  }
  
  putMethod5(type,id): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type+'?id='+id,'');
  }
  putMethod7(type,idorg,idparam):Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type+'?id='+idorg+'&status='+idparam,'');
  }

  postMethod6(type,idorg,idparam):Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.APIURL + type+'?farmerorg='+idorg+'&param='+idparam,'');
  }
  getMethodWithOutUrl1(type): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.APIURL+type);
  }
   
getUserACL(){
  let userObj= JSON.parse(sessionStorage.getItem('userObj'))
  console.log("geting acl user",userObj);
  
  if (sessionStorage.getItem("useracl")){
    return sessionStorage.getItem("useracl")
  }
  if(userObj.type){
    this.getMethodWithOutUrl1("/useracl/usertype?id="+userObj.type).subscribe(
      data => {
        sessionStorage.setItem("useracl", JSON.stringify(data.response.data.useracl));
        return data.response.data.useracl
      })  
  }else{
    return
  }
 
}
getlinemanagecheck(){
  let lineManagercheck=JSON.parse(sessionStorage.getItem('linemangerid'))
  return lineManagercheck
}
chkUserACLAccess(key){
  let keys=key.split("_")
  let key1,key2 =""
  if (keys[0]){
    key1=keys[0]
  }
  if (keys[1]){
    key2=keys[1]
  }
  let userAcl = JSON.parse( sessionStorage.getItem("useracl"))
  if (!sessionStorage.getItem("useracl")){
    userAcl= this.getUserACL()
  }
  // console.log(key1,key2);
 
  
  if (key1 != "" && key2 != ""   ){
    if (userAcl[key1][key2]== "Yes"){
      return true
    }
  }
  return false
}


 
  deleteMethod4(type): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.APIURL + type,);
  }
  deleteMethod1(type,id): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.APIURL + type+'?id='+id);
  }
 
  deleteMethodWithOutUrl(type): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(type);
  }
  getDate(date) {
    let d = new Date(date);
    let month = [{ name: "Jan", val: 1 }, { name: "Feb", val: 2 }, { name: "Mar", val: 3 }, { name: "Apr", val: 4 }, { name: "May", val: 5 }, { name: "June", val: 6 }, { name: "July", val: 7 }, { name: "Aug", val: 8 }, { name: "Sept", val: 9 }, { name: "Oct", val: 10 }, { name: "Nov", val: 11 }, { name: "Dec", val: 12 }]
    for (let i = 0; i < month.length; i++) {
      if (month[i].val == (d.getMonth() + 1)) {
        return (("0" + (d.getDate())).slice(-2) + "-" + month[i].name + "-" + d.getFullYear());
      }
    }
  }
  getDate1(date) {
    if (!date) {
      return "NA";
    }
    var d = new Date(date);
    return (d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + (d.getDate())).slice(-2));
  }

  getDatee(date){
    if (!date) {
      return "NA";
    }
    var d = new Date(date).toJSON();
    return d;

  }
  

  // getTime(date){
  //   var t = new Date(date);
  //   var time= t.getUTCHours() + ':' + t.getUTCMinutes();
  //   console.log ("timeeee",time);
  //   return (t.getUTCHours() + ':' + t.getUTCMinutes());
    
  // }

  public downloadReport(url, body): Observable<any> {

    return this.http.post(this.APIURL + url, body, {

        responseType: "blob",

        headers: new HttpHeaders().append("Content-Type", "application/json")

    });

}
  postFiles(type, fileToUpload: Array<File>): Observable<ApiResponse> {
    const endpoint = this.APIURL + type;
    const formData: FormData = new FormData();
    console.log("in postfile",fileToUpload.length);
    
    for (let i = 0; i < fileToUpload.length; i++) {
        formData.append('uploadfile', fileToUpload[i]);
    }
    // const formData: FormData = new FormData();
    //formData.append('smsType', "N");
    //formData.append('knowledgeDomain', {
   //     "id": this.smsForm.value.subDomain
    //  },);
    //postFilesWithFormData("",formData)

    return this.http.post<ApiResponse>(endpoint, formData);
}

postFile(type, fileToUpload: File): Observable<ApiResponse> {

  const endpoint = this.APIURL + type;

  const formData: FormData = new FormData();

  formData.append('uploadfile', fileToUpload);

  return this.http.post<ApiResponse>(endpoint, formData);

}
postFilesWithFormData(type,formData): Observable<ApiResponse> {
  return this.http.post<ApiResponse>(this.APIURL + type, formData,);
}

getuserdeissemination(org,project,state,district,block,grampanchayat,village,date){
  let body={
    "status":["Active"]
  }
  if(org!=null){
    body["organisationId"]=org
  } 
  //  if(project!=null){
  //   body["project"]=org
  // }  
  if(district!=null){
    body["district"]=district
  }  if(state!=null){
    body["state"]=state
  }
    // if(block!=null){
  //   body["block"]=block
  // }  if(grampanchayat!=null){
  //   body["grampanchayat"]=grampanchayat
  // }  if(village!=null){
  //   body["village"]=village
  // }
  // if(date!=null){
  //   body["dateOfDissemination"]=date
  // }
return this.http.post<ApiResponse>(this.APIURL + "user/filter?pageno=no" , body)
}
getfarmerdeissemination(org,project,state,district,block,grampanchayat,village,date): Observable<ApiResponse>{
  let body={
    "status":["Active"]
  }
  if(org!=null){
    body["farmerOrg"]=org
  }
  //  if(project!=null){
  //   body["project"]=org
  // } 
   if(district!=null){
    body["district"]=district
  } 
   if(state!=null){
    body["state"]=state
   }  
   if(block!=null){
    body["block"]=block
  }  
  // if(grampanchayat!=null){
  //   body["grampanchayat"]=grampanchayat
  // }  if(village!=null){
  //   body["village"]=village
  // } if(date!=null){
  //   body["dateOfDissemination"]=date
  // }
return this.http.post<ApiResponse>(this.APIURL + "farmer/filter?pageno=no" , body)

}
getvalidateobjidReturnArray(data)
{
if(data=="000000000000000000000000"){
return null;
}
return [data];
}

//checks the user type and returns organisation id to user list data access
getUserTypeBasedUserAccess(body){
  if (sessionStorage.getItem('userObj')) {
    let userObj= JSON.parse(sessionStorage.getItem('userObj'))
    console.log("usr obj",userObj)
    if(userObj.response.data.user.type == "SuperAdmin"  ){
      body.organisationId=[]
      return
    }
    body.organisationId= [userObj.response.data.user.userOrg]
  }
  
//  this.logout();
}

logout() {
  localStorage.removeItem('isUserLoggedIn');
  localStorage.removeItem('Role');
  sessionStorage.removeItem('UserToken');
  sessionStorage.removeItem('UserDetails');
  sessionStorage.removeItem('useracl');
  this.dataSharingService.userDetails.next('');
  this.dataSharingService.isUserLoggedIn.next(false);
  this.router.navigate(['/']);
}

getModuleAccess(key){
  let role = sessionStorage.getItem('moduleAcl');
  this.role = JSON.parse(role);
  // console.log("GetModuleAccessRole", this.role)
  if (!this.role) {
    return;
  }
  for (let i = 0; i < this.role.ModuleAccess.length; i++) {
    if (this.role.ModuleAccess[i].uniqueId == key) {
      return this.role.ModuleAccess[i].access.check == "Yes" ? true : false;
    }
  }
}

getTabAccess(key) {
  let role = sessionStorage.getItem('moduleAcl');
  this.role = JSON.parse(role);
  if (!this.role) {
    return;
  }
  for (let i = 0; i < this.role.TabAccess.length; i++) {
    if (this.role.TabAccess[i].uniqueId == key) {
      return this.role.TabAccess[i].access.check == "Yes" ? true : false;
    }
  }
}

getFeatureAccess(key) {
  let role = sessionStorage.getItem('moduleAcl');
  this.role = JSON.parse(role);
  if (!this.role) {
    return;
  }
  for (let i = 0; i < this.role.FeatureAccess.length; i++) {
    if (this.role.FeatureAccess[i].uniqueId == key) {
      return this.role.FeatureAccess[i].access.check == "Yes" ? true : false;
    }
  }
}

getMenuAccess(key) {
  let role = sessionStorage.getItem('moduleAcl');
  this.role = JSON.parse(role);
  if (!this.role) {
    return;
  }
  for (let i = 0; i < this.role.MenuAccess.length; i++) {
    if (this.role.MenuAccess[i].uniqueId == key) {
      return this.role.MenuAccess[i].access.check == "Yes" ? true : false;
    }
  }
}

}
