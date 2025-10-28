import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-scrap-listing',
  templateUrl: './add-scrap-listing.component.html',
  styleUrls: ['./add-scrap-listing.component.css'],
})
export class AddScrapListingComponent {
  previewImages: string[] = [];

  // Form Data
  scrapType: string = 'Gold Dust';
  weight: number = 0;
  expectedPrice: number = 0;
  description: string = '';
  location: string = '';
  validity: string = '15 Days';
  contractEnabled: boolean = false;
  monthlyWeight: string = '';
  contractDuration: string = '3 months';
  termsAccepted: boolean = false;

  constructor(private router: Router) {}

  // Handle image upload preview
  onImageUpload(event: any): void {
    const files: FileList = event.target.files;
    this.previewImages = []; // Clear previous

    if (files && files.length > 0) {
      const limit = Math.min(4, files.length);
      for (let i = 0; i < limit; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  // Handle submission
  submitListing(): void {
    if (!this.termsAccepted) {
      alert('Please accept the terms.');
      return;
    }

    const newListing = {
      images: this.previewImages,
      scrapType: this.scrapType,
      weight: this.weight,
      expectedPrice: this.expectedPrice,
      description: this.description,
      location: this.location,
      validity: this.validity,
      contract: this.contractEnabled
        ? {
            monthlyWeight: this.monthlyWeight,
            duration: this.contractDuration,
          }
        : null,
      createdAt: new Date(),
    };

    console.log('Listing Submitted:', newListing);
    alert('Listing posted successfully!');

    // Simulate redirect to My Listings
    this.router.navigate(['/my-listings']);
  }
}
