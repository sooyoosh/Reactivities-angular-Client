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


  constructor(private activityService:ActivitiesService,private fb: FormBuilder,private datePipe: DatePipe){
    this.activityForm=this.fb.group({
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
}
