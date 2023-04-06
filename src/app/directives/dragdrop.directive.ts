import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2} from '@angular/core';
import * as nodes from 'src/app/nodes'
import { setZIndexToAuto } from '../app.component';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective{
  @Input('divList') divList: any;
  @Input('event') event: any;
  @Input('resizeDiv') resizeDiv: any;
  @Output() droppedEvent = new EventEmitter<any>();

  private absoluteDiv: any;
  private initialAbsoluteTop: any;
  private initialMouseY: any;
  private droppedIn: number = -1;
  private listItems: any[] = []

  private initialObject: any;
  private resizeAt: any;

  moveNodeEmitter: EventEmitter<any> = new EventEmitter();
  deleteEmitter: EventEmitter<any> = new EventEmitter();
  resizeEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private el: ElementRef,
  ) { }
  
  ngAfterViewInit() {
    this.resizeDiv.addEventListener('mousedown', (event: any) => {
      this.handleMouseDown(event, true);
    });
  }

  ngOnInit(): void {
    this.initialObject = {start: this.event.start, end: this.event.end}
    this.absoluteDiv = this.el.nativeElement;
    this.listItems = Array.from(this.divList.children) as HTMLDivElement[];
  }

  ngOnDestroy() {
    this.removeListeners()
  }


  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: any, element?: boolean) {
    event.preventDefault();
    event.stopPropagation();  

    this.initialMouseY = event.clientY; 
    this.initialAbsoluteTop = this.absoluteDiv.offsetTop;
    
    if(element) {
      document.addEventListener('mousemove', this.handleResizeMouseMove);
      document.addEventListener('mouseup', this.handleResizeMouseUp);
    } else {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
  }

  handleResizeMouseMove = (event: MouseEvent) => {
    this.listItems.reduce((closest: any, listItem: any, i: number) => {
        const distance = Math.abs(listItem.offsetTop - event.clientY);
        if (distance < closest.storedDistance) {
          this.resizeAt = Math.max(this.event.start + 1, i);
          return { listItem, storedDistance: distance, index: i };
        }
        return closest;
      },
      { listItem: null, storedDistance: Infinity, index: 0 }
    )
    
    this.event.end = this.resizeAt
  }

  handleResizeMouseUp = (event: any) => {
    if(
      this.initialObject.end < this.event.end
    ) {
      this.initialObject.end = this.event.end;
      nodes.resizeNode(this.event.id, nodes.childs, true)
    } else {
      nodes.resizeNode(this.event.id, nodes.childs, false)
    }
    
    this.removeListeners()
    this.changeMouseCursor('default');
  }
  

  handleMouseMove = (event: MouseEvent) => {
    const mouseY = event.clientY;
    const constantDifference = this.initialMouseY - this.initialAbsoluteTop;
    const newAbsoluteTop = mouseY - constantDifference;
    
    const closestListItem = this.listItems.reduce((closest: any, listItem: any, i: number) => {
        const distance = Math.abs(listItem.offsetTop - newAbsoluteTop);
        if (distance < closest.storedDistance) {
          this.droppedIn = i;

          const eventLength = this.event.end - this.event.start
          this.event.start = this.droppedIn;
          this.event.end = this.droppedIn + eventLength

          return { listItem, storedDistance: distance, index: i };
        }
        return closest;
      },
      { listItem: null, storedDistance: Infinity, index: 0 }
    ).listItem;
    
    const snapTop = closestListItem.offsetTop;
    this.absoluteDiv.style.top = `${snapTop}px`;
  }

  public handleMouseUp = () => {
    if(
      this.initialObject.start != this.event.start && 
      this.initialObject.end != this.event.end
    ) {
      this.initialObject.start = this.event.start;
      this.initialObject.end = this.event.end;
      nodes.MoveNode(this.event)
    }
    
    this.removeListeners()
    this.changeMouseCursor('default');
  }

  private changeMouseCursor(cursor: string) {
    document.body.style.cursor = cursor
  }

  removeListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mousemove', this.handleResizeMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mouseup', this.handleResizeMouseUp);
  }
  
}
