import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-product-list',
  templateUrl: './buyer-product-list.component.html',
  styleUrls: ['./buyer-product-list.component.css']
})
export class BuyerProductListComponent implements OnInit {

   categoryTitle = 'Artificial Jewellery';
  totalResults = 3454;

  sortBy = 'popularity';

  products = [
    {
      id: 1,
      name: 'Elegant Kundan Choker',
      price: 899,
      rating: 4.5,
      supplier: 'Shree Jewellers',
      image: 'assets/dummy/p1.jpg'
    },
    {
      id: 2,
      name: 'Maharani Polki Set',
      price: 1199,
      rating: 4.5,
      supplier: 'Shree Jewellers',
      image: 'assets/dummy/p2.jpg'
    },
    {
      id: 3,
      name: 'Stunning AD Bridal Necklace',
      price: 799,
      rating: 4.5,
      supplier: 'Shree Jewellers',
      image: 'assets/dummy/p3.jpg'
    },
    {
      id: 4,
      name: 'Traditional Kundan Necklace',
      price: 699,
      rating: 4.5,
      supplier: 'Shree Jewellers',
      image: 'assets/dummy/p4.jpg'
    }
  ];

  ngOnInit(): void {
    
  }

  onSortChange(value: string) {
    this.sortBy = value;
  }

  getStars(rating: number) {
    return Array(Math.floor(rating));
  }
}

