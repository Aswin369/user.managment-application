import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminUserModel } from '../../../../model/adminUserModel.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-view-page',
  imports: [CommonModule],
  templateUrl: './user-view-page.component.html',
  styleUrl: './user-view-page.component.css'
})
export class UserViewPageComponent {
  @Input() user!: AdminUserModel | null
  @Output() close = new EventEmitter<void>()

  onClose() {
    
    this.close.emit()
  }

}
