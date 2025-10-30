import { Routes } from '@angular/router';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserViewProfleComponent } from './components/user/user-view-profle/user-view-profle.component';
import { authGuard } from './guards/auth.guard';
import { LoadingpageComponent } from './components/loadingpage/loadingpage.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
   {
    path: '',
    component: UserComponent,
    loadChildren: () =>
      import('./components/user/user-routes/user.routes')
        .then(m => m.USER_ROUTES)
  }
];
