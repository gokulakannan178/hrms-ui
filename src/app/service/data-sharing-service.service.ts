import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userDetails: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public profilepic: BehaviorSubject<any> = new BehaviorSubject<any>('');


}
