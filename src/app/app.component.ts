import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable, Subscription, interval, map, tap} from 'rxjs';
import { selectOpenComponent } from './UI-store/UI.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { openComponent } from './UI-store/UI.actions';
import { selectToday } from './calendar/calendar.selectors';
import { getEvents, setMessage } from './event/event.actions';
import { errorSelector, messageSelector } from './event/event.selectors';
import { loginOpenSelector, selectIsLoggedIn } from './login/login.selectors';
import { Router } from '@angular/router';
import { AuthService } from './login/login.service';
import { loginFailure, loginSuccess } from './login/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fixed', [
      state('void', style({
        'opacity': '0'
      })),
      state('normal', style({
        'opacity': '1'
      })),
      transition('void <=> normal', animate(200))
    ]),
    trigger('messages', [
      state('closed', style({
        'transform':  'translateX(150%)'
      })),
      state('open', style({
        'transform': 'translateX(0)'
      })),
      transition('closed <=> open', animate('350ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})

export class AppComponent {
  isLoginOpen$: Observable<boolean> = this.store.pipe(select(loginOpenSelector))
  isComponentOpen$: Observable<string> = this.store.pipe(select(selectOpenComponent))
  fixedState$: Observable<string> = this.isComponentOpen$.pipe(
    map(data => data == '' ? 'void': 'normal')
  )
 
  messageState: string = 'closed';
  animationTimeout: any;
  animationCloseTimeout: any;
  message: string;
  error: boolean;

  constructor(
    private router: Router,
    private store: Store<any>,
    private loginService: AuthService
  ){
    const date: Date = new Date();
    // this.store.dispatch(getEvents({date: date}))

    this.store.pipe(select(messageSelector))
    .subscribe((data) => {
      this.handleMessages(data.message, false)
    })

    this.store.pipe(select(errorSelector))
    .subscribe((data) => {
      if(typeof data == 'number'){
        this.handleMessages({message: 'An error occured'}, true)
      }
    })

    // const local = JSON.parse(localStorage.getItem('schedule_login'))
    // local.access = ''
    // localStorage.setItem('schedule_login',JSON.stringify(local))

    this.loginService.checkTokenValidityInit();
    setInterval(() => {
      const loginInfo = JSON.parse(localStorage.getItem('schedule_login'));

      if(loginInfo?.refresh?.length > 1 && loginInfo?.refresh_expire > new Date().getTime()){
        this.loginService.refreshToken(loginInfo?.refresh, false);
      } else {
        this.router.navigate(['login']);
        this.store.dispatch(setMessage({message: 'Your session has expired'}))
      }
    }, 14 * 60 * 1000);
  }

  
  

  //messages
  handleMessages(data: any, err: boolean){
    if(!data?.message || data?.message.length <= 1){
      return
    }
    this.messageState = 'closed';
    clearTimeout(this.animationTimeout);
    clearTimeout(this.animationCloseTimeout)
      
    this.animationTimeout = setTimeout(() => {
      this.error = err;
      this.message = data.message;
      this.messageState = 'open';
      this.animationCloseTimeout = setTimeout(() => {
        this.messageState = 'closed'
      }, 1200);
    }, 350);
  }
  
  //popups
  closeComponent() {
    this.store.dispatch(openComponent({component: ''}))
  }


}
