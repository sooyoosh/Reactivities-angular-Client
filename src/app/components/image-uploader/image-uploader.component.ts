import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent implements OnInit{
  uploadedFiles: any[] = [];
  constructor(){}

  ngOnInit() {
    
  }
  // onSelect(event){
  //   debugger
  // }
  uploadHandler(event){
    
    const formData=new FormData();
    const file=event.files[0];
    formData.append("file",file);
    
  
    
    
  }

}
