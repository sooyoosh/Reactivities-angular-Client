import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IActivities } from '../pages/activitydashboard/activitydashboard.component';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }


  getAllActivities(){
    return this.http.get<IActivities[]>(environment.apiBaseUrl+'activities')
  }
  EditActivity(activity:IActivities){
    return this.http.put(environment.apiBaseUrl+'activities',activity)
  }
  DeleteActivity(id:string){
    return this.http.delete(environment.apiBaseUrl+`activities/${id}`)
  }
  async GetDetailActivity(id:string):Promise<IActivities>{
    return await firstValueFrom(
      this.http.get<IActivities>(environment.apiBaseUrl+`activities/${id}`)
    ) 
  }
  CreateActivity(body){
    return this.http.post(environment.apiBaseUrl+'activities',body,{responseType:'text'})    
  }

}
