import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.component.html',
  styleUrl: './createactivity.component.css'
})
export class CreateactivityComponent implements OnInit{
  
  activityForm:FormGroup;

  constructor(private fb: FormBuilder){

    this.activityForm=this.fb.group({
      id:[null],
      title:[null],
      date:[null],
      description:[null],
      category:[null],
      isCancelled:[null],
      city:[null],
      venue:[null],
      latitude:[null],
      longitude:[null],
    })

  }


  ngOnInit() {
   
  }

}
