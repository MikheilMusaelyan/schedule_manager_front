import { Component, HostListener } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducers';
import { Observable, map} from 'rxjs';
import { selectOpenComponent } from './UI-store/UI.selectors';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { openComponent } from './UI-store/UI.actions';

export function setZIndexToAuto(className: string){
  document.querySelectorAll(`.${className}`).forEach((element: HTMLDivElement) => {
    element.style.zIndex = 'auto'
  })
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fixed', [
      state('void', style({
        'opacity': '0'
      })),
      state('normal', style({
        'opacity': '1'
      })),
      transition('void <=> normal', animate(200))
    ])
  ]
})

export class AppComponent {
  isComponentOpen$: Observable<string> = this.store.pipe(select(selectOpenComponent))
  fixedState$: Observable<string> = this.isComponentOpen$.pipe(
    map(data => data == '' ? 'void': 'normal')
  )

  constructor(
    private store: Store<AppState>
  ){
  }
  
  closeComponent() {
    this.store.dispatch(openComponent({component: ''}))
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.clickedOnAbsoluteDiv(event.target as HTMLElement)) {
     setZIndexToAuto('absolute')
    }
  }

  clickedOnAbsoluteDiv(element: HTMLElement): boolean {
    while (element) {
      if (element.classList.contains('absolute')) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }

  ngAfterViewInit() {
    
  }
 
}

