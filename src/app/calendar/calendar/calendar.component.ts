import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectToday } from '../calendar.selectors';
import { Observable, Subscription, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { selectDate } from '../calendar.actions';
import { detectGetEvents } from 'src/app/event/event.selectors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  selectedDate: Date;
  rows: any[] = [];
  todaySubscription: Subscription = new Subscription();
  eventSelector$: Observable<any> = this.store.pipe(select(detectGetEvents)).pipe(
    map(data => {
      if(data[`d${new Date().getDate()}`]){
        return data[`d${new Date().getDate()}`]['length']
      }
      return 0
    })
  )
 
  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.todaySubscription = this.store.pipe(select(selectToday)).subscribe((today: Date) => {
      this.renderCalendar(this.setNewDate(today));
    })
  }

  goToSingleDay(day: number) {
    let newDate: Date = new Date(this.selectedDate.setDate(day))
    this.store.dispatch(selectDate({date: newDate}))
    this.router.navigate(['singleday'])
  };

  renderCalendar(today: any) {
    this.rows = [];
    let row = [];
    for (let i = 0; i < today.firstDayOfMonth; i++) {
      row.push(null);
    }
    for (let i = 1; i <= today.daysInMonth; i++) {
      row.push(i);
      if ((i + today.firstDayOfMonth) % 7 === 0) {
        this.rows.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      for (let i = row.length; i < 7; i++) {
        row.push(null);
      }
      this.rows.push(row);
    }
  }

  setNewDate(today: Date) {
    this.selectedDate = new Date(today);
    const newDate: any = { // to render the calendar
      daysInMonth: new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0).getDate(),
      firstDayOfMonth: new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1).getDay(),
    }; 
    return newDate
  }

  isDayToday(day: number) {
    return this.selectedDate.getMonth() == new Date().getMonth() &&
    this.selectedDate.getFullYear() == new Date().getFullYear() &&
    new Date().getDate() == day;
  };

  ngOnDestroy(): void {
    this.todaySubscription.unsubscribe();
  }
}
