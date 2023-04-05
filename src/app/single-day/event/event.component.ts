import { Component, Input } from '@angular/core';
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
    this.thisEvent.start = Math.ceil(this.thisEvent.start)
    this.thisEvent.end = Math.ceil(this.thisEvent.end)
  }

  handleDropEvent(event: any){
    console.log(event, nodes.childs, this.thisEvent.id)
    const eventLength = this.thisEvent.end - this.thisEvent.start
    this.thisEvent.start = event.dropY;
    this.thisEvent.end = event.dropY + eventLength
    if(event.dropped == true) {
      nodes.MoveNode(this.thisEvent)
      print(nodes.childs, 0)
    }
  }
}
