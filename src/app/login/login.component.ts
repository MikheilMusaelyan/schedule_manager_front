import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registering: boolean = false;
  clicked: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  onSubmit(){
    if(this.form.invalid){
      return
    }
    this.clicked = true
  }

  toggleType() {
   this.registering = !this.registering
   this.clicked = false;
   this.form.reset()
  }
}
