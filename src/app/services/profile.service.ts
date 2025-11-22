import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPhoto } from '../interfaces/IPhoto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  newUserInfo=new BehaviorSubject<any>(null);
  newUserInfo$=this.newUserInfo.asObservable();
  constructor(private http: HttpClient) { }

  GetProfile(userId:string){
    return this.http.get(environment.apiBaseUrl+`Profiles/${userId}/getProfile`,{withCredentials:true})
  }
  GetPhotos(userId){
    return this.http.get<IPhoto[]>(environment.apiBaseUrl+`Profiles/${userId}/photos`,{withCredentials:true})
  }
  AddPhoto(formData){
    return this.http.post(environment.apiBaseUrl+`Profiles/add-photo`,formData,{withCredentials:true})
  }
  SetMainPhoto(photoId){
    return this.http.put(environment.apiBaseUrl+`Profiles/${photoId}/setMain`,{},{withCredentials:true})
  }
  DeletePhoto(photoId){
    return this.http.delete(environment.apiBaseUrl+`Profiles/${photoId}/photos`,{withCredentials:true})
  }
  EditProfile(body){
    return this.http.put(environment.apiBaseUrl+`Profiles/editProfile`,body,{withCredentials:true})
  }
  FollowProfile(userId:string){
    return this.http.post(environment.apiBaseUrl+`Profiles/${userId}/follow`,{},{withCredentials:true})
  }
  FollowList(userId:string,predicate:string){
    let query=new HttpParams();
    query=query.append("predicate",predicate)
    return this.http.get(environment.apiBaseUrl+`Profiles/${userId}/follow-list`,{withCredentials:true,params:query})
  }
}
