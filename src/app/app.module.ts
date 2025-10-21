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
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { CreateactivityComponent } from './pages/createactivity/createactivity.component';
import { MainComponent } from './pages/main/main.component';
import { ActivitydetailComponent } from './pages/activitydetail/activitydetail.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { CounterComponent } from './pages/counter/counter.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './stores/counter/counter.reducer';
import { loadingReducer } from './stores/loading/loading.reducer';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingComponent } from './components/loading/loading.component';
import { CookieService } from 'ngx-cookie-service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { handlingErrorInterceptor } from './interceptors/handlingError.interceptor';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MapComponent } from './pages/map/map.component';
import { LoginComponent } from './pages/login/login.component';
import { MenubarModule } from 'primeng/menubar';
import { FieldsetModule } from 'primeng/fieldset';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActivitydashboardComponent,
    CreateactivityComponent,
    MainComponent,
    ActivitydetailComponent,
    CounterComponent,
    LoadingComponent,
    NotfoundComponent,
    MapComponent,
    LoginComponent,
    RegisterComponent
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
    InputTextModule,
    AvatarModule,
    AvatarGroupModule,
    MatIconModule,
    ToolbarModule,
    InputTextareaModule,
    ListboxModule,
    CalendarModule,
    ToastModule,
    DropdownModule,
    AutoCompleteModule,
    FieldsetModule,
    MenubarModule,    
    StoreModule.forRoot({
      counter: counterReducer,
      loading: loadingReducer
    })
  ],
  providers: [MessageService,CookieService,DatePipe
    ,provideHttpClient(withInterceptors([loadingInterceptor,handlingErrorInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
