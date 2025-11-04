import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup-block-unblock',
  imports: [],
  templateUrl: './popup-block-unblock.component.html',
  styleUrl: './popup-block-unblock.component.css'
})
export class PopupBlockUnblockComponent {
  @Input() isBlocking:boolean = false
  @Output() confirm = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
}
