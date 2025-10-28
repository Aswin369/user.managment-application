import { Component } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserViewProfleComponent } from './components/user/user-view-profle/user-view-profle.component';
import { HttpClient } from '@angular/common/http';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { Store } from '@ngrx/store';
import { autoLogin } from './components/user/user.store/user.store.action';

interface ReplyResponse {
  reply: string;
}

@Component({
  selector: 'app-root',
  imports: [UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private store: Store) {}
    ngOnInit():void {
      this.store.dispatch(autoLogin())
    }
}
