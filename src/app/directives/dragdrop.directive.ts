import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDragdrop]'
})
export class DragdropDirective{
  @Input('divList') divList: any;
  // @Input('firstYIndex') firstYIndex: any
  @Output() droppedEvent = new EventEmitter<any>();

  private absoluteDiv: any;
  private initialAbsoluteTop: any;
  private initialMouseY: any;
  private myParent: any;  
  private droppedIn: number = -1;
  private listItems: any[] = []

  constructor(
    private el: ElementRef,
  ) { }

  resize() {

  }

  handleResizeMouseDown = (event: any) => {
    event.preventDefault();
    
    this.initialMouseY = event.clientY; 
    this.initialAbsoluteTop = this.absoluteDiv.offsetTop;
    
  }

  handleResizeMouseMove = (event: any) => {
    
  }

  handleResizeMouseUp = (event: any) => {

  }
  
  ngAfterViewInit() {
    // this.resizable.addEventListener('mousedown', (event: any) => {
    //   this.handleMouseDown(event, this.resizable);
    // });
  }

  ngOnInit(): void {
    this.absoluteDiv = this.el.nativeElement;
    this.myParent = this.absoluteDiv.parentElement
    this.listItems = Array.from(this.divList.children) as HTMLDivElement[];
  }

  ngOnDestroy() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
  

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event: any, element?: any) {
    event.preventDefault();
    event.stopPropagation()

    this.initialMouseY = event.clientY; 
    this.initialAbsoluteTop = this.absoluteDiv.offsetTop;
    if(element) {
      document.addEventListener('mousemove', this.handleResizeMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    } else {
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    }
    
  }
  

  handleMouseMove = (event: MouseEvent) => {
    const mouseY = event.clientY;
    const constantDifference = this.initialMouseY - this.initialAbsoluteTop;
    const newAbsoluteTop = mouseY - constantDifference;
    
    const closestListItem = this.listItems.reduce((closest: any, listItem: any, i: number) => {
        const distance = Math.abs(listItem.offsetTop - newAbsoluteTop);
        if (distance < closest.storedDistance) {
          this.droppedIn = i;
          // this.droppedEvent.emit({dropY: this.droppedIn, dropped: false})
          return { listItem, storedDistance: distance, index: i };
        }
        return closest;
      },
      { listItem: null, storedDistance: Infinity, index: 0 }
    ).listItem;
    
    const snapTop = closestListItem.offsetTop;
    this.absoluteDiv.style.top = `${snapTop}px`;
  }

  public handleMouseUp = (event: MouseEvent) => {
    // console.log(event)
    this.droppedEvent.emit({dropY: this.droppedIn, dropped: true})
    // this.firstYIndex = this.droppedIn
    // if(this.firstYIndex != this.droppedIn){
      
    // }
    
    
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  private changeMouseCursor(cursor: string) {
    document.body.style.cursor = cursor
  }
}
