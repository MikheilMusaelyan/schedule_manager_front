import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { convertTime } from '../shared/shared';
import { Observable, Subscription } from 'rxjs';
import { upcomingSelector } from '../event/event.selectors';
import { Router } from '@angular/router';
import { selectDate } from '../calendar/calendar.actions';
import { HttpClient } from '@angular/common/http';
import { setUpcoming } from '../event/event.actions';
import { selectIsLoggedIn } from '../login/login.selectors';

@Component({
  selector: 'app-upcomingevents',
  templateUrl: './upcomingevents.component.html',
  styleUrls: ['./upcomingevents.component.css']
})
export class UpcomingeventsComponent {
  upcoming$: Observable<any[]> = this.store.pipe(select(upcomingSelector))
  upcomingSubscription: Subscription = new Subscription()
  upcomingHttpSubscription: Subscription = new Subscription()

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ){}
  
  ngOnInit() {
    this.upcomingSubscription = this.store.pipe(select(selectIsLoggedIn)).subscribe(data => {
      if(data) {
        this.upcomingHttpSubscription = this.http.get('https://drf.up.railway.app/api/upcoming/')
        .subscribe((events: any) => {
          this.store.dispatch(setUpcoming({upcoming: events.upcoming}))
        })
      }
    })
  }

  getConverted(time: string | number, bool: boolean){
    return convertTime(time, bool)
  }

  getDate(date: string){
    const formattedDate = new Date(date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate
  }

  goToSingleDay(date: string){
    this.store.dispatch(selectDate({date: new Date(date)}))
    this.router.navigate(['singleday'])
  }

  ngOnDestroy() {
    this.upcomingSubscription.unsubscribe()
    this.upcomingHttpSubscription.unsubscribe()
  }
}
