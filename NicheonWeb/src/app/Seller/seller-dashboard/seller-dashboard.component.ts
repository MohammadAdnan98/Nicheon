import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  products: any[] = [];
  sellerName: string = '';
  businessName: string = '';
  verified: boolean = true; // ✅ Added property
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.sellerName = user?.fullName || 'Seller';
    this.businessName = user?.businessName || 'Your Business';
    this.verified = user?.isVerified ?? true; // ✅ dynamic verification if available
    this.loadProducts();
  }

  loadProducts() {
    const businessId = 1; // 🔹 Replace later with actual logged-in user's businessId
    this.productService.getSellerProducts(businessId).subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load products:', err);
        this.loading = false;
      }
    });
  }

  addProduct() {
    this.router.navigate(['/seller-add-product']);
  }

  // ✅ Added logout function
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }
}
