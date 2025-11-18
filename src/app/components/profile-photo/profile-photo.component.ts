import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPhoto } from '../../interfaces/IPhoto';
import { IUser } from '../../interfaces/user';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.css'
})
export class ProfilePhotoComponent implements OnInit{
  
  @Input() photos:IPhoto[];
  @Input() isCurrentUser:boolean;
   @Output() emitSuccessImageForProfile = new EventEmitter();
  croppedImage:any='';
  responsiveOptions:any[]|undefined
  userInfo: IUser;
  editMode:boolean=false;     

    


  constructor(private pofileService:ProfileService){}
  
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
    this.editMode=!this.editMode;
    this.croppedImage=''
  }  

  emitCropper(e){
    this.croppedImage=e;
  }
  emitSuccessImage(event){
    if(event=='success')
      {
        this.editMode=false;
        this.emitSuccessImageForProfile.emit('success')
      }
  }
  setMainPhoto(photoId){
     this.pofileService.SetMainPhoto(photoId).subscribe((data)=>{
      this.emitSuccessImageForProfile.emit('success')
     })
    
  }
  deletePhoto(photoId){
    this.pofileService.DeletePhoto(photoId).subscribe((data)=>{
      this.emitSuccessImageForProfile.emit('success');
      this.photos.filter(x=>x.id!==photoId)
    })
  }
 
}
