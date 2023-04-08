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
  private initialRelativeTop: any;
  private initialMouseY: any;
  private droppedIn: number = -1;
  private listItems: any[] = []

  private initialObject: any;
  private resizeAt: any;

  private mouseDownTimeOut: any; // hold timeout on mobile, activating touch
  private touchTimeOut: any; // timeout for zIndex animation
  private scrollThreshhold: number;
  private touched: boolean = false;

  @Output() moveNodeEmitter: EventEmitter<nodes.Node> = new EventEmitter();
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();
  @Output() resizeEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private el: ElementRef,
  ) { }
  
  ngAfterViewInit() {

    this.scrollThreshhold =  window.innerHeight / 5; //for autoscroll

    this.resizeDiv.addEventListener('mousedown', (event: any) => {
      this.handleMouseDown(event, true);
    });
    this.resizeDiv.addEventListener('touchstart', (event: any) => {
      this.handleMouseDown(event, true);
    });
  }

  ngOnInit(): void {
    this.initialObject = {start: this.event.start, end: this.event.end}
    this.absoluteDiv = this.el.nativeElement;
    this.listItems = Array.from(this.divList.children) as HTMLDivElement[];
  }

  ngOnDestroy() {
    this.clearTouch()
  }
  

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: any, element?: boolean) {
    event.stopPropagation();
    event.preventDefault();

    const isTouchEvent = event.type.startsWith('touch');
    const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

    this.initialMouseY = clientY;
    this.initialRelativeTop = this.absoluteDiv.getBoundingClientRect().top;
    
    const activateEventListeners = () => {
      if (element) {
        document.addEventListener('mousemove', this.handleResizeMouseMove);
        document.addEventListener('mouseup', this.handleResizeMouseUp);
  
        document.addEventListener('touchmove', this.handleResizeMouseMove);
        document.addEventListener('touchend', this.handleResizeMouseUp);
      } else {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
  
        document.addEventListener('touchmove', this.handleMouseMove);
        document.addEventListener('touchend', this.handleMouseUp);
      }
    };
  
    if (isTouchEvent) {
          if(!this.touched){
            this.mouseDownTimeOut = setTimeout(() => { 
              this.popOut(true)
              navigator.vibrate(4000)
              // activateEventListeners()
              // here if I do touchend and not move a mouse, 
              activateEventListeners()
              document.removeEventListener('touchend', this.clearTouch)
              clearTimeout(this.mouseDownTimeOut)
            }, 300);
            document.addEventListener('touchend', this.clearTouch, { once: true });
          } 
          else {
            clearTimeout(this.mouseDownTimeOut)
            this.mouseDownTimeOut = setTimeout(() => {
              activateEventListeners()
            }, 150);
            document.addEventListener('touchend', this.clearTouch, { once: true })
          }
      return 
    } 

    this.popOut(true)
    activateEventListeners()
  }

  popOut(bool: boolean) { // 
    this.touched = bool;
    this.touched ? this.absoluteDiv.classList.add('touched') : this.absoluteDiv.classList.remove('touched')
    clearTimeout(this.touchTimeOut)
    if(this.touched) {
      this.touchTimeOut = setTimeout(() => { // from touch to touch there has to be 200ms, or anim will fail.
        this.absoluteDiv.style.zIndex = 10000;
      }, 200);
      return
    } 
    this.absoluteDiv.style.zIndex = 'auto';
  }

  clearTouch = () => { 
    clearTimeout(this.mouseDownTimeOut);
    this.removeListeners()
    this.popOut(false)
    this.changeMouseCursor('default');
  };
  
  handleResizeMouseMove = (event: any) => {
    this.autoScroll(event)
    const isTouchEvent = event.type.startsWith('touch');
    const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

    this.listItems.reduce((closest: any, listItem: any, i: number) => {
        const distance = Math.abs(listItem.getBoundingClientRect().top - clientY);
        if (distance < closest.storedDistance) {
          this.resizeAt = Math.max(i, this.event.start + 1)
          return { listItem, storedDistance: distance, index: i };
        }
        return closest;
      },
      { listItem: null, storedDistance: Infinity, index: 0 }
    )

    this.event.end = this.resizeAt
  }

  handleResizeMouseUp = (event: any) => {
    this.resizeEmitter.emit(this.initialObject.end < this.event.end);
    this.initialObject.end = this.event.end;
    
    this.clearTouch()
  }
  
  autoScroll(e: any) {    
    
    const isTouchEvent = e.type.startsWith('touch');
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
    
    const distanceFromBottom = window.innerHeight - clientY;
    const distanceFromTop = clientY;
    
    if (distanceFromBottom <= this.scrollThreshhold) {
      window.scrollBy(0, 30);
    }
    
    if (distanceFromTop <= this.scrollThreshhold) {
      window.scrollBy(0, -30);
    }
  }

  handleMouseMove = (event: any) => {

    this.autoScroll(event)

    const isTouchEvent = event.type.startsWith('touch');
    const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

    const mouseY = clientY;
    const constantDifference = this.initialMouseY - this.initialRelativeTop;
    const newAbsoluteTop = mouseY - constantDifference;
    
    this.listItems.reduce((closest: any, listItem: any, i: number) => {
        const distance = Math.abs((listItem.getBoundingClientRect().top) - newAbsoluteTop);
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
    );
    
    // const snapTop = closestListItem.offsetTop;
    // this.absoluteDiv.style.top = `${snapTop}px`;
  }

  public handleMouseUp = () => {
    if(
      this.initialObject.start != this.event.start && 
      this.initialObject.end != this.event.end
    ) {
      this.initialObject.start = this.event.start;
      this.initialObject.end = this.event.end;
      this.moveNodeEmitter.emit(this.event)
    }
    
    this.clearTouch()
  }

  private changeMouseCursor(cursor: string) {
    document.body.style.cursor = cursor
  }

  removeListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mousemove', this.handleResizeMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mouseup', this.handleResizeMouseUp);

    document.removeEventListener('touchmove', this.handleMouseMove);
    document.removeEventListener('touchmove', this.handleResizeMouseMove);
    document.removeEventListener('touchend', this.handleMouseUp);
    document.removeEventListener('touchend', this.handleResizeMouseUp);
  }
  
}
