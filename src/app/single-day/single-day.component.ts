import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import * as nodes from '../nodes'

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css'],
})
export class SingleDayComponent implements OnInit, AfterViewInit{
  @ViewChild('main', {static: false}) main: any;
  width: any
  left: any
  top: any
  height: any
  nodes = nodes.childs;

  rows: any[] = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,]

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.print(this.nodes, 0)
    let node = { start: 12, end: 14, children:[] }
    nodes.newNode(nodes.childs, node)
    this.print(this.nodes, 0)
  }

  print(events: any, depth: number): void {
    for (let child of events) {
      console.log(`${"   ".repeat(depth)}[${child.start}, ${child.end}]`);
      this.print(child.children, depth+1);
    }
    
  }

  ngAfterViewInit(): void  {
    const left = Number(this.route.snapshot.queryParamMap.get('left'))
    const top = Number(this.route.snapshot.queryParamMap.get('top'))
    const width = Number(this.route.snapshot.queryParamMap.get('width'))
    const height = Number(this.route.snapshot.queryParamMap.get('height'))

    this.top = top
    this.left = left
    this.width = width
    this.height = height

    document.body.style.overflow = 'hidden'

    this.main.nativeElement.style.transform = `translate(${left}px, ${top}px)`
    this.main.nativeElement.style.width = `${width}px`
    this.main.nativeElement.style.height = `${height}px`

    this.main.nativeElement.style.transition = 'all 400ms cubic-bezier(0.25, 0.04, 0, 0.99)'

    setTimeout(() => {
      this.main.nativeElement.style.width = `100vw`
      this.main.nativeElement.style.height = `100svh`
      this.main.nativeElement.style.transform = `translate(0px, 0px)`;
      setTimeout(() => {
        document.body.style.overflow = 'auto'
        this.main.nativeElement.style.transition = ''
      }, 400);
    }, 0);
  }

  closeDay(){
    // this.main.nativeElement.style.transition = 'all 400ms cubic-bezier(0.25, 0.04, 0, 0.99)'
    // setTimeout(() => {
    // this.main.nativeElement.style.width = `0px`
    // this.main.nativeElement.style.height = `0px`
    
    // this.main.nativeElement.style.transform = `translate(${this.left}px, ${this.top}px)`
    // }, 250);
  }

  ngOnDestroy() {
    
  }
  


}
