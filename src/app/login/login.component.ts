import { Location } from '@angular/common';
import { Component, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './login.service';
import { Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store';
import { AuthState } from '.';
import { welcomeUser } from './login.selectors';
import { welcome } from './login.actions';

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
    this.route.url.subscribe(url => {
      const path = url;
      console.log(path)
      if (url[0].path === 'login') {
        this.registering = false
      } else if (url[0].path === 'register') {
        this.registering = true
      }
    }) 
    
  }

  registering: boolean;
  clicked: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    confirm: new FormControl('')
  });
  loginSubscription: Subscription;
  animatedText: string = '';

  onSubmit(){
    this.clicked = true;
    if(this.registering){
      if(this.form.invalid || this.form.controls.password.value != this.form.controls.confirm.value){
        return
      }
      this.loginSubscription = this.authService.register(this.form.value.email, this.form.value.password)
      .subscribe((response: any) => {
        
      })
    } else {
      this.loginSubscription = this.authService.login(this.form.value.email, this.form.value.password)
      .subscribe((response: any) => {
        
      })
    }
  }

  ngOnInit(): void {
    this.store.pipe(select(welcomeUser)).subscribe((data => {
      if(data == false){
        this.store.dispatch(welcome())
      } else {
        this.animateText('Welcome!', 100);
      }
    }))
  }

  animateText(text: string, delay: number): void {
    let index = 0;
    const intervalId = setInterval(() => {
      this.animatedText += text[index];
      index++;
      if (index === text.length) {
        setTimeout(() => {
          if(text == 'Welcome!'){
            this.animatedText = '';
            this.animateText('Login', 100);
          }
        }, 300);
        clearInterval(intervalId);
      }
    }, delay);
  }

  toggleType() {
   this.registering = !this.registering
   this.clicked = false;
   this.form.reset();

   this.registering ? this.location.go('/register') : this.location.go('/login');
  }

  ngOnDestroy() {
    if(this.loginSubscription){
      this.loginSubscription.unsubscribe();
    }
  }
}
