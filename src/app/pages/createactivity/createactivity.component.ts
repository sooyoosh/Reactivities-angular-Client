import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';
import { IActivities } from '../activitydashboard/activitydashboard.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.component.html',
  styleUrl: './createactivity.component.css'
})
export class CreateactivityComponent implements OnInit{
  
  activityForm:FormGroup;
  path: string|undefined|null;
  activityDetail:IActivities
  activityId: string;
  editMode: boolean=false;
  constructor(private fb: FormBuilder,
    private route:ActivatedRoute,
    private activityService:ActivitiesService,
    private datePipe: DatePipe,private router:Router){

    this.activityForm=this.fb.group({
      id:[null],
      title:[null,[Validators.required]],
      date:[null,[Validators.required]],
      description:[null,[Validators.required]],
      category:[null,[Validators.required]],
      isCancelled:[false],
      city:[null,[Validators.required]],
      venue:[null,[Validators.required]],
      latitude:[0],
      longitude:[0],
    })

  }


  ngOnInit() {
   this.route.url.subscribe((url)=>{
    this.path=url[0]?.path;
    this.activityId=url[1]?.path;
    if(this.path=="manage" && this.activityId){
      this.getActivity();
    }
   })
  }



   getActivity(){
   
    this.activityService.GetDetailActivity(this.activityId)
    .then(res=>{
      this.activityDetail=res;
      this.editMode=true,
      this.pathchingForm();
    })
    .catch(err=>{

    })
    .finally(()=>{

    })
  }
  pathchingForm(){
     const fotmattedDate=this.datePipe.transform(this.activityDetail?.date,'yyyy-MM-dd');
    this.activityForm.patchValue({
      ...this.activityDetail,
      date:fotmattedDate
    });
  }

   submitForm(){
    if(this.editMode){
      
       this.activityService.EditActivity(this.activityForm.value).subscribe({
        next:(res)=>{
          this.router.navigate([`activities/${this.activityId}`])               
        },
        error:(err)=>{
          
        }
       })
    }else{
      
      const creatBody={...this.activityForm.value,
        id:this.generateGuid()
      }
      
      console.log(creatBody)

      this.activityService.CreateActivity(creatBody).subscribe({
        next:(id)=>{
          this.router.navigate([`activities/${id}`])
        },
        error:(err)=>{
          
        }
      })      
    }
  }

  generateGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

}
