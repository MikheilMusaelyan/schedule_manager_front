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
  WINDOW: number;

  ngOnInit() {
    this.WINDOW = window.innerWidth
    window.addEventListener('resize', () => {
      this.WINDOW = window.innerWidth
    })
    this.level += 1
    this.thisEvent = this.parent[this.index];
  }

  deleteEvent(){

  }

  moveEvent() {
    nodes.moveEvent(this.thisEvent, this.parent, this.index)
  }

  resizeEvent(event: any) {
    let queue = []
    if(!event) {
      for(let i = 0; i < this.thisEvent.children.length; i++) {
        if(this.thisEvent.end <= this.thisEvent.children[i].start) {
          const childrenCopy = this.thisEvent.children.splice(i)
          if(this.parent[this.index+1]){
            nodes.putInQueue(childrenCopy, queue)
            queue.forEach((e: nodes.Node) => {
              nodes.newNode(this.parent, e)
            })
            return
          }
          this.parent.push(...childrenCopy)
          return
        } else if(this.thisEvent.end < this.thisEvent.children[i].end){
          console.log('this event is partially covering a child')
          nodes.removeChildren(this.thisEvent.end, this.thisEvent.children[i], queue)
          console.log(queue)
          queue.forEach((e: nodes.Node) => {
            nodes.newNode(this.parent, e)
          })
        }
      }
      return
    };

    for(let i = this.index + 1; i < this.parent.length; i++){
      if(this.thisEvent.end > this.parent[i].start) {
        const newChildren = this.parent.splice(i, 1)
        nodes.putInQueue(newChildren, queue);
        queue.forEach((e: nodes.Node) => {
          nodes.newNode(this.parent, e)
        })
        queue = []
        i--
      } else {
        return
      }
    } 
  }
}
