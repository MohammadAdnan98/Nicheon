import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    fullName: 'Adnan Khan',
    businessName: 'Star Jewels',
    role: 'seller', // 'buyer' or 'seller'
    verified: true,
    kycVerified: true,
    mobileVerified: true,
    mobile: '9876543210',
    email: 'starjewels@gmail.com',
    city: 'Surat',
    state: 'Gujarat',
    gstin: '27AAACI1234F1Z5',
    kycDocs: true,
    profileImage: '',

    // Seller-only data
    activeListings: 4,
    totalScrap: 31,
    activeContracts: 2,
    stats: {
      interests: 9,
      avgPrice: 22500
    },

    // Buyer-only data
    savedItems: 12,
    contractOffers: {
      sent: 3,
      accepted: 1
    },
    leadFilters: {
      types: ['Gold Dust', 'Silver Waste'],
      cities: ['Surat', 'Mumbai']
    },

    buyerTier: 'Pro Buyer' // or 'Free Plan'
  };

  get isSeller() {
    return this.user.role === 'seller';
  }

  get isBuyer() {
    return this.user.role === 'buyer';
  }

  editProfile() {
    alert('Edit profile clicked!');
  }

  upgrade() {
    alert('Upgrade clicked!');
  }

  logout() {
    alert('Logged out!');
  }
}
