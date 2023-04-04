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

  rows: any[] = [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,5,6,7,8,]

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.print(this.nodes, 0)
    // let node = { start: 16, end: 34, children:[] }
    nodes.newNode(nodes.childs, { start: 0, end: 140, children: []}) 
    nodes.newNode(nodes.childs, { start: 2, end: 6, children: []}) 
    nodes.newNode(nodes.childs, { start: 3, end: 7, children: []}) 
    nodes.newNode(nodes.childs, { start: 5, end: 10, children: []}) 
    nodes.newNode(nodes.childs, { start: 8, end: 10, children: []}) 
    // nodes.newNode(nodes.childs, { start: 5, end: 6.8, children: []}) 
    // nodes.newNode(nodes.childs, { start: 3, end: 15, children: []})
    // nodes.newNode(nodes.childs, { start: 9, end: 10, children: []})
    // nodes.newNode(nodes.childs, { start: 11, end: 18, children: [] })
    // nodes.newNode(nodes.childs, { start: 6, end: 19, children: []})
    // nodes.newNode(nodes.childs, { start: 9, end: 12, children: []})
    // nodes.newNode(nodes.childs, { start: 1, end: 3, children: []}) 
    // nodes.newNode(nodes.childs, { start: 26, end: 27, children: []}) 
    // nodes.newNode(nodes.childs, { start: 8.5, end: 9.2, children: []}) 
    // nodes.newNode(nodes.childs, { start: 1, end: 5, children: []})
    // nodes.newNode(nodes.childs, { start: 0.9, end: 1.1, children: []})
    // nodes.newNode(nodes.childs, { start: 0.5, end: 140, children: []})
    // nodes.newNode(nodes.childs, { start: 20, end: 50, children: []})
    // nodes.newNode(nodes.childs, { start: 30, end: 70, children: []})
    // nodes.newNode(nodes.childs, { start: 40, end: 41, children: []})
    // nodes.newNode(nodes.childs, { start: 32, end: 35, children: []})
    // nodes.newNode(nodes.childs, { start: 36, end: 37, children: []})
    // nodes.newNode(nodes.childs, { start: 40, end: 41, children: []})
    // nodes.newNode(nodes.childs, { start: 267, end: 280, children: []})
    // nodes.newNode(nodes.childs, { start: 42, end: 43, children: []})
    // nodes.newNode(nodes.childs, { start: 42, end: 48, children: []})
    // nodes.newNode(nodes.childs, { start: 52, end: 53, children: []})
    // nodes.newNode(nodes.childs, { start: 31, end: 44, children: []})
    // nodes.newNode(nodes.childs, { start: 42, end: 43, children: []})
    // nodes.newNode(nodes.childs, { start: 38, end: 39, children: []})
    // nodes.newNode(nodes.childs, { start: 205, end: 267, children: []})
    // nodes.newNode(nodes.childs, { start: 10, end: 20, children: []})
    // nodes.newNode(nodes.childs, { start: 15, end: 25, children: []})
    // nodes.newNode(nodes.childs, { start: 20, end: 30, children: []})
    // nodes.newNode(nodes.childs, { start: 25, end: 35, children: []})
    // nodes.newNode(nodes.childs, { start: 30, end: 40, children: []})
    // nodes.newNode(nodes.childs, { start: 35, end: 45, children: []})
    // nodes.newNode(nodes.childs, { start: 200, end: 267, children: []})
    // nodes.newNode(nodes.childs, { start: 40, end: 50, children: []})
    // nodes.newNode(nodes.childs, { start: 45, end: 55, children: []})
    // nodes.newNode(nodes.childs, { start: 55, end: 65, children: []})
    // nodes.newNode(nodes.childs, { start: 60, end: 70, children: []})
    // nodes.newNode(nodes.childs, { start: 65, end: 75, children: []})
    // nodes.newNode(nodes.childs, { start: 70, end: 80, children: []})
    // nodes.newNode(nodes.childs, { start: 75, end: 85, children: []})
    // nodes.newNode(nodes.childs, { start: 180, end: 203, children: []})
    // nodes.newNode(nodes.childs, { start: 80, end: 90, children: []})
    // nodes.newNode(nodes.childs, { start: 85, end: 95, children: []})
    // nodes.newNode(nodes.childs, { start: 20, end: 50, children: []})
    // nodes.newNode(nodes.childs, { start: 275, end: 290, children: []})
    // nodes.newNode(nodes.childs, { start: 30, end: 70, children: []})
    // nodes.newNode(nodes.childs, { start: 32, end: 35, children: []})
    // nodes.newNode(nodes.childs, { start: 36, end: 37, children: []})
    // nodes.newNode(nodes.childs, { start: 42, end: 48, children: []})
    // nodes.newNode(nodes.childs, { start: 50, end: 60, children: []})
    // nodes.newNode(nodes.childs, { start: 52, end: 53, children: []})
    // nodes.newNode(nodes.childs, { start: 31, end: 44, children: []})
    // nodes.newNode(nodes.childs, { start: 38, end: 39, children: []})
    // nodes.newNode(nodes.childs, { start: 42, end: 43, children: []})
    // nodes.newNode(nodes.childs, { start: 86, end: 230, children: []})
    // nodes.newNode(nodes.childs, { start: 42, end: 43, children: []})
    // nodes.newNode(nodes.childs, { start: 41, end: 49, children: []})
    // nodes.newNode(nodes.childs, { start: 5, end: 5.5, children: []})
    // nodes.newNode(nodes.childs, { start: 4, end: 4.5, children: []})
    // nodes.newNode(nodes.childs, { start: 1, end: 8, children: []})
    // nodes.newNode(nodes.childs, { start: 3, end: 7, children: []})
    // nodes.newNode(nodes.childs, { start: 2, end: 4, children: []})
    // nodes.newNode(nodes.childs, { start: 43, end: 44, children: [] })
    // nodes.newNode(nodes.childs, { start: 3, end: 67, children: []})
    // nodes.newNode(nodes.childs, { start: 208, end: 265, children: []})
    // nodes.newNode(nodes.childs, { start: 270, end: 276, children: []})
    // nodes.newNode(nodes.childs, { start: 1.5, end: 3, children: [] })
    // nodes.newNode(nodes.childs, { start: 40, end: 70, children: [] })
    console.log(this.nodes)
    nodes.deleteNode(6, nodes.childs)
    this.print(this.nodes, 0)
  }

  
  

  counter = 0
  
  print(events: any, depth: number): void {
    for (let child of events) {
      console.log(++this.counter)
      console.log(`${"      ".repeat(depth)}[${child.start}, ${child.end}, ${child?.id}]`);
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
