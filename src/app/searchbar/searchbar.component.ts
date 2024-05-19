import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap, timestamp } from 'rxjs';
import { EventState } from '../event/reducers';
import { CalendarState } from '../calendar/reducers/calendar.reducer';
import { selectDate } from '../calendar/calendar.actions';
import { Router } from '@angular/router';
import { convertTime } from '../shared/shared';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  constructor(
    private http: HttpClient,
    private store: Store<CalendarState>,
    private router: Router
  ) { }

  search = faSearch
  remove = faXmark
  closeIcon = faXmark
  // terms
  selectedTerm: string[] = ['text', ''];
  loading: boolean = false;
  @ViewChild('dateInput') dateInput: any;
  @ViewChild('input') input: any;

  searching: boolean = false;
  searchResults: any[] = []

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
      if(term[1] == 'start'){
        if(this.form.value.start == null || Number(this.form.value.start) <= -1){
          this.input.nativeElement.value = null
          return
        }
        this.input.nativeElement.value = convertTime(this.form.value.start, false)
      } else {
        this.input.nativeElement.value = this.form.value[this.selectedTerm[1]]
      }
    }, 10);
  }

  onSearchInput(input: any) {
    const value = input.target.value
    if(this.selectedTerm[1] == 'name'){
      this.input.nativeElement.value = value.substring(0, 100)      
    } else if(this.selectedTerm[1] == 'start') {
      this.form.value.start = convertTime(value, true);
      return
    }
    this.form.value[this.selectedTerm[1]] = value;
  }

  getType(){
    return this.selectedTerm[0]
  }

  clearTerm(event: any, term: string) {
    event.stopPropagation()
    this.form.value[term] = null;
    this.selectedTerm = ['text', '']
    this.input.nativeElement.value = null;
  }

  onEnterKeyPressed(event: any){
    // validate
    if (
      (this.form.value.name == '' || this.form.value.name == null) && 
      (this.form.value.start == -1 || this.form.value.start == null) && 
      (this.form.value.date == '' || this.form.value.date == null)){
      return
    }
    this.openTerms(false)
    // constuct an object
    const newObject = {
      start: Number(this.form.value.start) || -1,
      date: !isNaN(Date.parse(this.form.value.date)) ? this.form.value.date : '-',
      name: this.form.value.name?.length > 0 ? this.form.value.name : '-'
    }
    if(Number(this.form.value.start) == 0){
      newObject.start = 0
    }
    this.loading = true
    // get
    this.http.get(`https://drf.up.railway.app/api/search/` + (newObject?.date?.trim()) + '/' + (newObject?.start) + '/' + (newObject?.name?.trim()) + '/')
    .subscribe((results: any) => {
      this.loading = false;
      this.searchResults = results;
    }, err => {
      this.loading = false
      this.searchResults = [];
    });
  }

  

  openTerms(bool: boolean){
    if(this.loading) return
    this.searching = bool;
    if(!bool){
      this.searchResults = []
      this.input.nativeElement.value = null
      this.selectedTerm = ['text', '']
    }
  }
  
  goToSingleDay(date: string){
    const day = new Date(date).getDate()
    const newDate = new Date(date)
    newDate.setDate(day + 1)
    this.store.dispatch(selectDate({date: newDate}))
    this.router.navigate(['singleday'])
    this.searchResults = []
  }

  closeResults(){
    this.searchResults = []
  }

  getConverted(time: string | number, bool: boolean){
    return convertTime(time, bool)
  }

  getDate(date: string){
    const day = new Date(date).getDate()
    const newDate = new Date(date)
    newDate.setDate(day + 1)
    const formattedDate = newDate.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate;
  }
}
