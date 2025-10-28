import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { AsyncPipe, CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loginUser } from '../user.store/user.store.action';
import { Observable } from 'rxjs';
import { getAuthError } from '../user.store/user.store.selector';

@Component({
  selector: 'app-user-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, AsyncPipe],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements AfterViewInit{
  @Output() switchToSignup = new EventEmitter<void>();
  loginForm!:FormGroup
  @ViewChild('emailInput') emailInput!:ElementRef;
  constructor(private fb: FormBuilder, private store: Store) {}
  loginError$!:Observable<string | null>
  ngAfterViewInit(): void {
    this.emailInput.nativeElement.focus()
  }

  ngOnInit():void {
    this.loginForm = this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$')]]
    })
    this.loginError$ = this.store.select(getAuthError)
  }

  goToSignUp() {
    this.switchToSignup.emit();
  }


  onLogin() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      return
    }
    console.log("THisdfasdf", this.loginForm.value)
    this.store.dispatch(loginUser({ userData: this.loginForm.value }));

  }

}
