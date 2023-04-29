import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) { 
    this.route.url.subscribe(url => {
      if (url[0].path === 'login') {
        this.registering = false
      } else if (url[0].path === 'register') {
        this.registering = true
      }
    }) 
    
  }

  @ViewChild("confirm", {static: false}) confirm: any
  registering: boolean;
  clicked: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  });

  onSubmit(){
    this.clicked = true
  }

  toggleType() {
   this.registering = !this.registering
   this.clicked = false;
   this.form.reset()

   this.registering ? this.location.go('/register') : this.location.go('/login');
  }
}
