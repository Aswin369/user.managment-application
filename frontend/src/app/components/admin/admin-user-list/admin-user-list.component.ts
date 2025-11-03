import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUserModel } from '../../../../model/adminUserModel.model';
import { Store } from '@ngrx/store';
import { loadUser } from '../admin.store/admin.store.action';
import { selectAdminUser } from '../admin.store/admin.store.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user-list',
  imports: [CommonModule],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css'
})
export class AdminUserListComponent implements OnInit{
  users$!:Observable<AdminUserModel[] | null>
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadUser())
    this.users$ = this.store.select(selectAdminUser)
  }

}
