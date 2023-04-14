import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectToday } from '../calendar.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  today: Date;
  currentYear: number;
  currentMonth: number;
  currentDay: number;
  daysInMonth: number;
  firstDayOfMonth: number;

  realToday: Date = this.getDateWithoutHours(new Date()); // current date, no hours
  
  rows: any[] = [];

  todaySubscription: Subscription;
 
  constructor(
    private store: Store<AppState>
  ) {
    this.todaySubscription = this.store.pipe(select(selectToday))
    .subscribe((today: Date) => {
      const fixedToday = this.getDateWithoutHours(today)
      this.setNewDate(fixedToday)
      this.renderCalendar();
    }, error => console.error(error));
  }

  renderCalendar() {
    this.rows = []
    let row = [];
    for (let i = 0; i < this.firstDayOfMonth; i++) {
      row.push(null);
    }
    for (let i = 1; i <= this.daysInMonth; i++) {
      row.push(i);
      if ((i + this.firstDayOfMonth) % 7 === 0) {
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
    this.today = today;
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
    this.currentDay = today.getDate();
    this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
  }

  ngOnDestroy(): void {
    this.todaySubscription.unsubscribe();
  }

  gotToday() {
    if(!this.today){
      return false
    } else {
      return new Date(this.today).toString() == this.getDateWithoutHours(new Date()).toString()
    }
  }

  getDateWithoutHours(date: Date) {
    date.setHours(0)
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date
  }

}
