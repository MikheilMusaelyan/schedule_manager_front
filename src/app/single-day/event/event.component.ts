import { Component, EventEmitter, Input , Output, ViewChild} from '@angular/core';
import * as nodes from "src/app/nodes";
import { print } from '../single-day.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input('parent') parent: nodes.Node[];
  @Input('index') index: any;
  @Input('divList') divList: any
  @Input('divWidth') width: any
  
  @ViewChild('thisDiv', {static: false}) thisDiv: any;

  autoZindex: boolean = true;
  thisEvent: any;

  ngOnInit() {
    this.thisEvent = this.parent[this.index];
  }

  handleDropEvent(event: any){
    
  }
}
