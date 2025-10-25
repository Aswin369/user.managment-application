import { Component } from '@angular/core';
import { UserSignupComponent } from './user-signup/user-signup.component';

@Component({
  selector: 'app-user',
  imports: [UserSignupComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
