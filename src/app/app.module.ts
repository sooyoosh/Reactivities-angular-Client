import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
//
import { ButtonModule } from 'primeng/button';
import { ActivitydashboardComponent } from './pages/activitydashboard/activitydashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { CreateactivityComponent } from './pages/createactivity/createactivity.component';
import { MainComponent } from './pages/main/main.component';
import { ActivitydetailComponent } from './pages/activitydetail/activitydetail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivitydashboardComponent,
    CreateactivityComponent,
    MainComponent,
    ActivitydetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    ChipModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
