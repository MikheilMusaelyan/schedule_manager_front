import { Pipe, PipeTransform, ElementRef } from '@angular/core';

@Pipe({
  name: 'wordCut'
})
export class WordPipe implements PipeTransform {
  transform(elRef: string) {
    let wordLimit = 10
    if (elRef.length > wordLimit) {
      elRef = elRef.substring(0, wordLimit) + '...';
    }
    return elRef;
  }
}