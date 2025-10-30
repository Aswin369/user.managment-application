import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';

@Component({
  selector: 'app-admin',
  imports: [AdminHeaderComponent, AdminNavComponent, AdminDashboardComponent, AdminUserListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
