import { Routes } from '@angular/router';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserViewProfleComponent } from './components/user/user-view-profle/user-view-profle.component';
import { UserComponent } from './components/user/user.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin/components/admin-login/admin-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';

export const routes: Routes = [
{ path: 'signup', component: UserSignupComponent },
{path:'profile', component:UserProfileComponent},
{path:'admindashboard', component:AdminHeaderComponent}

];
