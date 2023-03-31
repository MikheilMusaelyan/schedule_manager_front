import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  year: number = 2026;
  month: number = 0;


  daysInMonth: number = new Date(this.year, this.month + 1, 0).getDate();

  firstDayOfMonth: number = new Date(this.year, this.month, 1).getDay();

  rows: any[] = [];
  
  goToSingleDay(reference: any) {
    const left = reference.offsetLeft
    const top = reference.offsetTop 
    const width = reference.clientWidth
    const height = reference.clientHeight
    
    
    const navigationExtras: any = {
      queryParams: {
        left: left,
        top: top,
        width: width,
        height: height
      }
    };
    this.router.navigate(['singleday'], navigationExtras);
  }
 
  constructor(
    private router: Router
  ) {
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

