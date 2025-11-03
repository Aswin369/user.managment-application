import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminUserModel } from '../../../../model/adminUserModel.model';

@Component({
  selector: 'app-user-update',
  imports: [],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {
  @Output() closeEditModal = new EventEmitter<void>();
  @Input() user!:AdminUserModel | null
  @Input()id!:string
close() {
  this.closeEditModal.emit();
}

}
