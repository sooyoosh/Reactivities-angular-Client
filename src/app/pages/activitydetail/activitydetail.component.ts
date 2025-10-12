import { Component, OnInit } from '@angular/core';
import { IActivities } from '../activitydashboard/activitydashboard.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';


@Component({
  selector: 'app-activitydetail',
  templateUrl: './activitydetail.component.html',
  styleUrl: './activitydetail.component.css'
})
export class ActivitydetailComponent implements OnInit{
activityDetail:IActivities
activityId: string;
isCanclled:boolean=false
isGoing:boolean=false
  // activity: IActivities;
constructor(private route:ActivatedRoute,private router:Router,private activityService:ActivitiesService){}
  

ngOnInit(){
    this.route.params.subscribe((obj)=>{
      this.activityId=obj['id'];
      this.getActivity();
    })
  }

  async getActivity(){
    
    try {
      this.activityDetail=await this.activityService.GetDetailActivity(this.activityId);
    } catch (error) {
      
       this.router.navigate(['main/not-found'])
    }
    //
  }

  goToEdit(id:string){
    this.router.navigate([`manage/${id}`])
  }

}
