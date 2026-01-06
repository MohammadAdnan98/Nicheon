import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/Services/admin/AdminDashboardService';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any[] = [];
  statusFilter: number | null = null;
  loading = false;

  constructor(private service: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    // this.service.getProducts(this.statusFilter).subscribe({
    //   next: res => {
    //     this.products = res.data;
    //     this.loading = false;
    //   },
    //   error: () => this.loading = false
    // });
  }

  approve(productId: number) {
    // this.service.approveProduct(productId).subscribe(() => {
    //   this.loadProducts();
    // });
  }

  reject(productId: number) {
    const reason = prompt('Enter rejection reason');
    if (!reason) return;

    // this.service.rejectProduct(productId, reason).subscribe(() => {
    //   this.loadProducts();
    // });
  }
}
