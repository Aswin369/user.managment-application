import { Routes } from '@angular/router';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserViewProfleComponent } from './components/user/user-view-profle/user-view-profle.component';

export const routes: Routes = [
    {
        path:"singup",
        component:UserSignupComponent
    },
    {
        path:"profile",
        component:UserViewProfleComponent
    }
];
