import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  currentYear$: Observable<number>;
  currentMonth$: Observable<number>;
  currentDay$: Observable<number>;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  currentDay: number = new Date().getDate()
  daysInMonth: number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  firstDayOfMonth: number = new Date(this.currentYear, this.currentMonth, 1).getDay();
  
  rows: any[] = [];
 
  constructor() {
    setTimeout(() => {
      console.log(this.currentMonth)
    }, 1000);
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
