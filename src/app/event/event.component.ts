import { Component, Input, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { NodesService, Node } from "src/app/shared/nodes";
import { EventFailure, changeTree, deleteEvent, changeEvent, REMOVEvent, setMessage } from './event.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faCheck, faEdit, faTrash, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { EventService } from './event.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    ]),
    trigger('edit', [
      state('void', style({
        'opacity': '0',
        'width' : '0',
        'height': '0',
      })),
      state('normal', style({
        'opacity': '1',
        'width': '200px',
        'height': '35px',
      })),  
      transition('normal <=> void', animate('450ms cubic-bezier(0.68, -0.55, 0.265, 1.2)'))
    ])
  ]
})
export class EventComponent {
  @Input('parent') parent: Node[];
  @Input('index') index: any;
  @Input('divList') divList: any;
  @Input('level') level: number;
  
  @ViewChild('thisDiv', {static: false}) thisDiv: any;

  thisEvent: any;
  WINDOW: number;
  detailsOpen: boolean;
  wrapper: string = 'false';
  editState: string = 'void'
  deleteIcon = faTrash;
  errorIcon = faXmark;
  checkIcon = faCheck;
  editIcon = faEdit;
  pickedColor: boolean = false;
  editingName: boolean = false;
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
  
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.maxLength(50)]),
  });
  
  constructor(
    private store: Store,
    private service: EventService,
    private nodes: NodesService
  ){
    
  }

  openEdit(){
    if(this.editingName){
      this.editingName = false
      return
    }
    this.editingName = true
    this.editState = 'normal'
  }

  editName(event?: any){
    this.editingName = false;
    setTimeout(() => {
      this.detailsOpen = false
    }, 150);
    this.thisEvent.name = this.form.controls.name.value
    this.moveEvent()
  }
 

  ngOnInit() {
    this.level += 1;
    this.thisEvent = this.parent[this.index]; 
    this.form.get('name').setValue(this.thisEvent.name == '(No title)' ? null : this.thisEvent.name);
  }

  selectColor(color: string){
    if(this.editingName){
      return
    }
    this.thisEvent.color = color;
    this.pickedColor = !this.pickedColor;
    const eventCopy = JSON.parse(JSON.stringify(this.thisEvent))
    this.store.dispatch(changeEvent({ event: eventCopy }))
    this.detailsOpen = false;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.checkWindow()
    }, 50);
    window.addEventListener('resize', this.checkWindow)
  }

  checkWindow = () => {
    if(window.innerWidth < 600){
      this.WINDOW = window.innerWidth - 81
    } else {
      this.WINDOW = window.innerWidth - 187
    }
  }

  openDetails(bool: boolean) {
    if(!bool){
      this.editingName = false;
      this.detailsOpen = false;
    } else{
      this.detailsOpen = true;
      this.wrapper = 'normal';
    }
    
  }

  deleteNode(){
    this.thisEvent.state = 'loading'
    this.editingName = false;
    this.detailsOpen = false;
    this.service.deleteEvent(this.thisEvent.serverId)
    .subscribe(data => {
      this.store.dispatch(REMOVEvent({
        eventId: this.thisEvent.serverId, 
        eventDay: new Date(this.thisEvent.date).getDate()
      }))
      this.nodes.deleteEvent(this.thisEvent, this.parent, this.index);
      this.store.dispatch(changeTree());
      this.store.dispatch(setMessage({message: 'Event Removed Successfully!'}));
    },
    error => {
      this.thisEvent.state = 'error'
      setTimeout(() => {
        this.thisEvent.state = ''
      }, 2000);
      this.store.dispatch(EventFailure())
    })
  }

  moveEvent() {
    this.thisEvent.state = 'loading'
    this.nodes.moveEvent(this.thisEvent, this.parent, this.index);
    
    const eventCopy = JSON.parse(JSON.stringify(this.thisEvent))
    this.store.dispatch(changeEvent({ event: eventCopy }))
  }

  resizeEvent(event: boolean) {
    this.thisEvent.state = 'loading'
    this.nodes.resizeEvent(event, this.thisEvent, this.parent, this.index)

    const eventCopy = JSON.parse(JSON.stringify(this.thisEvent))
    this.store.dispatch(changeEvent({ event: eventCopy }))
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
