import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { getMonthOpenState, getYearOpenState } from '../UI-store/UI.selectors'
import { Observable, map, tap } from 'rxjs';
import { selectDate } from '../calendar/calendar.actions';
import { toggleMonth, toggleYear } from '../UI-store/UI.actions';

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
  @Input('today') today: Date;
  currentMonth: string;

  monthOpen$: Observable<boolean> = this.store.pipe(
    select(getMonthOpenState)
  )
  container$ = this.monthOpen$.pipe(
    map(monthOpen => monthOpen ? 'normal' : 'void')
  );

  constructor(
    private store: Store<AppState>
  ) {
  }
  
  months: any[] = [
    ['Jan', 'Feb', 'Mar'], 
    ['Apr', 'May', 'Jun'], 
    ['Jul', 'Aug', 'Sept'], 
    ['Oct', 'Nov', 'Dec']
  ];

  ngOnInit() {
    this.currentMonth = this.months[Math.floor((this.today.getMonth() / 3))][this.today.getMonth() % 3]
  }

  ngOnDestroy() {
  }

  openMonths() {
    this.store.dispatch(toggleMonth({bool : true}))
  }

  openYears() {
    this.store.dispatch(toggleYear({bool: true}))
  }

  pickMonth(i: number, j: number) {
    this.currentMonth = this.months[i][j]; // set month locally
    const monthIndex = (i * 3) + j
    let newDate: Date = new Date()
    newDate.setMonth(monthIndex)
    const dateToString: Date = newDate;

    this.store.dispatch(selectDate({date: new Date(dateToString)}))
  }

  
}
