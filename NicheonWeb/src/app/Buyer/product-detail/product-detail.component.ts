import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ScrapListing {
  id: number;
  type: string;
  weight: string;
  price: number;
  city: string;
  state: string;
  sellerName: string;
  sellerVerified: boolean;
  postedOn: string;
  validTill: string;
  hasContract: boolean;
  interestCount?: number;
  description?: string;
  saved: boolean;
  images: string[];
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  listing: ScrapListing | null = null;
  selectedImage: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const dummyListing: ScrapListing = {
      id: 1,
      type: 'Gold Dust',
      weight: '540 grams',
      price: 24500,
      city: 'Rajkot',
      state: 'Gujarat',
      sellerName: 'Ramesh Jewels',
      sellerVerified: true,
      postedOn: '26 June 2025',
      validTill: '3 July 2025',
      hasContract: true,
      interestCount: 5,
      description: 'Collected from weekly polishing, clean dust, 80–90% pure gold. Regular quantity available monthly.',
      saved: false,
      images: [
        'assets/Image/rawgold.png',
        'assets/Image/golddust.png',
        'assets/Image/LumaJewalLogo.png',
        'assets/Image/rawgold.png',
      ]
    };

    this.listing = dummyListing;
    this.selectedImage = dummyListing.images[0];
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }

  chatWithSeller(): void {
    console.log('Chat with seller:', this.listing?.sellerName);
  }

  callSeller(): void {
    console.log('Calling seller:', this.listing?.sellerName);
  }

  toggleSave(): void {
    if (this.listing) this.listing.saved = !this.listing.saved;
  }

  reportListing(): void {
    console.log('Reported listing ID:', this.listing?.id);
  }
}
