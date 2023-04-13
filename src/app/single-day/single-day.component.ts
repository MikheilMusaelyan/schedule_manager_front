import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as nodes from '../nodes'
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';
import { detectChange } from './event.selectors';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css'],
})
export class SingleDayComponent implements OnInit, AfterViewInit{
  @ViewChild('main', {static: false}) main: any;
  @ViewChild('divList', {static: false}) divList: any

  nodes: any[];
  myDivList: any;
  rows: any[] = [];
  detectEventChanges$: Observable<boolean>;
  mainScrollWidth: number;

  constructor(
    private store: Store<AppState>
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
    this.rows.push({})
  }

  ngOnInit() {
    setTimeout(() => {
      this.nodes = nodes.childs;
    }, 0);
  }   
  
  ngAfterViewInit(): void  {
    window.addEventListener('resize', () => {
      this.changeWidthValue()
    })
    setTimeout(() => {
      this.mainScrollWidth = this.main.nativeElement.scrollWidth;

      this.store.pipe(
        select(detectChange)
      )
      .subscribe((bool: boolean) => {
       this.changeWidthValue()
      })
    }, 0);
  }

  changeWidthValue() {
    this.mainScrollWidth = 100;
    setTimeout(() => {
      this.mainScrollWidth = this.main.nativeElement.scrollWidth
    }, 0);
  }

  ngAfterViewChecked() {
    
  }

  closeDay(){
  }

  ngOnDestroy() {
    
  }

}