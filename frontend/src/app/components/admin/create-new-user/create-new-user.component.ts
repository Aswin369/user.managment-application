import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.css'
})
export class CreateNewUserComponent {
  @Output() cancel = new EventEmitter<void>()
  createUser!:FormGroup

  constructor(private fb: FormBuilder) {}

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

  }

}
