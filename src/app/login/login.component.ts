import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  signInForm: FormGroup;
  signUpForm: FormGroup;
  isLoading=false;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService:AuthService) {
    this.signInForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.signUpForm = formBuilder.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    });
  }

  signIn() {
    if(this.signInForm.valid){
      this.isLoading=true;
      let form = this.signInForm.value;
      this.authService.login(form.email,form.password, (res: any)=>{
        if(!res) {
          this.isLoading = false;
        }
      })
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      let data = this.signUpForm.value
      this.authService.signUp(data.userName, data.email, data.password, (res: any) => {
        if (!res) {
          this.isLoading = false;
        }
      });
    }
  }

  cleanForm(formGroup:FormGroup) {
    Object.keys(formGroup.controls).forEach((key)=>formGroup.get(key)?.setValue(formGroup.get(key)?.value.trim()));
  }

  ngOnInit(): void {
  }

}
