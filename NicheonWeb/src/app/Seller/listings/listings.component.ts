import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/ProductService';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent {

  products: any[] = [];
  filteredProducts: any[] = [];
  loading = false;

  filterStatus = 'All';
  sortOption = 'Newest';

  // For toast
  toastMessage: string = "";
  toastType: 'success' | 'error' = 'success';

  constructor(
    private productService: ProductService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {

    // 🔥 CHECK IF ADD PRODUCT SENT A TOAST MESSAGE
  const msg = localStorage.getItem("toastMessage");
  const type = localStorage.getItem("toastType");

  if (msg) {
    this.toastMessage = msg;
    this.toastType = type as any;

    // Remove so it doesn't reappear on refresh
    localStorage.removeItem("toastMessage");
    localStorage.removeItem("toastType");

    // Auto-hide after 3 sec
    setTimeout(() => {
      this.toastMessage = "";
    }, 3000);
  }

    this.loadProducts();
  }

  loadProducts(): void {
  this.loading = true;

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const businessId = user.businessId || 1;

  this.productService.getSellerProducts(businessId).subscribe({
    next: (res) => {

      this.products = res.items || [];

      this.filteredProducts = this.products.map(p => {
        let imageUrl = p.thumbnailUrl || '';

        // FIX: remove leading slash to avoid double slashes
        if (imageUrl.startsWith('/')) {
          imageUrl = imageUrl.substring(1);
        }

        return {
          ...p,
          primaryImage: `${environment.imgUrl}/${imageUrl}`
        };
      });

      this.loading = false;
    },
    error: () => {
      this.loading = false;
    }
  });
}


  applyFilter(): void {
    if (this.filterStatus === 'All') {
      this.filteredProducts = [...this.products];
    } 
    else if (this.filterStatus === 'Active') {
      this.filteredProducts = this.products.filter(p => p.isActive);
    } 
    else if (this.filterStatus === 'OutOfStock') {
      this.filteredProducts = this.products.filter(p => p.stock <= 0);
    } 
    else {
      this.filteredProducts = this.products.filter(p => !p.isActive);
    }
  }

  applySort(): void {
    if (this.sortOption === 'PriceHigh') {
      this.filteredProducts.sort((a, b) => (b.pricePerGram || 0) - (a.pricePerGram || 0));
    } 
    else if (this.sortOption === 'PriceLow') {
      this.filteredProducts.sort((a, b) => (a.pricePerGram || 0) - (b.pricePerGram || 0));
    } 
    else {
      this.filteredProducts.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
  }

  editProduct(product: any): void {
    this.router.navigate(['/seller-edit-product', product.productId]);
  }

 // --------------------------
  // 🔥 TOAST FUNCTION
  // --------------------------
  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => (this.toastMessage = ""), 3000);
  }

  // --------------------------
  // 🔥 CONFIRM DELETE + TOAST
  // --------------------------
  async deleteProduct(product: any): Promise<void> {
    const ok = confirm(`Are you sure you want to DELETE "${product.productName}"?`);
    if (!ok) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user.businessId || 1;

    this.productService.deleteProduct(product.productId, businessId).subscribe({
      next: () => {
        this.showToast("Product deleted successfully!", "success");
        this.loadProducts();
      },
      error: () => {
        this.showToast("Failed to delete product.", "error");
      }
    });
  }

  viewProduct(product: any): void {
    this.router.navigate(['/seller-product', product.productId]);
  }

  addProduct() {
    this.router.navigate(['/seller-add-product']);
  }

  goBack() {
    this.router.navigate(['/seller-dashboard']);
  }
}
