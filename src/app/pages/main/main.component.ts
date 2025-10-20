import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { IUser } from '../../interfaces/user';
import { MenuItem } from 'primeng/api';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  createActivity: boolean = false;
  userInfo: IUser | null
  items: MenuItem[] | undefined;



  constructor(public accountService: AccountService,private router:Router) {
  }
  ngOnInit() {
    //getting userInfo from localstorage is it exist
    
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
        this.userInfo = JSON.parse(storedUser);
      }
    //getting userInfo from localstorage is it exist



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
    localStorage.removeItem("userInfo");    
    this.router.navigate(['/'])    
  }

}
