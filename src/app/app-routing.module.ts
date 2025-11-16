import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActivitydashboardComponent } from './pages/activitydashboard/activitydashboard.component';
import { CreateactivityComponent } from './pages/createactivity/createactivity.component';
import { MainComponent } from './pages/main/main.component';
import { ActivitydetailComponent } from './pages/activitydetail/activitydetail.component';
import { CounterComponent } from './pages/counter/counter.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path:'',component:HomeComponent },
  {path:'main',component:MainComponent,
    children:[
      //{path:'',component:MainComponent},
      {path:'activities',component:ActivitydashboardComponent,canActivate:[authGuard]},
      {path:'activities/:id',component:ActivitydetailComponent,canActivate:[authGuard]},
      {path:'create',component:CreateactivityComponent,canActivate:[authGuard]},
      {path:'manage/:id',component:CreateactivityComponent,canActivate:[authGuard]},
      {path:'profiles/:id',component:ProfileComponent,canActivate:[authGuard]},
      {path:'counter',component:CounterComponent,canActivate:[authGuard]},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'not-found',component:NotfoundComponent},
      {path:'**',component:NotfoundComponent}
    ]
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
