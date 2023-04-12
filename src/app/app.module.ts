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

import { CalendarModule } from './calendar/calendar.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DragdropDirective } from './directives/dragdrop.directive';
import { EventComponent } from './single-day/event/event.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { YearComponent } from './year/year.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { CurrentTimeComponent } from './current-time/current-time.component';
import { UpcomingeventsComponent } from './upcomingevents/upcomingevents.component';

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
    UpcomingeventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    CalendarModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
