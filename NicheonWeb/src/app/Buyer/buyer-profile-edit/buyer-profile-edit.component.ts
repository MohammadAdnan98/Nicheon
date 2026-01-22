import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-profile-edit',
  templateUrl: './buyer-profile-edit.component.html',
  styleUrls: ['./buyer-profile-edit.component.css']
})
export class BuyerProfileEditComponent {
// =========================
  // DUMMY PROFILE (PHASE 1)
  // =========================
  profile = {
    fullName: 'Saiyed Mohammad Adnan',
    email: 'adnan@example.com',
    phone: '+91 9876543210',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    pincode: '110025',
    address: 'Fourth Floor, C-325/A, Ajns Apartment, Shaheen Bagh'
  };

  private originalProfile: any;

  ngOnInit(): void {
    // Clone for reset
    this.originalProfile = { ...this.profile };

    // Phase 2 (API Ready)
    // this.loadProfile();
  }

  // =========================
  // SAVE PROFILE
  // =========================
  saveProfile(): void {
    console.log('Profile saved:', this.profile);
    alert('Profile updated successfully');

    // Phase 2:
    // this.profileService.updateProfile(this.profile).subscribe();
  }

  // =========================
  // RESET PROFILE
  // =========================
  resetProfile(): void {
    this.profile = { ...this.originalProfile };
  }

  // =========================
  // PHASE 2 API
  // =========================
  /*
  loadProfile(): void {
    this.profileService.getProfile().subscribe(res => {
      this.profile = res.data;
      this.originalProfile = { ...this.profile };
    });
  }
  */
}
