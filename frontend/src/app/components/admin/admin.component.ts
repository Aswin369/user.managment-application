import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [AdminHeaderComponent, AdminNavComponent, AdminUserListComponent, AdminUserListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
        
}
