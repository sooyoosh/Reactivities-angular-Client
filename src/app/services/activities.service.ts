import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
//import { IActivities } from '../pages/activitydashboard/activitydashboard.component';
import { firstValueFrom, map } from 'rxjs';
import { IActivities } from '../interfaces/IActivity';
import { IUser } from '../interfaces/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  userIfo:IUser
  constructor(private http: HttpClient,private accountService:AccountService) {
    
   }

   async gettingUserInfo(){
     this.userIfo=await this.accountService.UserInfo();

   }

   getAllActivities(){
    //gettingUserInfo
    this.gettingUserInfo();
    //gettingUserInfo
    return this.http.get<IActivities[]>
    (environment.apiBaseUrl+'activities',{withCredentials:true})
    .pipe(
      map(activities=>
        activities.map(activity=>{
          const isHost=activity.hostId === this.userIfo?.id;
          const isGoing = activity.attendees.some(a => a.id === this.userIfo?.id);
          return {
            ...activity,
            isHost,
            isGoing
          };
        })
      )





    )
   
   
  }
  EditActivity(activity:IActivities){
    return this.http.put(environment.apiBaseUrl+'activities',activity,{withCredentials:true})
  }
  DeleteActivity(id:string){
    return this.http.delete(environment.apiBaseUrl+`activities/${id}`,{withCredentials:true})
  }
  async GetDetailActivity(id:string):Promise<IActivities>{
     //gettingUserInfo
    await this.gettingUserInfo();
    //gettingUserInfo
    return await firstValueFrom(
      this.http.get<IActivities>
      (environment.apiBaseUrl+`activities/${id}`,{withCredentials:true})
      .pipe(
        map(activity=>{
          const isHost=activity.hostId === this.userIfo.id;
          const isGoing = activity.attendees.some(a => a.id === this.userIfo.id);          
          return{
            ...activity,
            isHost,
            isGoing
          }
        })
      )
    ) 
  }
  CreateActivity(body){
    return this.http.post(environment.apiBaseUrl+'activities',body,{responseType:'text',withCredentials:true})    
  }

  UpdateAttendance(id:string){
    return this.http.post(environment.apiBaseUrl+`activities/${id}/attende`,{},{withCredentials:true})
  }



}
