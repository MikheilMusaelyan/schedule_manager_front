import { Directive, ElementRef, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import * as nodes from 'src/app/shared/nodes'

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective{
  @Input('divList') divList: any;
  @Input('event') event: any;
  @Input('resizeDiv') resizeDiv: any;
  @Input('editIcon') editIcon: any;
    
  counter: number = 0

  @Input() set pickedColor(value: any) {
    this.counter++
    if(this.counter > 1) {
      this.clearTouch()
    }
  }

  private absoluteDiv: any;
  private initialRelativeTop: any;
  private initialMouseY: any;
  private droppedIn: number = -1;
  private listItems: any[] = []

  private initialObject: any;
  private resizeAt: any;

  private poputTimeOut: any
  private mouseDownTimeOut: any; // hold timeout on mobile, activating touch
  private touchTimeOut: any; // timeout for zIndex animation
  private scrollThreshhold: number;
  private opened: boolean = false;

  @Output() moveNodeEmitter: EventEmitter<nodes.Node> = new EventEmitter();
  @Output() resizeEmitter: EventEmitter<boolean> = new EventEmitter();
  @Output() openDetailsWindow: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private el: ElementRef,
  ) {}
  
  ngAfterViewInit() {
    this.scrollThreshhold =  window.innerHeight / 4; //for autoscroll
    this.resizeDiv.addEventListener('mousedown', this.handleResizeTouchStart)
    this.resizeDiv.addEventListener('touchstart', this.handleResizeTouchStart, {passive: true})
    this.absoluteDiv.addEventListener('mousedown', this.handleTouchStart)
    this.absoluteDiv.addEventListener('touchstart', this.handleTouchStart, {passive: true})
  }

  ngOnInit(): void {
    this.initialObject = {start: this.event.start, end: this.event.end}
    this.absoluteDiv = this.el.nativeElement;
    this.listItems = Array.from(this.divList.children) as HTMLDivElement[];
  }

  ngOnDestroy() {
    this.clearTouch()
  }
  
  handleTouchStart = (event: any) => {
    if(this.event.state == 'loading'){
      return
    }
    // if(this.opened) {
    //   this.store.dispatch(openAbsolute({bool: false}))
    // } else {
    //   if(this.isAbsoluteOpen){
    //     return
    //   }
    // }
    this.openDetailsWindow.emit(false)    
    this.handleMouseDown(event)
    this.counter++
  }

  handleResizeTouchStart = (event: any) => {
    if(this.event.state == 'loading'){
      return
    }
    // if(this.opened) {
    //   console.log('dispatch')
    //   this.store.dispatch(openAbsolute({bool: false}))
    // } else {
    //   if(this.isAbsoluteOpen){
    //     return
    //   }
    // }
    this.openDetailsWindow.emit(false)    
    this.handleMouseDown(event, true);
  }
  
  handleMouseDown(event: any, element?: boolean) {
    event.stopPropagation();
    event.preventDefault();

    let startTime = new Date().getTime();
    let endTime = 0;

    const isTouchEvent = event.type.startsWith('touch');
    const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;
    this.initialMouseY = clientY;
    this.initialRelativeTop = this.absoluteDiv.getBoundingClientRect().top;

    const timeout = 200;
    const mouseEndName = isTouchEvent ? 'touchend' : 'mouseup';

    //(1) on web, we have to hold down for minimum of 200 ms to move an event
    document.addEventListener(mouseEndName, this.clearTouch, { once: true }); //(1)
      
    this.mouseDownTimeOut = setTimeout(() => {
      this.popOut(true)
      // activate listeners
      element ? this.activateResizeListeners() : this.activateListeners();
      document.removeEventListener(mouseEndName, this.clearTouch); //(1)
      clearTimeout(this.mouseDownTimeOut)
    }, timeout);

    //color pallete popout
    if(!isTouchEvent){
      //if we held down for more than 400ms, it doesn't work
      document.addEventListener('mouseup', () => {
        endTime = new Date().getTime();
        if (endTime - startTime < 400 && this.counter % 2 == 0 && this.initialObject.end == this.event.end && this.initialObject.start == this.event.start) {
          this.openDetailsWindow.emit(true);
          this.popOut(true)
          this.removeResizeListeners()
          this.removeListeners()
        }
      }, {once: true});

    } else {
      document.addEventListener('touchend', () => clearTimeout(this.poputTimeOut), {once: true});

      this.poputTimeOut = setTimeout(() => {
        document.removeEventListener('touchend', () => clearTimeout(this.poputTimeOut));
        if(this.initialObject.end == this.event.end && this.initialObject.start == this.event.start){
          this.removeListeners()
          this.removeResizeListeners()
          clearTimeout(this.poputTimeOut)
          // this.store.dispatch(openAbsolute({bool: true}))
          this.openDetailsWindow.emit(true)
        }
      }, 600);
    };
  }

  popOut(bool: boolean) {
    this.opened = bool;
    this.opened ? this.absoluteDiv.classList.add('touched') : this.absoluteDiv.classList.remove('touched')
    clearTimeout(this.touchTimeOut)
    if(this.opened) {
      this.touchTimeOut = setTimeout(() => { // from touch to touch there has to be 200ms, or anim will fail.
        this.absoluteDiv.style.zIndex = 10000;
      }, 200);
      return
    } 
    this.absoluteDiv.style.zIndex = 'auto';
  }

  clearTouch = () => { // when we move something and we wanna finish it
    clearTimeout(this.mouseDownTimeOut);
    this.removeResizeListeners()
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
    if(this.initialObject.end != this.event.end) {
      this.resizeEmitter.emit(this.initialObject.end < this.event.end);
      this.initialObject.end = this.event.end;
    }
    this.clearTouch()
  }
  
  autoScroll(e: any) {    
    const isTouchEvent = e.type.startsWith('touch');
    const clientY = isTouchEvent ? e.touches[0].clientY : e.clientY;
    
    const distanceFromBottom = window.innerHeight - clientY;
    const distanceFromTop = clientY;
    
    if (distanceFromBottom <= this.scrollThreshhold) {
      window.scrollBy(0, 25);
    }
    
    if (distanceFromTop <= this.scrollThreshhold) {
      window.scrollBy(0, -25);
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
          this.droppedIn = Math.min(96, i);

          const eventLength = Math.max(this.event.end - this.event.start, 1);
          
          if (this.droppedIn + eventLength > 96) {
            this.event.start = 96 - eventLength;
          } else {
            this.event.start = this.droppedIn;
          }
          
          this.event.end = this.event.start + eventLength;

          return { listItem, storedDistance: distance, index: i };
        }
        return closest;
      },
      { listItem: null, storedDistance: Infinity, index: 0 }
    );
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

  activateListeners = () => {
    document.addEventListener('touchmove', this.handleMouseMove);
    document.addEventListener('mousemove', this.handleMouseMove);

    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchend', this.handleMouseUp);
  }

  removeListeners = () => {
    document.removeEventListener('touchend', this.handleMouseUp);
    document.removeEventListener('mouseup', this.handleMouseUp);
    // mousemove
    document.removeEventListener('touchmove', this.handleMouseMove);
    document.removeEventListener('mousemove', this.handleMouseMove);
  };
  

  activateResizeListeners = () => {
    document.addEventListener('touchmove', this.handleResizeMouseMove);
    document.addEventListener('mousemove', this.handleResizeMouseMove);
    //activate mouseup
    document.addEventListener('mouseup', this.handleResizeMouseUp);
    document.addEventListener('touchend', this.handleResizeMouseUp);
  }
  
  removeResizeListeners = () => {
    document.removeEventListener('touchmove', this.handleResizeMouseMove);
    document.removeEventListener('mousemove', this.handleResizeMouseMove);
    // remove mouseup
    document.removeEventListener('mouseup', this.handleResizeMouseUp);
    document.removeEventListener('touchend', this.handleResizeMouseUp);
  };
  
 
}
