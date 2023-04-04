import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input('event') thisEvent: any
  @Input('divList') divList: any
  @Input('divWidth') width: any

  ngOnInit() {
    this.thisEvent.start = Math.ceil(this.thisEvent.start)
    this.thisEvent.end = Math.ceil(this.thisEvent.end)
  }

  handleDropEvent(event: MouseEvent){

  }
}
