import { Component } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { Store } from '@ngrx/store';
import { autoLogin } from './components/user/user.store/user.store.action';
import { AdminComponent } from './components/admin/admin.component';


interface ReplyResponse {
  reply: string;
}

@Component({
  selector: 'app-root',
  imports: [UserComponent, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private store: Store) {}
    ngOnInit():void {
      this.store.dispatch(autoLogin())
    }
}
