import { Routes } from '@angular/router';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { AdminUserListComponent } from './components/admin/admin-user-list/admin-user-list.component';

export const routes: Routes = [
  { path: 'signup', component: UserSignupComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'admindashboard', component: AdminComponent },
  { path: 'userlist', component: AdminUserListComponent },
];
