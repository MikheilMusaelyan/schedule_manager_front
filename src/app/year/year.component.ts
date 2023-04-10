import { Component } from '@angular/core';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})

export class YearComponent {
  
  months: any[] = [
    ['Jan', 'Feb', 'Mar'], 
    ['Apr', 'May', 'Jun'], 
    ['Jul', 'Aug', 'Sept'], 
    ['Oct', 'Nov', 'Dec']
  ];

  ngOnInit() {}

  ngOnDestroy() {}

  openMonths() {

  }

  openYears() {
    
  }

  constructor() { }
}
