import { Component, OnInit } from '@angular/core';

interface SavedItem {
  id: number;
  image: string;
  type: string;
  weight: string;
  price: number;
  city: string;
  state: string;
  expiry: string;               // Display string (e.g., "Expires in 2 days")
  expiryDate: Date;             // Real date for sorting
  status: 'Available' | 'Sold' | 'Expired';
  sellerName: string;
  verified: boolean;
  savedAt: Date;
  remind: boolean;
}

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  filters = {
    status: 'All',               // Options: All | Available | Expired
    sortBy: 'recent'             // Options: recent | expiring | priceHigh
  };

  savedListings: SavedItem[] = [];
  filteredListings: SavedItem[] = [];

  ngOnInit(): void {
    this.savedListings = [
      {
        id: 1,
        image: 'assets/Image/golddust.png',
        type: 'Gold Dust',
        weight: '2.5kg',
        price: 22000,
        city: 'Surat',
        state: 'Gujarat',
        expiry: '', // will be calculated
        expiryDate: new Date('2025-07-10T00:00:00'),
        status: 'Available',
        sellerName: 'Jewels Shop',
        verified: true,
        savedAt: new Date('2025-07-06T14:00:00'),
        remind: false
      },
      {
        id: 2,
        image: 'assets/Image/rawgold.png',
        type: 'Silver Filings',
        weight: '1.2kg',
        price: 18000,
        city: 'Mumbai',
        state: 'Maharashtra',
        expiry: '', // will be calculated
        expiryDate: new Date('2025-07-01T00:00:00'),
        status: 'Expired',
        sellerName: 'Silver Palace',
        verified: false,
        savedAt: new Date('2025-07-05T10:00:00'),
        remind: true
      }
    ];

    // Calculate expiry text for display
    this.savedListings.forEach(item => {
      item.expiry = this.getExpiryLabel(item.expiryDate);
    });

    this.applyFilters();
  }

  getExpiryLabel(date: Date): string {
    const today = new Date();
    const diff = date.getTime() - today.getTime();
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Expires today';
    if (daysLeft === 1) return 'Expires in 1 day';
    return `Expires in ${daysLeft} days`;
  }

  applyFilters(): void {
    let results = [...this.savedListings];

    // Filter by status
    if (this.filters.status !== 'All') {
      results = results.filter(item => item.status === this.filters.status);
    }

    // Sorting logic
    switch (this.filters.sortBy) {
      case 'recent':
        results.sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
        break;
      case 'expiring':
        results.sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime());
        break;
      case 'priceHigh':
        results.sort((a, b) => b.price - a.price);
        break;
    }

    this.filteredListings = results;
  }

  startChat(item: SavedItem): void {
    console.log('Starting chat with:', item.sellerName);
    // Add actual chat functionality here
  }

  callSeller(item: SavedItem): void {
    console.log('Calling seller:', item.sellerName);
    // Add real call logic or trigger here
  }

  removeSaved(item: SavedItem): void {
    this.savedListings = this.savedListings.filter(i => i.id !== item.id);
    this.applyFilters();
  }

  toggleReminder(item: SavedItem): void {
    item.remind = !item.remind;
  }
}
