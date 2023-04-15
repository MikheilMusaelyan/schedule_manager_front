import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar/calendar.component';
import { MainComponent } from './main/main.component';
import { SingleDayComponent } from './single-day/single-day.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    // children: [
    //   { path: 'calendar', component: CalendarComponent },
    //   // { path: ''}
    // ],
  },
  { path: 'singleday/:day/:month/:year', component: SingleDayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
