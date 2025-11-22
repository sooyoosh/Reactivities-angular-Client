import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../interfaces/IActivity';
import { IPhoto } from '../../interfaces/IPhoto';
import { IUser } from '../../interfaces/user';
import { ProfileFollowingComponent } from './profile-following/profile-following.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userId:string;
  profile:IProfile;
  photos:IPhoto[]|null;
  userInfo: IUser;
  isCurrentUser: boolean;
  @ViewChild('followingListChild') followingListChild!: ProfileFollowingComponent;
  @ViewChild('followerListChild') followerListChild!: ProfileFollowingComponent;
 constructor(private route:ActivatedRoute,private profileService:ProfileService){

 }

  ngOnInit() {
   this.route.params.subscribe((data)=>{
    this.userId=data['id']
    this.getProfile();
    this.gettingUser();
   }) ;
  //  this.profileService.isUploadSuccess$.subscribe((data)=>{
  //   this.getPhotos();
  //  })
  }

  getProfile(){
    this.profileService.GetProfile(this.userId).subscribe({
      next:(data:any)=>{
        this.profile=data;
        this.profileService.newUserInfo.next(data);
        this.photos=null
        this.getPhotos();
      }
    })
  }
  getPhotos(){
    this.profileService.GetPhotos(this.userId).subscribe({
      next:(data)=>{
        this.photos=data;
        //this.profileService.isUploadSuccess.next(false);
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
   gettingUser(){
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
        this.userInfo = JSON.parse(storedUser);
      if(this.userInfo.id==this.userId) this.isCurrentUser=true;
      else this.isCurrentUser=false
      }
    
      
  }
   
emitSuccessImageForProfile(event){
  if(event=='success') {
    //this.getPhotos();
    this.getProfile();
    
  }
}
emmitSuccessEditProfile(event){
   if(event=='success') {
    this.getProfile();
  }
}
followToggle(targetUserId){
  this.profileService.FollowProfile(targetUserId).subscribe({
    next:(data)=>{
      this.getProfile();
      this.followerListChild.getFollowList();
      this.followingListChild.getFollowList();
    },
    error:(err)=>{
      
    }
  })
  
}
}
