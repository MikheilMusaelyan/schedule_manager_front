import { Component, EventEmitter, Input , Output, ViewChild, ChangeDetectorRef} from '@angular/core';
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

  autoZindex: boolean = true;
  thisEvent: any;
  eventWidth: number;

  constructor(private cdRef: ChangeDetectorRef){}

  ngOnInit() {
    
    this.level += 1
    this.thisEvent = this.parent[this.index];
  }

  ngAfterViewChecked() {
  }

  getWindow(){
    return window.innerWidth
  }

  handleDropEvent(event: any){
    
  }

 

  deleteEvent() {
    if(!this.thisEvent.id){
      return
    }
    let nodeQueue: nodes.Node[] = []
    if(this.thisEvent.children.length > 0){ 
      let childrenCopy = this.thisEvent.children.slice()
      if(this.parent[this.index+1]){   
        this.parent.splice(this.index, 1)
        nodes.putInQueue(childrenCopy, nodeQueue)
        nodeQueue.forEach((e: nodes.Node) => {
          nodes.newNode(this.parent, e)
        })
        return   
      }
      this.parent.splice(this.index, 1, ...childrenCopy)
      return
    }
    this.parent.splice(this.index, 1)
  }

  moveEvent() {
    this.deleteEvent()
    this.thisEvent.children.splice(0)
    nodes.newNode(nodes.childs, this.thisEvent)
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
