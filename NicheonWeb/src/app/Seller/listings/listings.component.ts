import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent 
{

  products: any[] = [];
  filteredProducts: any[] = [];
  loading = false;

  filterStatus = 'All';
  sortOption = 'Newest';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user?.businessId || 1;

    this.productService.getSellerProducts(businessId).subscribe({
      next: (res) => {
        this.products = res.data || res;
        this.filteredProducts = [...this.products];
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to fetch products', err);
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    if (this.filterStatus === 'All') {
      this.filteredProducts = [...this.products];
    } else if (this.filterStatus === 'Active') {
      this.filteredProducts = this.products.filter((p) => p.isActive);
    } else if (this.filterStatus === 'OutOfStock') {
      this.filteredProducts = this.products.filter((p) => p.stock <= 0);
    } else {
      this.filteredProducts = this.products.filter((p) => !p.isActive);
    }
  }

  applySort(): void {
    if (this.sortOption === 'PriceHigh') {
      this.filteredProducts.sort((a, b) => (b.pricePerGram || 0) - (a.pricePerGram || 0));
    } else if (this.sortOption === 'PriceLow') {
      this.filteredProducts.sort((a, b) => (a.pricePerGram || 0) - (b.pricePerGram || 0));
    } else {
      this.filteredProducts.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
    }
  }

  editProduct(product: any): void {
    this.router.navigate(['/seller-edit-product', product.productId]);
  }

  deleteProduct(product: any): void {
    if (confirm(`Delete product "${product.productName}"?`)) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const businessId = user?.businessId || 1;
      this.productService.deleteProduct(product.productId, businessId).subscribe({
        next: () => {
          alert('🗑 Product deleted.');
          this.loadProducts();
        },
        error: () => alert('Failed to delete product.'),
      });
    }
  }

  viewProduct(product: any): void {
    this.router.navigate(['/product-deatil'], { queryParams: { id: product.productId } });
  }

}
