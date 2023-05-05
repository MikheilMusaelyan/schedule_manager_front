import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable, Subscription, map} from 'rxjs';
import { selectOpenComponent } from './UI-store/UI.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { openComponent } from './UI-store/UI.actions';
import { selectToday } from './calendar/calendar.selectors';
import { getEvents } from './event/event.actions';
import { errorSelector, messageSelector } from './event/event.selectors';

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
        'opacity': '0.4',
        'transform': 'translateX(-100%)'
      })),
      state('open', style({
        'opacity': '1',
        'transform': 'translateX(0)'
      })),
      transition('closed <=> open', animate(200))
    ])
  ]
})

export class AppComponent {
  isComponentOpen$: Observable<string> = this.store.pipe(select(selectOpenComponent))
  fixedState$: Observable<string> = this.isComponentOpen$.pipe(
    map(data => data == '' ? 'void': 'normal')
  )
  // animtion
  messageState: string = 'open';
  animationTimeout: any;
  message: string;
  error: boolean;

  constructor(
    private store: Store<any>
  ){
    const date: Date = new Date();
    this.store.dispatch(getEvents({date: date}))

    this.store.pipe(select(messageSelector))
    .subscribe((data) => {
      this.handleMessages(data, false)
    })

    this.store.pipe(select(errorSelector))
    .subscribe((data) => {
      this.handleMessages(data, true)
    })
  }

  handleMessages(data: any, err: boolean){
    if(data.length <= 1){
      return
    }
    this.messageState = 'closed';
      clearTimeout(this.animationTimeout);
      
      this.animationTimeout = setTimeout(() => {
        this.error = err;
        this.message = data;
        this.messageState = 'open';

        setTimeout(() => {
          this.messageState = 'closed'
        }, 800);

      }, 200);
  }
  
  closeComponent() {
    this.store.dispatch(openComponent({component: ''}))
  }
  
}
