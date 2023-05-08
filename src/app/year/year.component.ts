import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectOpenComponent } from '../UI-store/UI.selectors'
import { Observable, Subscription, map, tap } from 'rxjs';
import { selectDate } from '../calendar/calendar.actions';
import { openComponent } from '../UI-store/UI.actions';
import { selectToday } from '../calendar/calendar.selectors';
import { months } from '../shared/shared';
import { getEvents } from '../event/event.actions';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})

export class YearComponent {
  today: Date;
  currentMonth: string;
  currentYear: number;
  months: any[] = months;

  today$: Observable<any> = this.store.pipe(select(selectToday))
  todaySubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
  ) {
    
  }
  
  ngOnInit() {
    this.todaySubscription = this.today$.subscribe((today: Date) => {
      this.today = today
      this.currentYear = today.getFullYear();
      this.currentMonth = this.months[Math.floor((today.getMonth() / 3))][today.getMonth() % 3];
    });
  }

  // UI store
  openMonths() {
    this.store.dispatch(openComponent({component : 'monthsCard'}))
  }  

  openYears() {
    this.store.dispatch(openComponent({component: 'yearsCard'}))
  }

  ngOnDestroy(){
    this.todaySubscription.unsubscribe()
  }
}
