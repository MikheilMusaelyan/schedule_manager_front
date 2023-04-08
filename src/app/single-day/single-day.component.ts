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
  @ViewChild('divList', {static: false}) divList: any
  width: any
  left: any
  top: any
  height: any
  nodes: any[]

  myDivList: any;

  rows: any[] = []

  constructor(
    private route: ActivatedRoute,
  ) {
    for (let i = 0; i < 24; i++) {
      const hour = String(i % 12 == 0 ? 12 : i % 12);
      const meridiem = i < 12 ? ' AM' : ' PM'
      for (let j = 0; j < 4; j++) {
        const minute = (j * 15) % 60 == 0 ? '00' : String(j * 15)
        const object = {
          hour: +hour,
          minute: +minute,
          meridiem: meridiem,
          string: hour + meridiem
        } 
        this.rows.push(object)
      }
    }
  }


  ngOnInit() {
    setTimeout(() => {
      this.nodes = nodes.childs;
    }, 0);
  }   
 
  ngAfterViewChecked() {
    
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
    this.main.nativeElement.style.overflow = 'hidden'
    
    setTimeout(() => {
      this.main.nativeElement.style.transition = '500ms cubic-bezier(0.3, .4, 0, 1)';

      this.main.nativeElement.style.width = `100vw`
      this.main.nativeElement.style.height = `100svh`
      this.main.nativeElement.style.transform = `translate(0px, 0px)`;
      setTimeout(() => {
        this.main.nativeElement.style.overflow = 'initial'
        document.body.style.overflow = 'initial'
        this.main.nativeElement.style.transition = 'initial'
        this.main.nativeElement.style.height = '100%'
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