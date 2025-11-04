import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createUser } from '../admin.store/admin.store.action';
import { Observable } from 'rxjs';
import { selectAdminUserError } from '../admin.store/admin.store.selector';

@Component({
  selector: 'app-create-new-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.css'
})
export class CreateNewUserComponent {
  @Output() cancel = new EventEmitter<void>()
  createUser!:FormGroup
  createUserError!:Observable<string | null>
  constructor(private fb: FormBuilder, private store: Store) {}

  close() {
    this.cancel.emit()
  }

  ngOnInit() {
    this.createUser = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
      secondName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$')]],
      confirmPassword: ['', Validators.required]
    },{validators:[this.passwordIsMatch()]})

    this.createUserError = this.store.select(selectAdminUserError)


    

  }

  passwordIsMatch():ValidatorFn {
    return (group: AbstractControl):ValidationErrors | null =>{
      const password = group.get('password')?.value
      const confirmPassword = group.get('confirmPassword')?.value
      return password === confirmPassword ? null : {passwordMismatch:true}
    }
  }


  get passwordMismatch(): boolean {
    return this.createUser.hasError('passwordMismatch') && this.createUser.get('confirmPassword')?.touched!;
  }

  onCreateUser() {
    if(this.createUser.invalid){
      this.createUser.markAllAsTouched()
      return
    }
    console.log("This create user",this.createUser.value)
    this.store.dispatch(createUser({user:this.createUser.value}))
    this.cancel.emit()
  }

}
