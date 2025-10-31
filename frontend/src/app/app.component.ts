import { Component } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { Store } from '@ngrx/store';
import { autoLogin } from './components/user/user.store/user.store.action';

@Component({
  selector: 'app-root',
  imports: [UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title=''
    constructor(private store: Store) {}
    ngOnInit():void {
      this.store.dispatch(autoLogin())
    }
}
