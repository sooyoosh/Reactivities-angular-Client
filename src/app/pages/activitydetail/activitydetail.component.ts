import { Component, OnDestroy, OnInit } from '@angular/core';
//import { IActivities } from '../activitydashboard/activitydashboard.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';
import { IActivities } from '../../interfaces/IActivity';
import { CommentServiceService } from '../../services/comment-service.service';
import { Subscription } from 'rxjs';
import { IComment } from '../../interfaces/IComment';


@Component({
  selector: 'app-activitydetail',
  templateUrl: './activitydetail.component.html',
  styleUrl: './activitydetail.component.css'
})
export class ActivitydetailComponent implements OnInit,OnDestroy{
activityDetail:IActivities
activityId: string;
isCanclled:boolean=false;
isGoing:boolean=false;
mapOpen:boolean=false;
sub!: Subscription;
comments: IComment[] = [];
newComment:string|null
  // activity: IActivities;
constructor(private route:ActivatedRoute,private router:Router,
  private activityService:ActivitiesService,private commentService:CommentServiceService){}
  
  
  ngOnInit(){
    this.route.params.subscribe((obj)=>{
      this.activityId=obj['id'];
      this.getActivity();
    })
    //web socket
    this.commentService.startConnection(this.activityId);
    
    this.sub = this.commentService.comments$.subscribe(x => {
      this.comments = x;
    });
  }
  ngOnDestroy() {
    this.commentService.stopConnection();
    this.sub.unsubscribe();
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
    this.router.navigate([`/main/manage/${id}`])
  }
  updateAttendance(id:string){
    this.activityService.UpdateAttendance(id).subscribe({
      next:(res)=>{
        this.getActivity();
      },
      error:(err)=>{

      }
    })
    
  }
  sendComment(){
     this.commentService.sendComment({
      activityId: this.activityId,
      body: this.newComment
    });
    this.newComment=null
   
  }
  
}
