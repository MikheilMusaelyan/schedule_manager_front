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
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css'],
  animations: [
    trigger('container', [
      state('void', style({
        'opacity': '0',        
      })),
      state('*', style({
        'opacity': '1',        
      })),
      transition('void <=> *', animate(200))
    ])
  ]
})
export class PopupsComponent {
  today: Date;
  currentMonth: string;
  currentYear: number;

  // representation of date
  months: any[] = months;
  years: number[] = [];

  // calendar store
  today$: Observable<any> = this.store.pipe(select(selectToday))
  todaySubscription: Subscription = new Subscription();
  
  // UI store
  openComponent$: Observable<string> = this.store.pipe(select(selectOpenComponent))

  constructor(
    private store: Store<AppState>,
  ) {
    for(let i = -1; i < 11; i++) {
      this.years.push(new Date().getFullYear() + i)
    }
  }
  
  ngOnInit() {
    this.todaySubscription = this.today$.subscribe((today: Date) => {
      this.today = today
      this.currentYear = today.getFullYear();
      this.currentMonth = this.months[Math.floor((today.getMonth() / 3))][today.getMonth() % 3];
    });
  }

  // calendar store

  pickMonth(i: number, j: number) {
    const monthIndex = (i * 3) + j; // get monthindex locally

    let newDate: Date = new Date(this.today)
    newDate.setMonth(monthIndex)
    
    this.pickDate(newDate)
  }

  pickYear(year: number) {
    let newDate: Date = new Date(this.today)
    newDate.setFullYear(year)

    this.pickDate(newDate)
  }

  pickDate(newDate: Date) {
    newDate = new Date(newDate)
    this.store.dispatch(openComponent({component: ''}))
    this.store.dispatch(selectDate({date: newDate}))
  }

  // UI store
  openMonths() {
    this.store.dispatch(openComponent({component : 'monthsCard'}))
  }  

  openYears() {
    this.store.dispatch(openComponent({component: 'yearsCard'}))
  }

  ngOnDestroy(): void {
    this.todaySubscription.unsubscribe();
  }
  
}
