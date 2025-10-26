import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {AbstractControl, Form, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms'
import { userModel } from '../../../../model/signup.model';
import { Store } from '@ngrx/store';
import { signup } from '../user.store/user.store.action';

@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.css'
})
export class UserSignupComponent {

  signupForm!:FormGroup

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit():void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
      secondName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$')]],
      confirmPassword: ['', Validators.required]
    },{validators:[this.passwordIsMatch()]})
  }

  passwordIsMatch():ValidatorFn {
    return (group: AbstractControl):ValidationErrors | null =>{
      const password = group.get('password')?.value
      const confirmPassword = group.get('confirmPassword')?.value
      return password === confirmPassword ? null : {passwordMismatch:true}
    }
  }


  get passwordMismatch(): boolean {
    return this.signupForm.hasError('passwordMismatch') && this.signupForm.get('confirmPassword')?.touched!;
  }


  signUpForm() {
    if(this.signupForm.invalid){
      this.signupForm.markAllAsTouched()
      return
    }
    const signupData:userModel = this.signupForm.value
    console.log("asdf",signupData)
    this.store.dispatch(signup({signupData}))
  }
}
