import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectOpenComponent } from '../UI-store/UI.selectors'
import { Observable, Subscription, map, tap } from 'rxjs';
import { selectDate } from '../calendar/calendar.actions';
import { openComponent } from '../UI-store/UI.actions';
import { selectToday } from '../calendar/calendar.selectors';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css'],
  animations: [
    trigger('container', [
      state('void', style({
        'opacity': '0',        
      })),
      state('normal', style({
        'opacity': '1',        
      })),
      transition('void <=> normal', animate(200))
    ])
  ]
})

export class YearComponent {
  today: Date;
  currentMonth: string;
  currentYear: number;
  months: any[] = [
    ['Jan', 'Feb', 'Mar'], 
    ['Apr', 'May', 'Jun'], 
    ['Jul', 'Aug', 'Sept'], 
    ['Oct', 'Nov', 'Dec']
  ];
  years: number[] = [];

  today$: Observable<any> = this.store.pipe(select(selectToday))
  todaySubscription: Subscription;

  openComponent$: Observable<string> = this.store.pipe(select(selectOpenComponent))
  openComponentState$: Observable<string> = this.openComponent$.pipe(
    map(open => open == '' ? 'void' : 'normal')
  )

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

  openMonths() {
    this.store.dispatch(openComponent({component : 'monthsCard'}))
  }  

  openYears() {
    this.store.dispatch(openComponent({component: 'yearsCard'}))
  }

  pickMonth(i: number, j: number) {
    const monthIndex = (i * 3) + j; // get monthindex locally
    let newDate: Date = new Date(this.today)
    newDate.setMonth(monthIndex)
    newDate = new Date(newDate)
    this.store.dispatch(selectDate({date: newDate}))
  }

  pickYear(year: number) {
    let newDate: Date = new Date(this.today)
    newDate.setFullYear(year)
    newDate = new Date(newDate)
    this.store.dispatch(selectDate({date: newDate}))
  }

  ngOnDestroy(): void {
    this.todaySubscription.unsubscribe();
  }
  
}
