import { Component, Input , ChangeDetectorRef} from '@angular/core';
import * as nodes from "src/app/nodes";
import { print } from '../single-day.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input('event') thisEvent: nodes.Node
  @Input('divList') divList: any
  @Input('divWidth') width: any

  ngOnInit() {
  }

  handleDropEvent(event: any){
    const eventLength = this.thisEvent.end - this.thisEvent.start
    this.thisEvent.start = event.dropY;
    this.thisEvent.end = event.dropY + eventLength
    nodes.MoveNode(this.thisEvent)  
  }
}
