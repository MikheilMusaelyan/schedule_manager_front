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
import { DragdropDirective } from './directives/dragdrop.directive';
import { EventComponent } from './single-day/event/event.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { YearComponent } from './year/year.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { UpcomingeventsComponent } from './upcomingevents/upcomingevents.component';
import { EventEffects$ } from './single-day/event.effects';
import { EventService } from './single-day/event.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms"

import { WordPipe } from './pipes/wordPipe';


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
    WordPipe
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
