import { Component, Host } from '@angular/core';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent {
  date: Date = new Date();

  month = this.date.getMonth()
  year = this.date.getFullYear(); 
  day = this.date.getDate()
  hours = this.date.getHours()
  minute = this.date.getMinutes();
  second = this.date.getSeconds(); 
  
  months: any[] = [
    ['Jan', 'Feb', 'Mar'], 
    ['Apr', 'May', 'Jun'], 
    ['Jul', 'Aug', 'Sept'], 
    ['Oct', 'Nov', 'Dec']
  ];

  ngOnInit() {
    console.log(this.year, this.month, this.day, this.hours, this.minute, this.second)
  }

  ngOnDestroy() {
    
  }


  constructor() { }


 
}
