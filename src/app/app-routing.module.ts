import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SingleDayComponent } from './single-day/single-day.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    // children: [
    //   { path: 'calendar', component: CalendarComponent },
    //   // { path: ''}
    // ],
  },
  { path: 'singleday/:month/:day/:year', component: SingleDayComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
