import { Component, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {  ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IActivities, IProfile } from '../../interfaces/IActivity';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
  selector: 'app-activitydashboard',
  templateUrl: './activitydashboard.component.html',
  styleUrl: './activitydashboard.component.css'
})


export class ActivitydashboardComponent implements OnInit{

  allActivities:IActivities[]=[]
  nextCursor:string|null
  activityDetail: IActivities|null;
  activityDetailCard: boolean=false;
  createAndEditMode: boolean=false;
  editMode: boolean=false;
  activityForm:FormGroup;
  isSubmitting: boolean=false;
  items: any[]=[];
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanel; 
  overlaydata: IProfile|null;

  constructor(private activityService:ActivitiesService,
    private fb: FormBuilder,private datePipe: DatePipe,
    private route:Router,private activeRoute:ActivatedRoute,private messageService: MessageService){
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
       this.items = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            //{ name: 'Istanbul', code: 'IST' },
            //{ name: 'Paris', code: 'PRS' }
        ];

  }
  getAllActivities(){
    this.activityService.getAllActivities().subscribe({
      next:(data)=>{
        this.allActivities=data.items;
        this.nextCursor=data.nextCursor;
      },
      error:(err)=>{
        
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
    this.route.navigate([`main/activities/${detail.id}`])
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

  showOverlay(event,item){
    this.overlayPanel.show(event);
    this.overlaydata=item;
    
    
  }

  hideOverlay(){
    this.overlayPanel.hide()
    this.overlaydata=null
  }

getActivityLabel(act: IActivities) {
  if (act.isHost) return 'You are hosting';
  if (act.isGoing) return 'You are going';
  return 'هیچ گوهی نیستی';
}

goToProfile(userId:string){
  this.route.navigate([`main/profiles/${userId}`])
}

loadMoreActivity(){
  if(!this.nextCursor) return
   this.activityService.getAllActivities(this.nextCursor).subscribe({
    next: data => {
      debugger
      this.allActivities = [...this.allActivities, ...data.items]; 
      this.nextCursor = data.nextCursor;       }
  });
  
}

  // checkingObjectValue(obj:Record<string,any>):boolean{
  //   const objWithoutValue
  //   return Object.values(obj).some(value => value == null || value == undefined || value == '')
  // }
}
