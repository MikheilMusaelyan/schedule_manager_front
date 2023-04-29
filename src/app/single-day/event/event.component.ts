import { Component, Input, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import * as nodes from "src/app/nodes";
import { AppState } from 'src/app/reducers';
import { changeTree } from '../event.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
    trigger('absolute', [
      state('hidden', style({
        'opacity': '0',
        'width': 0
      })),
      state('open', style({
        'opacity': '1'
      })),
      transition('hidden => open', animate(200))
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
  pickedColor: boolean = false;
  colors: any[] = [
    { value: 'red', pastel: false },
    { value: 'orange', pastel: false },
    { value: 'var(--eventColor)', pastel: false },
    { value: 'green', pastel: false },
    { value: 'rgb(250 137 157)', pastel: false },
    { value: 'yellow', pastel: true },
    { value: '#fc5454', pastel: true },
    { value: '#FFDAB9', pastel: true },
    { value: '#B8E8FC', pastel: true },
    { value: '#98FB98', pastel: true },
    { value: 'pink', pastel: true },
    { value: '#F0E68C', pastel: true }
  ];
  absoluteState: string;
  
  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit() {
    this.level += 1;
    this.thisEvent = this.parent[this.index];    
  }

  selectColor(color: string){
    this.thisEvent.color = color;
    this.wrapper = 'void';
    this.detailsOpen = false;
    this.pickedColor = !this.pickedColor;
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.WINDOW = window.innerWidth - 287
    }, 50);
    window.addEventListener('resize', this.checkWindow)

    setTimeout(() => {
      if(this.thisEvent.isNew){
        this.absoluteState = 'hidden';
        this.thisEvent.isNew = false;
      } else {
        this.absoluteState = 'open';
        this.thisDiv.nativeElement.style.opacity = 1;
      }
      setTimeout(() => {
        this.absoluteState = 'open'
      }, 0);
    }, 0);
  }

  checkWindow = () => {
    this.WINDOW = window.innerWidth - 287
  }

  openDetails(bool: boolean) {
    this.wrapper = bool ? 'normal' : 'void';
    this.detailsOpen = bool;
  }

  deleteNode(){
    nodes.deleteEvent(this.thisEvent, this.parent, this.index);
    const treeSlice = JSON.parse(JSON.stringify(nodes.childs))
    this.store.dispatch(changeTree({tree: treeSlice}))
  }

  moveEvent() {
    nodes.moveEvent(this.thisEvent, this.parent, this.index);
    const treeSlice = JSON.parse(JSON.stringify(nodes.childs))
    this.store.dispatch(changeTree({tree: treeSlice}))
  }

  resizeEvent(event: boolean) {
    nodes.resizeEvent(event, this.thisEvent, this.parent, this.index)
    const treeSlice = JSON.parse(JSON.stringify(nodes.childs))
    this.store.dispatch(changeTree({tree: treeSlice}))
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
