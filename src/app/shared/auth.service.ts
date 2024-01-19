import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as myGlobals from './globals';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private APIURL = myGlobals.base_api_url;

  constructor(private http:HttpClient) { }

  get CheckLoginStatus() {
    if (localStorage.getItem('isUserLoggedIn')) {
      return true;
    } else {
      return false;
    }

  }

  signIn(user: User) {
    return this.http.post<any>(`${this.APIURL}/user/auth?platform=mobile`, user)
    
  }
  
  StoreUserDetailsLocally(Data){    
    //sessionStorage.setItem('UserToken',Data.token);
    sessionStorage.setItem('UserDetails',JSON.stringify(Data));
  }

}
