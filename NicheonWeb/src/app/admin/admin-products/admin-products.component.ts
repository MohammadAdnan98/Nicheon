import { Component, OnInit } from '@angular/core';
import { AdminProductService } from 'src/app/Services/admin/AdminProductService';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any[] = [];
  statusFilter: number | null = null;
  adminId = 1;

  constructor(private service: AdminProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts(this.statusFilter).subscribe(res => {
      this.products = res.data.map((p: any) => ({
        ...p,
        newStatus: this.mapStatusToId(p.productStatus)
      }));
    });
  }

  updateStatus(product: any) {
    this.service.updateStatus(product.productId, product.newStatus, this.adminId)
      .subscribe(() => this.loadProducts());
  }

  private mapStatusToId(status: string): number {
    const map: any = {
      Draft: 1,
      PendingApproval: 2,
      Approved: 3,
      Rejected: 4,
      OutOfStock: 5,
      Inactive: 6,
      Archived: 7
    };
    return map[status] ?? 1;
  }
}
