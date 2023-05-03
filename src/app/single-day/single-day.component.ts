import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NodesService } from '../shared/nodes'
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable, Subscription } from 'rxjs';
import { detectChange, detectGetEvents, selectEventState } from '../event/event.selectors';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { selectToday } from '../calendar/calendar.selectors';
import { months } from '../shared/shared';
import { selectDate } from '../calendar/calendar.actions';
import { addEvent, changeTree, getEvents } from '../event/event.actions';
import { EventState } from '../event/reducers';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css'],
})
export class SingleDayComponent implements OnInit, AfterViewInit{
  @ViewChild('main', {static: false}) main: any;
  @ViewChild('divList', {static: false}) divList: any;
  @ViewChild('mainDiv', {static: false}) mainDiv: any;

  scrollRight = faArrowRight;
  scrollLeft = faArrowLeft;

  nodez: any[];
  myDivList: any;
  rows: any[] = [];
  months: any[] = months;
  mainScrollWidth: number;
  changeSubscription: Subscription; //////////

  intervalTimeout: any;
  touchEvent: boolean;

  selectToday$: Observable<Date> = this.store.pipe(select(selectToday));
  today: Date;
  todaySubscription: Subscription;
  
  //designs
  constructor(
    private store: Store<AppState>,
    private loadingStore: Store<EventState>,
    private nodes: NodesService
  ) {
    for (let i = 0; i < 24; i++) {
      const hour = String(i % 12 == 0 ? 12 : i % 12);
      const meridiem = i < 12 ? ' AM' : ' PM'
      for (let j = 0; j < 4; j++) {
        const minute = (j * 15) % 60 == 0 ? '00' : String(j * 15)
        const object = {
          hour: +hour,
          minute: +minute,
          meridiem: meridiem,
          string: hour + meridiem
        } 
        this.rows.push(object)
      }
    }
    this.rows.push({});
    this.todaySubscription = this.selectToday$.subscribe((data: Date) => {
      this.today = data
    })
  }

  changeDay(newDay: number){
    const todayMonthCopy = this.today.getMonth()
    const selectedDay = this.today.getDate();
    this.today.setDate(selectedDay + newDay)
    if(todayMonthCopy != this.today.getMonth()){
      this.store.dispatch(getEvents({day: this.today}))
    } else {
      this.store.dispatch(selectDate({date: this.today}))
      newDay == 1 ? this.slide(true) : this.slide(false)
    }
  }  

  slide(bool: boolean) {
    const transformValue = bool ? 15 : -15;

    this.main.nativeElement.style.transition = 'opacity 130ms, transform 150ms';
    this.main.nativeElement.style.opacity = '0';
    this.main.nativeElement.style.transform = `translateX(${-transformValue * 1.5}%)`;

    setTimeout(() => {
      this.main.nativeElement.style.transition = '';
      this.main.nativeElement.style.transform = `translateX(${transformValue * 3}%)`;
    }, 200);

    setTimeout(() => {
      this.main.nativeElement.scrollLeft = 0
      this.main.nativeElement.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1';
      this.main.nativeElement.style.opacity = '1';
      this.main.nativeElement.style.transform = `translateX(0)`;
    }, 300);
  }

  getMonthName(monthIndex: number) {
    return this.months[Math.floor((monthIndex / 3))][monthIndex % 3]
  }

  addEvent(index: number) {
    let event = { 
      start: Math.min(index, 96), 
      end: Math.min(96, index + 4), 
      children: [], 
      id: null,
      color: {
        name: 'var(--eventColor)', 
        pastel: false
      }, 
      isNew: true,
      date: this.today,
      ID: null,
      state: 'loading'
    }
    this.nodes.newNode(this.nodes.childs, event);

    const eventCopy = JSON.parse(JSON.stringify(event))
    this.store.dispatch(addEvent({event: eventCopy}))
  }

  ngOnInit() {
    setTimeout(() => {
      this.nodez = this.nodes.childs;
    }, 0);
  }   

  // change designs 
  ngAfterViewInit(): void  {
    window.addEventListener('resize', this.changeWidthValue);

    setTimeout(() => {
      this.changeWidthValue()

      this.changeSubscription = this.store.pipe(select(detectChange)).subscribe((bool: boolean) => {
        setTimeout(() => {
         this.changeWidthValue();
        }, 300);
      })
    }, 0);
  }

  changeWidthValue = () => {
    this.mainScrollWidth = 0;
    setTimeout(() => {
      this.mainScrollWidth = this.main.nativeElement.scrollWidth
    }, 0);
  }

  startScroll(bool: boolean) {
    clearInterval(this.intervalTimeout);
    const scrollValue = bool ? -20 : 20;
    this.intervalTimeout = setInterval(() => {
      this.main.nativeElement.scrollLeft -= scrollValue;
    }, 10);
  }
  
  stopScroll() {
    clearInterval(this.intervalTimeout);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.changeWidthValue);
    this.changeSubscription.unsubscribe()
    this.todaySubscription.unsubscribe()
  }

}