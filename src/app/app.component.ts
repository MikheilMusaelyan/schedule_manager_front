import { Component, HostListener } from '@angular/core';

export function setZIndexToAuto(className: string){
  document.querySelectorAll(`.${className}`).forEach((element: HTMLDivElement) => {
    element.style.zIndex = 'auto'
  })
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
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

  ngOnInit() {
    
  }
}

