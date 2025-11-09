import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.user = JSON.parse(stored);
    }

    // Fallbacks so UI never looks empty
    this.user.profileImage = this.user.profileImage || 'assets/Image/profile-logo.jpg';
    this.user.businessType = this.user.businessType || 'Not Provided';
    this.user.gstNumber = this.user.gstNumber || 'Not Provided';
    this.user.address = this.user.address || '';
    this.user.landmark = this.user.landmark || '';
    this.user.city = this.user.city || '';
    this.user.state = this.user.state || '';
    this.user.country = this.user.country || '';
    this.user.pincode = this.user.pincode || '';
  }

  goToListings() {
    this.router.navigate(['/seller-listings']);
  }

  goToAddProduct() {
    this.router.navigate(['/seller-add-product']);
  }

  goToOrders() {
    this.router.navigate(['/seller-orders']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  cancelEdit() {
    this.router.navigate(['/seller-dashboard']);
  }
}
