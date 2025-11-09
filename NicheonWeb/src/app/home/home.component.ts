import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  features = [
    { icon: 'bi bi-patch-check-fill', label: 'Verified Businesses' },
    { icon: 'bi bi-lightning-charge-fill', label: 'Instant Connections' },
    { icon: 'bi bi-lock-fill', label: 'Secure & Transparent' },
    { icon: 'bi bi-graph-up-arrow', label: 'Grow Your Business' },
  ];

  navigate(role: string) {
    localStorage.setItem('selectedRole', role);
    this.router.navigate(['/auth/login'], { queryParams: { role } });
  }
}
