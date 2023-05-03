import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable, Subscription, map} from 'rxjs';
import { selectOpenComponent } from './UI-store/UI.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { openComponent } from './UI-store/UI.actions';
import { selectToday } from './calendar/calendar.selectors';
import { getEvents } from './event/event.actions';
import { tap } from 'rxjs'

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
    ])
  ]
})

export class AppComponent {
  isComponentOpen$: Observable<string> = this.store.pipe(select(selectOpenComponent))
  fixedState$: Observable<string> = this.isComponentOpen$.pipe(
    map(data => data == '' ? 'void': 'normal')
  )
  lastlySavedDate: Date = new Date();

  constructor(
    private store: Store<any>
  ){
    const date: Date = new Date();
    this.store.dispatch(getEvents({day: date}))
  }
  
  closeComponent() {
    this.store.pipe(select(selectToday))
      .subscribe((data: any) => {
        const newDate: Date = new Date(data)
        if(
          new Date(this.lastlySavedDate).getMonth() != newDate.getMonth() ||
          new Date(this.lastlySavedDate).getFullYear() != newDate.getFullYear()
        ){
          const dateCopy = new Date(JSON.parse(JSON.stringify(newDate)))
          this.lastlySavedDate = dateCopy
          this.store.dispatch(getEvents({day: dateCopy}))
        }
      }
    ).unsubscribe()
    this.store.dispatch(openComponent({component: ''}))
  }
  
}
