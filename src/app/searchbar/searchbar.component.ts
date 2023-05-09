import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  constructor(private http: HttpClient) { }
  search = faSearch
  remove = faXmark
  searchSubject: Subject<any> = new Subject();
  // terms
  selectedTerm: string = '';
  loading: boolean = false;
  @ViewChild('input') input: any;

  form: FormGroup = new FormGroup({
    start: new FormControl(''),
    name: new FormControl(''),
    date: new FormControl('')
  });

  ngOnInit(): void {
   
  }

  selectForm(term: string){
    if(this.loading){
      return
    }
    this.selectedTerm = term.trim();
    this.input.nativeElement.value = `${this.selectedTerm}=${this.form.value[this.selectedTerm] || ''}`
  }

  onSearchInput(text: any): void {
    let value: string = text.target.value.trim()
    if(!value.startsWith(`${this.selectedTerm}=`) || this.loading){
      this.selectedTerm = ''
      return
    }
    const searchString = `${this.selectedTerm.trim()}=`
    const startIndex = value.indexOf(searchString) + searchString.length;
    const extractedString = value.substring(startIndex);
    this.form.value[this.selectedTerm] = extractedString
    console.log(this.form.value)
  }

  clearTerm(term: string){
    this.form.value[term.trim()] = '';
    this.selectedTerm = ''
  }

  onEnterKeyPressed(event: any){
    const newObject = {
      start: Number(this.form.value.start) || -1,
      date: !isNaN(Date.parse(this.form.value.date)) ? new Date(this.form.value.date).toISOString().split('T')[0] : '-',
      name: this.form.value.name || '-'
    }
    if (event.keyCode === 13) {
      this.form.reset()
      this.loading = true
      this.http.get(`http://127.0.0.1:8000/api/search/` + (newObject?.date?.trim()) + '/' + (newObject?.start) + '/' + (newObject?.name?.trim()) + '/')
      .subscribe((results: any) => {
        this.loading = false
        console.log(results)
      }, err => {
        this.loading = false
      });
    }
    
  }
  selectDate() {
    // new Date().toISOString().split('T')[0],
  }
}
