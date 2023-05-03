import { Component, Input, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import * as nodes from "src/app/shared/nodes";
import { AppState } from 'src/app/reducers';
import { EventFailure, changeTree, deleteEvent, changeEvent } from './event.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faCheck, faTrash, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EventService } from './event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations: [
    trigger('wrapper', [
      state('void', style({
        'opacity': '0',
        'width' : '0',
        'height': '0',
      })),
      state('normal', style({
        'opacity': '1',
        'width': '170px',
        'height': '107px',
      })),  
      transition('normal <=> void', animate('450ms cubic-bezier(0.68, -0.55, 0.265, 1.2)'))
    ])
  ]
})
export class EventComponent {
  @Input('parent') parent: nodes.Node[];
  @Input('index') index: any;
  @Input('divList') divList: any;
  @Input('level') level: number;
  
  @ViewChild('thisDiv', {static: false}) thisDiv: any;

  thisEvent: any;
  WINDOW: number;
  detailsOpen: boolean;
  wrapper: string = 'false';
  deleteIcon = faTrash;
  errorIcon = faXmark;
  checkIcon = faCheck;
  pickedColor: boolean = false;
  colors: any[] = [
    { name: 'red', pastel: false },
    { name: 'orange', pastel: false },
    { name: 'var(--eventColor)', pastel: false },
    { name: 'green', pastel: false },
    { name: 'rgb(250 137 157)', pastel: false },
    { name: 'yellow', pastel: true },
    { name: '#fc5454', pastel: true },
    { name: '#FFDAB9', pastel: true },
    { name: '#B8E8FC', pastel: true },
    { name: '#98FB98', pastel: true },
    { name: 'pink', pastel: true },
    { name: '#F0E68C', pastel: true }
  ];

  serviceSubscription: Subscription
  
  constructor(
    private store: Store,
    private service: EventService
  ){
   
  }

  ngOnInit() {
    this.level += 1;
    this.thisEvent = this.parent[this.index]; 
  }

  selectColor(color: string){
    this.thisEvent.color = color;
    this.wrapper = 'void';
    this.pickedColor = !this.pickedColor;
    const eventCopy = JSON.parse(JSON.stringify(this.thisEvent))
    this.store.dispatch(changeEvent({id: this.thisEvent.ID, event: eventCopy}))
    this.detailsOpen = false;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.WINDOW = window.innerWidth - 287
    }, 50);
    window.addEventListener('resize', this.checkWindow)
  }

  checkWindow = () => {
    this.WINDOW = window.innerWidth - 287
  }

  openDetails(bool: boolean) {
    this.wrapper = bool ? 'normal' : 'void';
    this.detailsOpen = bool;
  }

  deleteNode(){
    this.thisEvent.state = 'loading'
    this.service.deleteEvent(this.thisEvent.ID)
    .subscribe(data => {
      nodes.deleteEvent(this.thisEvent, this.parent, this.index)
      this.store.dispatch(changeTree())
    }, 
    error => {
      this.thisEvent.state = 'error'
      setTimeout(() => {
        this.thisEvent.state = ''
      }, 2000);
      this.store.dispatch(EventFailure({message: `Couldn\'t remove ${this.thisEvent.start} - ${this.thisEvent.end}`}))
    })
  }

  moveEvent() {
    this.thisEvent.state = 'loading'
    nodes.moveEvent(this.thisEvent, this.parent, this.index);
    
    const eventCopy = JSON.parse(JSON.stringify(this.thisEvent))
    this.store.dispatch(changeEvent({id: this.thisEvent.ID, event: eventCopy}))
  }

  resizeEvent(event: boolean) {
    this.thisEvent.state = 'loading'
    nodes.resizeEvent(event, this.thisEvent, this.parent, this.index)

    const eventCopy = JSON.parse(JSON.stringify(this.thisEvent))
    this.store.dispatch(changeEvent({id: this.thisEvent.id, event: eventCopy}))
  }

  getEventTime() {
    let timeData: any = {
      start: {
        hours: '00',
        minutes: '00',
        meridiem: 'AM'
      },
      end: {
        hours: '00',
        minutes: '00',
        meridiem: 'AM'
      }
    };

    timeData.start.hours = this.getHours(this.thisEvent.start).hour
    timeData.start.meridiem = this.getHours(this.thisEvent.start).meridiem
    timeData.start.minutes = this.getMinutes(this.thisEvent.start);
    
    timeData.end.hours = this.getHours(this.thisEvent.end).hour
    timeData.end.meridiem = this.getHours(this.thisEvent.end).meridiem
    timeData.end.minutes = this.getMinutes(this.thisEvent.end);
    return timeData
  }

  getHours(index: number) {
    const meridiem = Math.floor(index / 4) > 11 ? ' PM': ' AM';
    const hour = Math.floor(index / 4) % 12 == 0 ? 12 : Math.floor(index / 4) % 12;
    return {hour: hour, meridiem: meridiem}
  }

  getMinutes(index: number) {
    return (index % 4) * 15;
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkWindow)
  }
}
