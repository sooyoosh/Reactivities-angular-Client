import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActivitydashboardComponent } from './pages/activitydashboard/activitydashboard.component';
import { CreateactivityComponent } from './pages/createactivity/createactivity.component';
import { MainComponent } from './pages/main/main.component';
import { ActivitydetailComponent } from './pages/activitydetail/activitydetail.component';

const routes: Routes = [
  {path:'',component:HomeComponent },
  {path:'main',component:MainComponent,
    children:[
      //{path:'',component:MainComponent},
      {path:'activities',component:ActivitydashboardComponent},
      {path:'activities/:id',component:ActivitydetailComponent},
      {path:'create',component:CreateactivityComponent},
      {path:'manage/:id',component:CreateactivityComponent}
    ]
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
