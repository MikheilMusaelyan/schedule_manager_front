import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as nodes from '../nodes'
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable, Subscription } from 'rxjs';
import { detectChange } from './event.selectors';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { selectToday } from '../calendar/calendar.selectors';
import { months } from '../shared/shared';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css'],
})
export class SingleDayComponent implements OnInit, AfterViewInit{
  @ViewChild('main', {static: false}) main: any;
  @ViewChild('divList', {static: false}) divList: any;

  scrollRight = faArrowRight;
  scrollLeft = faArrowLeft;

  nodes: any[];
  myDivList: any;
  rows: any[] = [];
  mainScrollWidth: number;
  changeSubscription: Subscription;

  intervalTimeout: any;
  touchEvent: boolean;

  selectToday$: Observable<Date> = this.store.pipe(select(selectToday));
  months: any[] = months;
  
  //designs
  constructor(
    private store: Store<AppState>
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
  }

  getMonthName(monthIndex: number) {
    return this.months[Math.floor((monthIndex / 3))][monthIndex % 3]
  }

  addEvent(index: number) {
    nodes.newNode(nodes.childs, { start: index, end: Math.min(96, index + 4), children: [], id: null, color: {value: 'var(--eventColor)', pastel: false}, colorSet: false, isNew: true}) 
  }

  ngOnInit() {
    setTimeout(() => {
      this.nodes = nodes.childs;
    }, 0);
  }   

  // change designs 
  ngAfterViewInit(): void  {
    this.touchEvent = 'ontouchstart' in window;

    window.addEventListener('resize', () => {
      this.changeWidthValue()
    });

    setTimeout(() => {
      this.mainScrollWidth = this.main.nativeElement.scrollWidth;

      this.changeSubscription = this.store.pipe(
        select(detectChange)
      ).subscribe((bool: boolean) => {
       this.changeWidthValue();
      })
    }, 0);
  }

  changeWidthValue() {
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
    window.removeEventListener('resize', () => {
      this.changeWidthValue()
    });
    this.changeSubscription.unsubscribe()
  }

}