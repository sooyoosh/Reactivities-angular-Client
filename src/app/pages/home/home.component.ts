import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router){

  }
goToActivities(){
  const storedUser = localStorage.getItem("userInfo");
  if(storedUser){
    this.router.navigate(['/main/activities'])
  }else{
    this.router.navigate(['/main/login'])
  }
}

}
