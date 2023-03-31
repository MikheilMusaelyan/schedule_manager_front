import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.css'],
})
export class SingleDayComponent implements OnInit, AfterViewInit{

  @ViewChild('main', {static: false}) main: any;

  constructor(
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(): void  {
    // const left = this.route.snapshot.queryParamMap.get('left');
    // const top = this.route.snapshot.queryParamMap.get('top');
    // const width = this.route.snapshot.queryParamMap.get('width')
    // const height = this.route.snapshot.queryParamMap.get('height')

    // this.main.nativeElement.style.transform = ` translate(${left}px, ${top}px)`
    // this.main.nativeElement.style.width = `${width}px`
    // this.main.nativeElement.style.height = `${height}px`

    // this.main.nativeElement.style.transition = 'all 400ms cubic-bezier(0.25, 0.04, 0, 0.99)'

    // setTimeout(() => {
    //   this.main.nativeElement.style.transform = ` translate(0px, 0px)`;
    //   this.main.nativeElement.style.width = `100%`
    //   this.main.nativeElement.style.height = `100%`
    // }, 0);
  }
  


}
