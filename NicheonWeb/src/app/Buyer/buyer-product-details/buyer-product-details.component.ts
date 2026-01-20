import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-product-details',
  templateUrl: './buyer-product-details.component.html',
  styleUrls: ['./buyer-product-details.component.css']
})
export class BuyerProductDetailsComponent {

selectedImage = '';

  product = {
    name: '22K Gold Ear-Ring for Women – BIS Certified',
    brand: 'Malabar Gold & Diamonds',
    rating: 4.5,
    price: 69916,
    mrp: 78199,
    metal: 'Yellow Gold',
    purity: '22K (916)',
    weight: '3.09 g',
    stone: 'No Gemstone',
    origin: 'India',
    description: 'This premium 22K gold ear-ring is crafted for elegance and durability. Ideal for bulk B2B orders, gifting, and retail resale.',
    images: [
      'assets/Image/Earring_01.png',
      'assets/Image/Earring_02.png',
      'assets/Image/Earring_03.png'
    ],
    supplier: {
      name: 'Malabar Gold Manufacturing Unit',
      location: 'Kerala, India',
      rating: 4.8
    }
  };

  relatedProducts = [
    {
      name: 'Gold Ear-Ring Classic',
      price: 45999,
      image: 'assets/Image/Earring_01.png'
    },
    {
      name: 'Designer Gold Chain',
      price: 52999,
      image: 'assets/Image/goldchain.jpg'
    },
    {
      name: 'Wedding Silver Ring',
      price: 68999,
      image: 'assets/Image/silverring.png'
    }
  ];

  ngOnInit() {
    this.selectedImage = this.product.images[0];
  }

}
