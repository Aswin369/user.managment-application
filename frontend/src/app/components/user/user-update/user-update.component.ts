import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, skip } from 'rxjs';
import { userModel } from '../../../../model/signup.model';
import { getUser } from '../user.store/user.store.selector';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateUser } from '../user.store/user.store.action';

@Component({
  selector: 'app-user-update',
  imports: [ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  @Output() close = new EventEmitter<void>();
  userData$!: Observable<userModel | null>;
  editFrom!: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userData$ = this.store.select(getUser);

    this.editFrom = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      secondName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.email]]
    });

    // ✅ Patch form once with current data
    this.userData$
      .pipe(take(1))
      .subscribe(user => {
        if (user) this.editFrom.patchValue(user);
      });

    // ✅ Auto-close form when user updates in store
    this.userData$
      .pipe(skip(1), take(1))
      .subscribe(() => this.close.emit());
  }

  onEditSubmit() {
    if (this.editFrom.invalid) {
      this.editFrom.markAllAsTouched();
      return;
    }
    console.log("dfasdf",this.editFrom.value)
    this.store.dispatch(updateUser({ userData: this.editFrom.value }));
  }

  closeForm() {
    this.close.emit();
  }

  @Output() t= new EventEmitter<string>()

  getingData(){
    this.t.emit()
  }

}
