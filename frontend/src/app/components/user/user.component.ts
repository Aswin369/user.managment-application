import { Component } from '@angular/core';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { userModel } from '../../../model/signup.model';
import { getUser } from './user.store/user.store.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';

@Component({
  selector: 'app-user',
  imports: [UserSignupComponent, CommonModule, AsyncPipe, UserProfileComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user$!: Observable<userModel | null>
  constructor(private store: Store) {
    // this.user$ = this.store.select(getUser)
    // console.log("This is userOCmpoera", this.user$)
  }
  
  ngOnInit() {
  this.user$ = this.store.select(getUser);

  this.user$.subscribe(user => {
    console.log('User data from store:', user);
  });
}

}
