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
  
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  ngOnInit() {
    setInterval(() => {
      this.date = new Date();
    }, 1000); // 
    console.log(this.year, this.month, this.day, this.hours, this.minute, this.second)
  }

  ngOnDestroy() {
    
  }
}
