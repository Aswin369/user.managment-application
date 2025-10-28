import { Routes } from '@angular/router';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserViewProfleComponent } from './components/user/user-view-profle/user-view-profle.component';
import { authGuard } from './guards/auth.guard';
import { LoadingpageComponent } from './components/loadingpage/loadingpage.component';

export const routes: Routes = [
    {
        path:"singup",
        component:UserSignupComponent
    },
    {
        path:"profile",
        component:UserViewProfleComponent, 
        canActivate:[authGuard]
    },
    {
        path:"login",
        component:LoadingpageComponent
    }
];
