import { Component, OnInit } from '@angular/core';
import { identity, Observable } from 'rxjs';
import { AdminUserModel } from '../../../../model/adminUserModel.model';
import { Store } from '@ngrx/store';
import { blockUser, loadUser } from '../admin.store/admin.store.action';
import { selectAdminUser } from '../admin.store/admin.store.selector';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator'
import { UserViewPageComponent } from '../user-view-page/user-view-page.component';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { PopupBlockUnblockComponent } from '../popup-block-unblock/popup-block-unblock.component';

@Component({
  selector: 'app-admin-user-list',
  imports: [CommonModule,MatPaginatorModule, UserViewPageComponent, UserUpdateComponent, PopupBlockUnblockComponent],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css'
})
export class AdminUserListComponent implements OnInit{
  // users$!:Observable<AdminUserModel[] | null>
  allUsers:AdminUserModel[] = []
  paginatedUsers: AdminUserModel[] = []
  pageSize = 3
  currentPage = 0
  searchEmail:string = ""
  showModal:boolean = false
  selectedUser:AdminUserModel | null = null
  showEditModal:boolean = false
  selectedEditUserId:string = ""
  selectedEditUser:AdminUserModel | null = null
  constructor(private store: Store) {}
  ngOnInit(): void {
    console.log("asdfasdfasdfasdf")
    this.store.dispatch(loadUser())
    this.store.select(selectAdminUser).subscribe(users=>{
      if(users) {
        this.allUsers = users
        this.setPageData()
      }
    })
  }

  setPageData() {
    const start = this.currentPage * this.pageSize
    this.paginatedUsers = this.allUsers.slice(start, start + this.pageSize)
  }

  changePage(event:any){
    this.currentPage = event.pageIndex
    this.setPageData()
  }

  openModal(user:AdminUserModel){
    this.selectedUser = user
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }

  openEditModal(userId:string, user:AdminUserModel) {
  this.showEditModal = true;
  this.selectedEditUser = user
  this.selectedEditUserId = userId
}

closeEditModal() {
  this.showEditModal = false;
}




// Popup Implementaion 
selectedUserId!: string | null
showConfirmPopup = false
isBlocking = false


confirmAction() {
  if(!this.selectedUserId) return
this.store.dispatch(blockUser({userId: this.selectedUserId,isBlocked: this.isBlocking}))
console.log({userId: this.selectedUserId,isBlocked: this.isBlocking})
    this.closePopup()
}

  closePopup() {
    this.showConfirmPopup = false
    this.selectedUserId = null;
  }


  onUnblock(userId:string) {
    this.selectedUserId = userId
    this.isBlocking = false
    this.showConfirmPopup = true
}

onBlock(userId:string) {
  this.selectedUserId = userId
    this.isBlocking = true
    this.showConfirmPopup = true
}

}
