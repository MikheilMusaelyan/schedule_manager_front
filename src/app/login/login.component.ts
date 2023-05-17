import { Location } from '@angular/common';
import { Component, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './login.service';
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store';
import { AuthState } from '.';
import { welcomeUser } from './login.selectors';
import { LoginOpen, welcome } from './login.actions';
import { eventsLoading } from '../event/event.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<AuthState>
  ) { 
    this.store.dispatch(LoginOpen({open: true}))
    this.route.url.subscribe(url => {
      if (url[0].path === 'login') {
        this.registering = false
      } else if (url[0].path === 'register') {
        this.registering = true
      }
    }) 
    
    this.store.pipe(select(welcomeUser)).subscribe((data => {
      if(data == false){
        this.animateText('Welcome!', 100);
      } else {
        this.animatedText = this.registering ? 'Sign Up' : 'Login'
      }
    }))
  }

  registering: boolean;
  clicked: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    confirm: new FormControl('')
  });
  animatedText: string = '';
  interval: any;
  timeout: any

  onSubmit(){
    this.clicked = true;
    if(this.registering){
      if(this.form.invalid || this.form.controls.password.value != this.form.controls.confirm.value){
        return
      }
      this.store.dispatch(eventsLoading({bool: true}))
      this.authService.login(this.form.value.email, this.form.value.password, false)
    } else {
      this.store.dispatch(eventsLoading({bool: true}))
      this.authService.login(this.form.value.email, this.form.value.password, true)
    }
  }

  ngOnInit(): void {
    
  }

  animateText(text: string, delay: number): void {
    let index = 0;
    this.interval = setInterval(() => {
      this.animatedText += text[index];
      index++;
      if (index === text.length) {

        this.timeout = setTimeout(() => {
          if(text == 'Welcome!'){
            this.store.dispatch(welcome())
            this.animatedText = '';
            this.registering ? this.animateText('Sign Up', 100) : this.animateText('Login', 100);
          }
        }, 300);

        clearInterval(this.interval);
      }
    }, delay);
  }

  toggleType() {
   this.registering = !this.registering
   this.clicked = false;
   this.form.reset();

   if(this.timeout){ clearTimeout(this.timeout) } 
   if(this.interval){ clearInterval(this.interval) }
   this.animatedText = this.registering ? 'Sign Up' : 'Login';
   this.registering ? this.location.go('/register') : this.location.go('/login');
  }

  ngOnDestroy() {
    this.store.dispatch(LoginOpen({open: false}))
    if(this.timeout){ clearTimeout(this.timeout) } 
    if(this.interval){ clearInterval(this.interval) }
  }
}
