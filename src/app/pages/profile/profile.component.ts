import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userId:string
 constructor(private route:ActivatedRoute,private profileService:ProfileService){

 }

  ngOnInit() {
   this.route.params.subscribe((data)=>{
    this.userId=data['id']
    
   }) 
   if(this.userId) this.getProfile();
  }

  getProfile(){
    this.profileService.GetProfile(this.userId).subscribe({
      next:(data)=>{
        
      }
    })
  }

}
