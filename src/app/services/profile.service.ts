import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  GetProfile(userId:string){
    return this.http.get(environment.apiBaseUrl+`Profiles/${userId}/getProfile`,{withCredentials:true})
  }
}
