import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { IUser } from '../../interfaces/user';
import { MenuItem } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { IProfile } from '../../interfaces/IActivity';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  createActivity: boolean = false;
  userInfo: IUser|IProfile | null
  items: MenuItem[] | undefined;



  constructor(public accountService: AccountService,private router:Router,private profileService:ProfileService) {
  }
  ngOnInit() {
    //getting userInfo from localstorage is it exist
    
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
        this.userInfo = JSON.parse(storedUser);
      }
    //getting userInfo from localstorage is it exist
    //if userInfo changed we get it from local storage
      this.profileService.newUserInfo$.subscribe((data)=>{
        
        if(data){

          if(this.userInfo?.id===data?.['id']){
            this.userInfo=data;
            localStorage.setItem("userInfo",JSON.stringify(data))
          }
        }
      })
    //if userInfo changed we get it from local storage


    this.accountService.isLoggedIn.subscribe((data) => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        this.userInfo = JSON.parse(storedUser);
        // menubar after login
        if(this.userInfo!=null){
      this.items=
      [
        {
          label:this.userInfo.displayName,
          icon:'pi pi-user',
          items:[
            {
              label:'Create Activity',
              icon:'pi pi-plus'
            },
            {
              label:'My profile',
              icon:'pi pi-user', 
              command:()=>{
                this.goToMyProfile(this.userInfo?.id)
              } 
            },
            {
              label:'Logout',
              icon:'pi pi-sign-out',
              command:()=>{
                this.logoutCommand();
              }
            },
          ]
        }

      ]
    }

        // menubar after login
      }

    })

    if(this.userInfo!=null){
      this.items=
      [
        {
          label:this.userInfo.displayName,
          icon:'pi pi-user',
          items:[
            {
              label:'Create Activity',
              icon:'pi pi-plus'
            },
            {
              label:'My profile',
              icon:'pi pi-user',  
              command:()=>{
                this.goToMyProfile(this.userInfo?.id)
              }
            },
            {
              label:'Logout',
              icon:'pi pi-sign-out',
              command:()=>{
                this.logoutCommand();
              }
            },
          ]
        }

      ]
    }




  }


  async logoutCommand(){
    await this.accountService.Logout();
    this.accountService.userInfoSignal.set(null);
    this.accountService.isLoggedIn.next(false);
    this.profileService.newUserInfo.next(null);
    localStorage.removeItem("userInfo");    
    localStorage.removeItem("redirectUrl");    
    this.router.navigate(['/'])    
  }
  goToMyProfile(userId){
    this.router.navigate([`main/profiles/${userId}`])
  }
}
