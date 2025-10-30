import { Routes } from "@angular/router";
import { UserSignupComponent } from "../user-signup/user-signup.component";
import { UserViewProfleComponent } from "../user-view-profle/user-view-profle.component";
import { authGuard } from "../../../guards/auth.guard";
import { UserLoginComponent } from "../user-login/user-login.component";

export const USER_ROUTES: Routes = [
   
    {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: UserSignupComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'profile',
    component: UserViewProfleComponent,
    canActivate: [authGuard]
  }
]