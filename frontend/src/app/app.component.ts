import { Component } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserViewProfleComponent } from './components/user/user-view-profle/user-view-profle.component';

@Component({
  selector: 'app-root',
  imports: [ UserComponent, UserLoginComponent, UserProfileComponent, UserViewProfleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
