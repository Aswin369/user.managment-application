import { Component } from '@angular/core';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userModel } from '../../../model/signup.model';
import { getRole, getUser } from './user.store/user.store.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from '../admin/components/admin-login/admin-login.component';
import { AdminHeaderComponent } from '../admin/admin-header/admin-header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [UserSignupComponent, CommonModule, AsyncPipe, UserProfileComponent, UserLoginComponent, AdminHeaderComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user$!: Observable<userModel | null>
  getRole$!:Observable<string | null>
  constructor(private store: Store) {
  }
  
  ngOnInit() {
  this.user$ = this.store.select(getUser);
  this.getRole$ = this.store.select(getRole)
}

showLogin:boolean = false

onShowSignup() {
    this.showLogin = false;
  }

  onShowLogin() {
    this.showLogin = true;
  }


}
