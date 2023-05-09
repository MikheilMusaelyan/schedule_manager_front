import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
  // terms
  selectedTerm: any[] = ['text', ''];
  loading: boolean = false;
  @ViewChild('dateInput') dateInput: any;
  @ViewChild('input') input: any;

  form: FormGroup = new FormGroup({
    start: new FormControl(-1),
    name: new FormControl(''),
    date: new FormControl('')
  });

  ngOnInit(): void {
  }

  selectForm(term: any[]){
    if(this.loading) return
    this.selectedTerm = term;
    this.input.nativeElement.focus()
    setTimeout(() => {
      if(term[1] == 'start' && this.form.value.start == -1){
        this.input.nativeElement.value = 0
      } else {
        this.input.nativeElement.value = this.form.value[this.selectedTerm[1]]
      }
    }, 10);
  }

  onSearchInput(input: any) {
    const value = input.target.value
    if(this.selectedTerm[1] == 'start'){
      if(value > 95){
        this.input.nativeElement.value = Math.min(95, value)
      } else if(value < 0) {
        this.input.nativeElement.value = Math.max(0, value)
      }
      this.form.value.start = value;
      return
    } else if(this.selectedTerm[1] == 'name'){
      if(value.length > 100){
        this.input.nativeElement.value = ''
      } 
      this.form.value.name = value;
      return
    } 
    this.form.value.date = value;
  }

  getType(){
    return this.selectedTerm[0]
  }

  clearTerm(event: any, term: string) {
    event.stopPropagation()
    this.form.value[term] = '';
    this.selectedTerm = ['text', '']
    this.input.nativeElement.value = ''
  }

  onEnterKeyPressed(event: any){
    const newObject = {
      start: Number(this.form.value.start) || -1,
      date: !isNaN(Date.parse(this.form.value.date)) ? this.form.value.date : '-',
      name: this.form.value.name.length > 0 ? this.form.value.name : '-'
    }
    this.form.reset()
    this.loading = true
    this.http.get(`http://127.0.0.1:8000/api/search/` + (newObject?.date?.trim()) + '/' + (newObject?.start) + '/' + (newObject?.name?.trim()) + '/')
    .subscribe((results: any) => {
      this.loading = false
    }, err => {
      this.loading = false
    });
  
  }
}
