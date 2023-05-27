import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { convertTime } from '../shared/shared';
import { Observable } from 'rxjs';
import { upcomingSelector } from '../event/event.selectors';
import { Router } from '@angular/router';
import { selectDate } from '../calendar/calendar.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upcomingevents',
  templateUrl: './upcomingevents.component.html',
  styleUrls: ['./upcomingevents.component.css']
})
export class UpcomingeventsComponent {
  upcoming$: Observable<any[]> = this.store.pipe(select(upcomingSelector))

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ){
    
  }

  getConverted(time: string | number, bool: boolean){
    return convertTime(time, bool)
  }

  getDate(date: string){
    const day = new Date(date).getDate()
    const newDate = new Date(date)
    newDate.setDate(day + 1)
    const formattedDate = newDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate
  }

  goToSingleDay(date: string){
    const day = new Date(date).getDate()
    const newDate = new Date(date)
    newDate.setDate(day + 1)
    this.store.dispatch(selectDate({date: newDate}))
    this.router.navigate(['singleday'])
  }
}
