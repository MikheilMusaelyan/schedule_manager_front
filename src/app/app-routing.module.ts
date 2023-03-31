import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SingleDayComponent } from './single-day/single-day.component';

const routes: Routes = [
  {path: 'calendar', component: CalendarComponent},
  {path: 'singleday', component: SingleDayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
