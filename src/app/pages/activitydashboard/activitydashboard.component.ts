import { Component, Input, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
export interface IActivities{
  id: string
  title: string
  date: string
  description: string
  category: string
  isCancelled: boolean
  city: string
  venue: string
  latitude: number
  longitude: number
}
@Component({
  selector: 'app-activitydashboard',
  templateUrl: './activitydashboard.component.html',
  styleUrl: './activitydashboard.component.css'
})


export class ActivitydashboardComponent implements OnInit{

  allActivities:IActivities[]=[]
  activityDetail: IActivities|null;
  activityDetailCard: boolean=false;
  createAndEditMode: boolean=false;
  editMode: boolean=false;
  activityForm:FormGroup;
  isSubmitting: boolean=false;


  constructor(private activityService:ActivitiesService,private fb: FormBuilder,private datePipe: DatePipe){
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
    
    this.getAllActivities();


  }
  getAllActivities(){
    this.activityService.getAllActivities().subscribe({
      next:(data)=>{
        this.allActivities=data
      },
      error:(err)=>{
        debugger
      }
    })
  }
  chooseIcon(category):string{
    switch(category){
      case'film': 
      return ' pi pi-video';
      case 'drinks':
      return 'pi pi-chart-scatter';
      case 'music':
      return 'pi pi-headphones';
      case 'culture':
      return 'pi pi-book';
      case 'travel':
      return 'pi pi-map';
      case 'food':
      return 'pi pi-apple';

      default:
        return 'pi pi-check'
    }
  }

  viewDetail(detail:IActivities){
    this.activityDetail=detail;
    this.activityDetailCard=true;
    this.createAndEditMode=false;
  }
  activityForEdit(){
    this.createAndEditMode=true;
    this.editMode=true;
    const fotmattedDate=this.datePipe.transform(this.activityDetail?.date,'yyyy-MM-dd');
    this.activityForm.patchValue({
      ...this.activityDetail,
      date:fotmattedDate
    });
    
  }
  createMode(){
    this.createAndEditMode=true;
    this.activityDetail=null;
    this.editMode=false;
    this.activityForm.reset();

  }
  submitForm(){
    if(this.editMode){
      // this.allActivities=this.allActivities.map(x => x.id==this.activityForm.controls['id'].value?this.activityForm.value:x)
      // const activityy=this.allActivities.find(x=>x.id==this.activityForm.controls['id'].value);
      // if(activityy) this.viewDetail(activityy);
      this.isSubmitting = true;
       this.activityService.EditActivity(this.activityForm.value).subscribe({
        next:(res)=>{
          this.allActivities=this.allActivities.map(x => x.id==this.activityForm.controls['id'].value?this.activityForm.value:x)
          const activityy=this.allActivities.find(x=>x.id==this.activityForm.controls['id'].value);
          if(activityy) this.viewDetail(activityy);
          this.isSubmitting=false;          
        },
        error:(err)=>{
          this.isSubmitting=false;
        }
       })
    }else{
      const newActivity={...this.activityForm.value,id:this.allActivities.length.toString()};
      this.allActivities.push(newActivity);
      this.viewDetail(newActivity);
    }
  }
  deleteActivity(id:string){
    this.activityService.DeleteActivity(id).subscribe({
      next:(res)=>{
        this.allActivities= this.allActivities.filter(x=> x.id !==id)
      },
      error:(err)=>{

      }
    })
  }
  // checkingObjectValue(obj:Record<string,any>):boolean{
  //   const objWithoutValue
  //   return Object.values(obj).some(value => value == null || value == undefined || value == '')
  // }
}
