import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import {IUser} from '../interfaces/user'


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  userInfoSignal=signal<IUser|null>(null)
  isLoggedIn=new BehaviorSubject<boolean>(false)
  isLoggedIn$=this.isLoggedIn.asObservable();
  constructor(private http:HttpClient) { }


  Login(body){
    return this.http.post(environment.apiBaseUrl+`login?useCookies=true`,body,{withCredentials:true})
  }
  Register(body){
    return this.http.post(environment.apiBaseUrl+`Account/register`,body,{withCredentials:true})
  }
  gettingUserInfo(){
    return this.http.get<IUser>(environment.apiBaseUrl+`Account/user-info`,{responseType:'json',withCredentials:true}) 
  }


  async UserInfo(){
    return firstValueFrom(
      this.http.get<IUser>(environment.apiBaseUrl+`Account/user-info`,{responseType:'json',withCredentials:true})
    )
  }

  async Logout(){
    return firstValueFrom(
      this.http.post(environment.apiBaseUrl+'Account/logout',{},{responseType:'json',withCredentials:true})
    )
  }

}
