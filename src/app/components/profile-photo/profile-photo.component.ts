import { Component, Input, OnInit } from '@angular/core';
import { IPhoto } from '../../interfaces/IPhoto';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.css'
})
export class ProfilePhotoComponent implements OnInit{
  
  @Input() photos:IPhoto[];
  @Input() isCurrentUser:boolean;
  responsiveOptions:any[]|undefined
  userInfo: IUser;
  editMode:boolean=false;     

    


  constructor(){}
  
  ngOnInit() {

     this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
        
  }
  

  toggleEditeMode(){
    this.editMode=!this.editMode
  }  



}
