import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/ProfileService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  businessId = 0;
  loading = true;

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {

    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.businessId = parsed?.businessId || parsed?.BusinessId || 0;
    }

    if (this.businessId > 0) {
      this.loadProfile(this.businessId);
    } else {
      this.loadFromLocal();
    }
  }

  private loadFromLocal() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.user = JSON.parse(stored);
    }
    this.applyDefaults();
    this.loading = false;
  }

  // ⭐ APPLY DEFAULT VALUES
  private applyDefaults() {
    this.user.profileImage = this.user.profileImage || 'assets/Image/profile-logo.jpg';
    this.user.businessType = this.user.businessType || 'Not Provided';
    this.user.gstNumber = this.user.gstNumber || 'Not Provided';
    this.user.fullName = this.user.fullName || '';
    this.user.mobile = this.user.mobile || '';
    this.user.email = this.user.email || '';
    this.user.address = this.user.address || '';
    this.user.landmark = this.user.landmark || '';
    this.user.city = this.user.city || '';
    this.user.state = this.user.state || '';
    this.user.country = this.user.country || 'India';
    this.user.pincode = this.user.pincode || '';
  }

  // ⭐ LOAD PROFILE FROM API
  loadProfile(businessId: number) {
    this.profileService.getProfile(businessId).subscribe({
      next: (res: any) => {

        // FIXED: CORRECT PROPERTY MAPPING
        this.user = {
          businessId: res.businessId,
          businessName: res.businessName,
          businessType: res.businessType,
          gstNumber: res.gstNumber,
          fullName: res.fullName,
          mobile: res.contactPhone,
          email: res.businessEmail,
          address: res.address,
          landmark: res.landmark,
          city: res.city,
          state: res.state,
          country: res.country,
          pincode: res.pincode,
          profileImage: 'assets/Image/profile-logo.jpg'
        };

        this.applyDefaults();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile', err);
        this.loadFromLocal();
      }
    });
  }

  // ⭐ NAVIGATIONS
  goToListings() { this.router.navigate(['/seller-listings']); }
  goToAddProduct() { this.router.navigate(['/seller-add-product']); }
  goToOrders() { this.router.navigate(['/seller-orders']); }

  cancelEdit() { this.router.navigate(['/seller-dashboard']); }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
