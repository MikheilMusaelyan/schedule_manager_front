import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { SingleDayComponent } from './single-day/single-day.component';
import { LoginComponent } from './login/login.component';
import { activateAuth, activateChildAuth } from './shared/guards/auth.guard';

const routes: Routes = [
  // home
  { 
    path: '', component: MainComponent,
    canActivate: [activateAuth],
    canActivateChild: [activateChildAuth],
  },
  // singleday
  { path: 'singleday', component: SingleDayComponent,
    canActivate: [activateAuth],
  },
  // login
  { path: 'login', component: LoginComponent },
  { path: 'register',  component: LoginComponent },
  // error
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
