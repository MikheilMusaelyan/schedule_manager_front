import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SingleDayComponent } from './single-day/single-day.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  // singleday
  { path: 'singleday', component: SingleDayComponent },
  // login
  { path: 'login', component: LoginComponent },
  { path: 'register',  component: LoginComponent }, // Route for the login page
  // error
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
