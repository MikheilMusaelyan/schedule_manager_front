import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

import { SingleDayComponent } from './single-day/single-day.component';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { MainComponent } from './main/main.component';

import { NavbarComponent } from './navbar/navbar.component';
import { DragdropDirective } from './shared/directives/dragdrop.directive';
import { EventComponent } from './event/event.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { YearComponent } from './year/year.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { UpcomingeventsComponent } from './upcomingevents/upcomingevents.component';
import { EventEffects$ } from './event/event.effects';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { WordPipe } from './pipes/wordPipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './shared/interceptors/token.interceptor';
import { LoadingComponent } from './shared/loading/loading.component';
import { PopupsComponent } from './popups/popups.component';


@NgModule({
  declarations: [
    AppComponent,
    SingleDayComponent,
    CalendarComponent,
    MainComponent,
    NavbarComponent,
    DragdropDirective,
    EventComponent,
    YearComponent,
    SearchbarComponent,
    CurrentTimeComponent,
    UpcomingeventsComponent,
    LoginComponent,
    WordPipe,
    LoadingComponent,
    PopupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([EventEffects$]),
    StoreDevtoolsModule.instrument(),
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
