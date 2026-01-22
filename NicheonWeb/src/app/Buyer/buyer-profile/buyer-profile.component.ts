import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-profile',
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.css']
})
export class BuyerProfileComponent implements OnInit {

  // =========================
  // USER DATA (DUMMY – PHASE 1)
  // =========================
  user = {
    name: 'Saiyed Mohammad Adnan',
    email: 'adnan@example.com',
    phone: '+91 98765 43210',
    address: {
      name: 'Saiyed Mohammad Adnan',
      line1: 'Fourth Floor, C-325/A, Ajns Apartment',
      line2: 'Shaheen Bagh, Jamia Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110025',
      country: 'India'
    }
  };

  // =========================
  // ACCOUNT STATS
  // =========================
  stats = {
    orders: 12,
    wishlist: 6,
    addresses: 2
  };

  ngOnInit(): void {
    // Phase 2 (API)
    // this.loadProfile();
  }

  // =========================
  // API READY (PHASE 2)
  // =========================
  /*
  loadProfile(): void {
    this.profileService.getBuyerProfile().subscribe(res => {
      this.user = res.user;
      this.stats = res.stats;
    });
  }
  */
}
