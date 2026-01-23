import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-products',
  templateUrl: './buyer-products.component.html',
  styleUrls: ['./buyer-products.component.css']
})
export class BuyerProductsComponent {

 // =========================
  // FILTER OPTIONS
  // =========================
  categories = ['Rings', 'Earrings', 'Necklace', 'Chain', 'Bangles'];
  metals = ['Gold', 'Silver', 'Diamond', 'Artificial'];
  jewelleryTypes = ['Wedding', 'Daily Wear', 'Party Wear'];
  regionalStyles = ['Punjabi Style', 'Gujarati Style', 'South Indian', 'Rajasthani'];

  // =========================
  // PRODUCTS (DUMMY DATA)
  // =========================
  products = [
    {
      name: 'Brass Zircon Adjustable Ring',
      supplier: 'Xiamen Ju Min Yue Network Co., Ltd.',
      metal: 'Artificial',
      type: 'Party Wear',
      region: 'Punjabi Style',
      price: 180,
      image: 'assets/Image/Earring_01.png'
    },
    {
      name: 'Gold Plated Crystal Necklace',
      supplier: 'Shree Jewellers',
      metal: 'Gold',
      type: 'Wedding',
      region: 'Gujarati Style',
      price: 3200,
      image: 'assets/Image/goldchain.jpg'
    }
  ];

  filteredProducts = [...this.products];

  ngOnInit(): void {}

  // =========================
  // FILTER HANDLERS
  // =========================
  filterByCategory(cat: string) {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(cat.toLowerCase())
    );
  }

  filterByMetal(metal: string) {
    this.filteredProducts = this.products.filter(p => p.metal === metal);
  }

  filterByType(type: string) {
    this.filteredProducts = this.products.filter(p => p.type === type);
  }

  filterByRegion(region: string) {
    this.filteredProducts = this.products.filter(p => p.region === region);
  }

  // =========================
  // SORTING
  // =========================
  sortProducts(value: any) {
    if (value === 'priceLow') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    }
    if (value === 'priceHigh') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
    if (value === 'recent') {
      this.filteredProducts = [...this.products];
    }
  }

  // =========================
  // API READY (PHASE 2)
  // =========================
  /*
  loadProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.data;
      this.filteredProducts = res.data;
    });
  }
  */
}
