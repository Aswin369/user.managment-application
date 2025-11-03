import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminUserModel } from '../../../../model/adminUserModel.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateUser } from '../admin.store/admin.store.action';

@Component({
  selector: 'app-user-update',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit{
  @Output() closeEditModal = new EventEmitter<void>();
  @Input() user!:AdminUserModel | null
  @Input()id!:string
  editUser!:FormGroup

  constructor(private fb: FormBuilder, private store: Store) {}
  ngOnInit(): void {
    this.editUser = this.fb.group({
      firstName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
      secondName:['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[A-Za-z]+$')]],
      email:["",[Validators.required, Validators.email]]
    })
    this.editUser.patchValue({
      firstName:this.user?.firstName,
      secondName:this.user?.secondName,
      email:this.user?.email
    })
  }



close() {
  this.closeEditModal.emit();
}

onEditUser() {
  if(this.editUser.invalid){
    this.editUser.markAllAsTouched()
    return
  }
  console.log("Updated user",this.editUser.value)
  this.store.dispatch(updateUser({userData:this.editUser.value, userId:this.id}))
}

}
