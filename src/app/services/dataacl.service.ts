import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataaclService {

  constructor() { }
  // only organisation filter's body should be passed in argument
getOrganisationBasedOnUserAccess(orgFilterBody){
  if (sessionStorage.getItem('userObj')) {
    let userObj= JSON.parse(sessionStorage.getItem('userObj'))
    console.log("usr obj",userObj)
    if(userObj.response.data.user.type == "SuperAdmin"  ){
      orgFilterBody.id=[]
      return
    }
    orgFilterBody.id= [userObj.response.data.user.userOrg]
  }
}

}
