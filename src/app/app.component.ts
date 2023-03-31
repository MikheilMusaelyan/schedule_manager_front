import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year: number = 2026;
  month: number = 10; // March

  daysInMonth: number = new Date(this.year, this.month + 1, 0).getDate();

  firstDayOfMonth: number = new Date(this.year, this.month, 1).getDay();

  rows: any[] = [];

  constructor() {
    console.log(this.daysInMonth, this.firstDayOfMonth);
    let row = [];
    for (let i = 0; i < this.firstDayOfMonth; i++) {
      row.push(null);
    }
    for (let i = 1; i <= this.daysInMonth; i++) {
      row.push(i);
      console.log(row)
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
    console.log(row,this.rows)
  }
}

