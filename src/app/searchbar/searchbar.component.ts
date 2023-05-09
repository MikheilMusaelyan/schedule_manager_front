import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSearch, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap, timestamp } from 'rxjs';

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
  selectedTerm: string[] = ['text', ''];
  loading: boolean = false;
  @ViewChild('dateInput') dateInput: any;
  @ViewChild('input') input: any;

  searching: boolean = false

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
        this.input.nativeElement.value = this.convertTime(this.form.value.start, false)
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
      this.form.value.start = this.convertTime(value, true);
      return
    }
    this.form.value[this.selectedTerm[1]] = value;
  }

  getType(){
    return this.selectedTerm[0]
  }

  clearTerm(event: any, term: string) {
    event.stopPropagation()
    this.form.value[term] = '';
    this.selectedTerm = ['text', '']
    this.input.nativeElement.value = null
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
    this.loading = true
    // get
    this.http.get(`http://127.0.0.1:8000/api/search/` + (newObject?.date?.trim()) + '/' + (newObject?.start) + '/' + (newObject?.name?.trim()) + '/')
    .subscribe((results: any) => {
      this.loading = false
      console.log(results)
    }, err => {
      this.loading = false
    });
  }

  convertTime(time_string: string | number, bool: boolean) {
    if(bool){
      time_string = String(time_string)
      const hours = Number(time_string.split(":")[0])
      const minutes = Number(time_string.split(":")[1])
      let total_minutes = (hours * 4) + Math.floor(minutes / 15)
      return total_minutes  
    } 
    time_string = Number(time_string)
    const hours = Math.floor(time_string / 4);
    const minutes = (time_string % 4) * 15;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return formattedTime
  }

  openTerms(bool: boolean){
    this.searching = bool;
    if(!bool){
      this.input.nativeElement.value = null
      this.selectedTerm = ['text', '']
    }
  }
}
