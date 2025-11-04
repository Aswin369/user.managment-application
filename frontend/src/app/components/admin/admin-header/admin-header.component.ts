import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-header',
  imports: [RouterModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {

  constructor(private router: Router, private toast: ToastrService) {}

  onLogout() {
    localStorage.removeItem('token')
    this.toast.success("Logout success")
    this.router.navigateByUrl('/login')
  }
}
