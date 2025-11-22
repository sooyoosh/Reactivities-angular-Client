import { Component, Input, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { IProfile } from '../../../interfaces/IActivity';

@Component({
  selector: 'app-profile-following',
  templateUrl: './profile-following.component.html',
  styleUrl: './profile-following.component.css'
})
export class ProfileFollowingComponent implements OnInit,OnChanges{
  @Input() predicate:string
  @Input() userId:string
  usersCommunity:IProfile[];
  constructor(private profileService:ProfileService){}
  
  ngOnInit() {
    this.getFollowList();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.getFollowList();
    
  }
  getFollowList(){
    if(this.userId && this.predicate){
      this.profileService.FollowList(this.userId,this.predicate).subscribe({
        next:(data)=>{
          
          this.usersCommunity=data as IProfile[]
        },
        error:(err)=>{
          
        }
      })
    }
  }

}
