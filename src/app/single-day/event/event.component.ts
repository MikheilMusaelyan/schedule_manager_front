import { Component, Input, ViewChild} from '@angular/core';
import * as nodes from "src/app/nodes";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input('parent') parent: nodes.Node[];
  @Input('index') index: any;
  @Input('divList') divList: any;
  @Input('level') level: number;
  
  @ViewChild('thisDiv', {static: false}) thisDiv: any;

  thisEvent: any;

  ngOnInit() {
    this.level += 1;
    this.thisEvent = this.parent[this.index];
  }

  deleteEvent(){ 
    
  }

  moveEvent() {
    nodes.moveEvent(this.thisEvent, this.parent, this.index)
  }

  resizeEvent(event: boolean) {
    nodes.resizeEvent(event, this.thisEvent, this.parent, this.index)
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
}
