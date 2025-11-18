import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent implements OnInit {
  uploadedFiles: any[] = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  @Output() emitCropper = new EventEmitter();
  @Output() emitSuccessImage = new EventEmitter();
  constructor(private profileService:ProfileService) { }

  ngOnInit() {

  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: any) {
    if (event.base64) {
      this.croppedImage = event.base64; // 
    } else if (event.blob) {
      const reader = new FileReader();
      reader.readAsDataURL(event.blob);
      reader.onloadend = () => {
        this.croppedImage = reader.result; //  base64  
        this.emitCropper.emit(this.croppedImage);
      };
    }
  }

  goPrev(prevCallback: EventEmitter<any>) {
    prevCallback.emit();
    this.emitCropper.emit('');
    this.imageChangedEvent = '';
    this.croppedImage='';
  }
  async uploadHandler() {
    const blob = await fetch(this.croppedImage).then(res => res.blob());
    const file = new File([blob], "photo.png", { type: 'image/png' });
    const formData=new FormData();
    formData.append("file",file)
    this.profileService.AddPhoto(formData).subscribe({
      next:(res)=>{
        this.cleanImages();
        this.emitSuccessImage.emit('success');
      }
    })
    
  }
  cleanImages(){
    this.imageChangedEvent='';
    this.croppedImage='';
    this.emitCropper.emit('')
  }
}
