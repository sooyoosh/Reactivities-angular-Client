import { Component } from '@angular/core';
import { IActivities } from '../activitydashboard/activitydashboard.component';


@Component({
  selector: 'app-activitydetail',
  templateUrl: './activitydetail.component.html',
  styleUrl: './activitydetail.component.css'
})
export class ActivitydetailComponent {
activityDetail:IActivities
constructor(){}


}
