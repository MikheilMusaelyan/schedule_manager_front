import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { convertTime } from '../shared/shared';
import { Observable, Subscription } from 'rxjs';
import { upcomingSelector } from '../event/event.selectors';
import { Router } from '@angular/router';
import { selectDate } from '../calendar/calendar.actions';
import { HttpClient } from '@angular/common/http';
import { setUpcoming } from '../event/event.actions';

@Component({
  selector: 'app-upcomingevents',
  templateUrl: './upcomingevents.component.html',
  styleUrls: ['./upcomingevents.component.css']
})
export class UpcomingeventsComponent {
  upcoming$: Observable<any[]> = this.store.pipe(select(upcomingSelector))
  upcomingSubscription: Subscription = new Subscription()

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ){}

  ngOnInit() {
    this.upcomingSubscription = this.http.get('http://127.0.0.1:8000/api/upcoming/')
    .subscribe((events: any) => {
      this.store.dispatch(setUpcoming({upcoming: events.upcoming}))
    })
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

  ngOnDestroy() {
    this.upcomingSubscription.unsubscribe()
  }
}
