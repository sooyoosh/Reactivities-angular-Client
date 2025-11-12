import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivitiesService } from '../../services/activities.service';
//import { IActivities } from '../activitydashboard/activitydashboard.component';
import { DatePipe } from '@angular/common';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { query } from '@angular/animations';
import { LocationService } from '../../services/location.service';
import { Root2 } from '../../interfaces/location';
import { IActivities } from '../../interfaces/IActivity';

@Component({
  selector: 'app-createactivity',
  templateUrl: './createactivity.component.html',
  styleUrl: './createactivity.component.css'
})
export class CreateactivityComponent implements OnInit,OnDestroy{
  
  activityForm:FormGroup;
  path: string|undefined|null;
  activityDetail:IActivities
  activityId: string;
  editMode: boolean=false;
  categoyOptions=[
    {lable:'Drinks',value:'drinks'},
    {lable:'Culure',value:'culure'},
    {lable:'Film',value:'film'},
    {lable:'Food',value:'food'},
    {lable:'Music',value:'music'},
    {lable:'Travel',value:'travel'}
  ]
  suggestionsLocation:Root2[];
   private searchTerms = new Subject<string>();
   private destroy$ = new Subject<void>();
  isLocationFielsClicked: boolean=false;
//location Api
//locationUrl="https://api.locationiq.com/v1/autocomplete?key=pk.b00c35b446373a6ef5a87f7b18f9d34b&limit=5&dedupe=1&"
//location Api


  constructor(private fb: FormBuilder,
    private route:ActivatedRoute,
    private activityService:ActivitiesService,
    private datePipe: DatePipe,private router:Router,
    private locationService:LocationService){

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
   });

//debounce for searching locaton and call api
   this.searchTerms.pipe(
    debounceTime(650),
    distinctUntilChanged(),
    switchMap(query=>this.locationService.searchLocation(query).pipe(
      catchError(err=>{
         console.warn('❌ Error fetching suggestions location:', err);
        return of([]); // 🔹 
      })
    )
  
  ),
    takeUntil(this.destroy$)
   ).subscribe({
    next:res=>{
      this.suggestionsLocation=res},
    error:err=>console.error('Location search error:', err)
   })
//debounce for searching locaton and call api


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
    //const fotmattedDate=this.datePipe.transform(this.activityDetail?.date,'yyyy-MM-dd');
    const dateValue=this.activityDetail.date? new Date(this.activityDetail.date):null
    this.activityForm.patchValue({
      ...this.activityDetail,
      date:dateValue
    });
  }

   submitForm(){
    if(this.editMode){
      
       this.activityService.EditActivity(this.activityForm.value).subscribe({
        next:(res)=>{
          this.router.navigate([`main/activities/${this.activityId}`])               
        },
        error:(err)=>{
          
        }
       })
    }else{
      
      const creatBody={...this.activityForm.value,
        id:this.generateGuid()
      }
      delete creatBody.id;
      

      this.activityService.CreateActivity(creatBody).subscribe({
        next:(id)=>{
          this.router.navigate([`main/activities/${id}`])
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
passIcon(name:string){
  switch(name){
    case 'drinks':
    return 'bi bi-cup-straw'
    
    case 'culure':
    return 'pi pi-check'

    case 'film':
    return 'bi bi-camera-reels'

    case 'food':
    return 'bi bi-fork-knife'

    case 'music':
    return 'bi bi-apple-music'

    case 'travel':
    return 'bi bi-luggage-fill'

    default:
      return 'pi pi-check'
  }
}
//
searchLocation(event){
  this.isLocationFielsClicked=true;
  this.activityForm.get('city')?.reset('');
  this.searchTerms.next(event.query)  
}
selectLocation(event){
  let location:Root2=event.value;
  this.activityForm.controls['city']
  .setValue(location.address.city||location.address.town||
    location.address.village);
  this.activityForm.controls['venue']
  .setValue(location.display_name);

  this.activityForm.controls['latitude']
  .setValue(location.lat);

  this.activityForm.controls['longitude']
  .setValue(location.lon);
  
  
}




//
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
