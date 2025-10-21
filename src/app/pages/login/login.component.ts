import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup
  //userInfo: any;
  
  constructor(private accountService:AccountService,
    private fb:FormBuilder,private messagingService:MessageService,private router:Router)
  {
    this.loginForm=this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required,Validators.minLength(6)]]
    })
  }

  
  ngOnInit(){
    
  }

  login(){
    this.accountService.Login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.messagingService.add({
              key: 'tm',
              severity: 'success',
              summary: 'WELCOME'
            });
            //getting user info
            this.gettingUserInfo();
          }
        })
      }
      
  async gettingUserInfo(){
        
   const userInfo=await this.accountService.UserInfo();
   this.accountService.userInfoSignal.set(userInfo);
   localStorage.setItem("userInfo",JSON.stringify(userInfo)) 
   this.accountService.isLoggedIn.next(true);
   const url=localStorage.getItem("redirectUrl");
   if(url){
     this.router.navigate([url])
   }else{
     this.router.navigate(['main/activities'])
   }
  }
}
