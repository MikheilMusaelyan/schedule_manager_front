import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { selectToday } from '../calendar.selectors';

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
  
  rows: any[] = [];
 
  constructor(
    private store: Store<AppState>
  ) {
    this.store.pipe(select(selectToday)).subscribe((today: Date) => {
      console.log(today, 'unsubscribe')
      this.today = today; // we have to unsub
      this.currentYear = today.getFullYear();
      this.currentMonth = today.getMonth();
      this.currentDay = today.getDate();
      this.daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
      this.renderCalendar();
    },
      error => console.error(error)
    );
    
    
  }

  renderCalendar() {
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


}
