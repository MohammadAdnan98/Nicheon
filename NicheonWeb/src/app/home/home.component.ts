import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigate(role: string) {
    // Save role in localStorage (used later in registration form)
    localStorage.setItem('selectedRole', role);

    // Navigate to login or registration
    this.router.navigate(['/auth/login'], { queryParams: { role } });
  }
}
