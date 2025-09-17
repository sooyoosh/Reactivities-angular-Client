import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IActivities } from '../pages/activitydashboard/activitydashboard.component';

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
  


}
