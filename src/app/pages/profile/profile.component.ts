import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../interfaces/IActivity';
import { IPhoto } from '../../interfaces/IPhoto';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userId:string;
  profile:IProfile;
  photos:IPhoto[];
  userInfo: IUser;
  isCurrentUser: boolean;
 constructor(private route:ActivatedRoute,private profileService:ProfileService){

 }

  ngOnInit() {
   this.route.params.subscribe((data)=>{
    this.userId=data['id']
    this.getProfile();
    this.gettingUser();
   }) 
  }

  getProfile(){
    this.profileService.GetProfile(this.userId).subscribe({
      next:(data:any)=>{
        this.profile=data
        this.getPhotos();
      }
    })
  }
  getPhotos(){
    this.profileService.GetPhotos(this.userId).subscribe({
      next:(data)=>{
        this.photos=data;
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
   

}
