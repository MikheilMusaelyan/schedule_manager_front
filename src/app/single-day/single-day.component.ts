import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NodesService } from '../shared/nodes'
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable, Subscription } from 'rxjs';
import { detectChange, detectGetEvents, selectEventState } from '../event/event.selectors';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { selectToday } from '../calendar/calendar.selectors';
import { months } from '../shared/shared';
import { addEvent, changeTree, getEvents } from '../event/event.actions';
import { EventState } from '../event/reducers';
import { selectDate } from '../calendar/calendar.actions';

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

  nodez: any[] = this.nodes.childs;
  myDivList: any;
  rows: any[] = [];
  months: any[] = months;
  mainScrollWidth: number;
  changeSubscription: Subscription; //////////
  slideTo: boolean | string = ''

  intervalTimeout: any;
  touchEvent: boolean;

  selectToday$: Observable<Date> = this.store.pipe(select(selectToday));
  today: Date;
  todaySubscription: Subscription;
  slideTimeout: any
  changeTimeout: any

  
  //designs
  constructor(
    private store: Store<AppState>,
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
      clearTimeout(this.slideTimeout)
      if(this.nodez?.length == 0 && typeof(this.slideTo) !== 'string') {
        this.slideTimeout = setTimeout(() => {
          this.nodez = []
          this.nodez = this.nodes.childs
        }, 170);
      } else {
        this.slideTimeout = setTimeout(() => {
          this.nodez = []
          this.nodez = this.nodes.childs
        }, 170);
      }
      this.slide(this.slideTo)
      this.today = new Date(JSON.parse(JSON.stringify(data)))
    })
  }

  changeDay(newDay: number){
    this.slideTo = newDay == 1 ? true : false;
    const selectedDay = this.today.getDate();
    const todayCopy = new Date(JSON.parse(JSON.stringify(this.today)))
    todayCopy.setDate(selectedDay + newDay)
    this.store.dispatch(selectDate({date: todayCopy}))
  }

  slide(bool: boolean | string) {
    if(typeof bool == 'string'){
      return
    }

    const transformValue = bool ? 5 : -8;

    this.main.nativeElement.style.transition = 'opacity 150ms, transform 200ms';
    this.main.nativeElement.style.opacity = '0';
    this.main.nativeElement.style.transform = `translateX(${-transformValue}%)`;

    setTimeout(() => {
      this.main.nativeElement.style.transition = '';
      this.main.nativeElement.style.transform = `translateX(${transformValue}%)`;
    }, 250);

    clearTimeout(this.changeTimeout)
    this.changeTimeout = setTimeout(() => {
      this.main.nativeElement.scrollLeft = 0
      this.main.nativeElement.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)';
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
      name: '(No title)',
      children: [], 
      id: null,
      color: {
        name: 'var(--eventColor)', 
        pastel: false
      }, 
      date: this.today,
      serverId: null,
      state: 'loading'
    }
    this.nodes.newNode(this.nodes.childs, event);

    const eventCopy = JSON.parse(JSON.stringify(event))
    this.store.dispatch(addEvent({event: eventCopy}))
  }

  ngOnInit() {
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