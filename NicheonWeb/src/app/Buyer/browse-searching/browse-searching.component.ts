import { Component, OnInit } from '@angular/core';

// ✅ Move interface **outside** the @Component
interface ScrapListing {
  id: number;
  image: string;
  type: string;
  weight: string;
  city: string;
  state: string;
  verified: boolean;
  price: number;
  saved: boolean;
  hasContract: boolean;
}

@Component({
  selector: 'app-browse-searching',
  templateUrl: './browse-searching.component.html',
  styleUrls: ['./browse-searching.component.css']
})
export class BrowseSearchingComponent implements OnInit {
  scrapTypes: string[] = ['Gold Dust', 'Silver Filings', 'Mixed', 'Other'];
  cities: string[] = ['Mumbai', 'Surat', 'Delhi', 'Jaipur'];

  filters = {
    search: '',
    type: '',
    city: '',
    verifiedOnly: false,
    sortBy: 'newest',
    contractsOnly: false
  };

  listings: ScrapListing[] = [
    {
      id: 1,
      image: 'assets/Image/golddust.png',
      type: 'Gold Dust',
      weight: '3kg',
      city: 'Mumbai',
      state: 'Maharashtra',
      verified: true,
      price: 22500,
      saved: false,
      hasContract: true
    },
    {
      id: 2,
      image: 'assets/Image/rawgold.png',
      type: 'Silver Filings',
      weight: '2.5kg',
      city: 'Surat',
      state: 'Gujarat',
      verified: false,
      price: 18500,
      saved: false,
      hasContract: false
    }
  ];

  filteredListings: ScrapListing[] = [];

  userVerified = false; // Example flag for showing alert

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredListings = this.listings.filter(listing => {
      const matchesSearch = this.filters.search === '' || listing.type.toLowerCase().includes(this.filters.search.toLowerCase());
      const matchesType = this.filters.type === '' || listing.type === this.filters.type;
      const matchesCity = this.filters.city === '' || listing.city === this.filters.city;
      const matchesVerified = !this.filters.verifiedOnly || listing.verified;
      const matchesContract = !this.filters.contractsOnly || listing.hasContract;
      return matchesSearch && matchesType && matchesCity && matchesVerified && matchesContract;
    });

    if (this.filters.sortBy === 'priceHigh') {
      this.filteredListings.sort((a, b) => b.price - a.price);
    } else {
      this.filteredListings.sort((a, b) => b.id - a.id); // Assuming ID represents recency
    }
  }

  toggleSave(item: ScrapListing): void {
    item.saved = !item.saved;
  }

  startChat(item: ScrapListing): void {
    console.log('Start chat with', item);
  }

  callSeller(item: ScrapListing): void {
    console.log('Call seller of', item);
  }
}
