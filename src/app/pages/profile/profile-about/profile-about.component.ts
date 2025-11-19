import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProfile } from '../../../interfaces/IActivity';
import { ProfileService } from '../../../services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrl: './profile-about.component.css'
})
export class ProfileAboutComponent implements OnInit{
  
  @Input() profile:IProfile;
  @Output() emmitSuccessEditProfile=new EventEmitter()
  editProfileMode:boolean=false;
  displayName:string|null|undefined;
  bio:string|null|undefined;
  

  constructor(private profileService:ProfileService,private messagingService:MessageService){}
  
  ngOnInit() {
    this.initialValue();
  }


  toggleEdite(){
    this.editProfileMode=!this.editProfileMode;
  }
  initialValue(){
    this.displayName=this.profile.displayName;
    this.bio=this.profile.bio;
  }
  disableButton():boolean{
    return (!this.displayName?.length &&!this.bio?.length )
  }
  updateProfile(){

      if(this.checkingSame()){
        this.messagingService.add({
            key: 'tm',
            severity: 'warn',
            summary: 'you changed nothing!!',
            detail: '',
          });
          return
      }

    let body={
      userId:this.profile.id,
      displayName:this.displayName?this.displayName:null,
      bio:this.bio
    }
    this.profileService.EditProfile(body).subscribe({
      next:(data)=>{
        this.emmitSuccessEditProfile.emit('success');
        this.editProfileMode=false;
      },
      error:(err)=>{
        this.editProfileMode=false;
      }
    })
    
  } 

  checkingSame():boolean{
    return(this.profile.displayName.trim()===this.displayName?.trim() &&
     this.profile.bio?.trim()===this.bio?.trim())
  }
}
