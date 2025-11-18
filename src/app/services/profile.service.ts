import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IPhoto } from '../interfaces/IPhoto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  isUploadSuccess=new BehaviorSubject<boolean>(false);
  isUploadSuccess$=this.isUploadSuccess.asObservable();
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
}
