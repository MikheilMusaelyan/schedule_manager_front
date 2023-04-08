import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

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



@NgModule({
  declarations: [
    AppComponent,
    SingleDayComponent,
    CalendarComponent,
    MainComponent,
    NavbarComponent,
    DragdropDirective,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
