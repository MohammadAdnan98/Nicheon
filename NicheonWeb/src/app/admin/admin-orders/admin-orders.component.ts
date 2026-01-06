import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/Services/admin/AdminDashboardService';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];
  statusFilter: string | null = null;
  loading = false;

  constructor(private service: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    // this.service.getOrders(this.statusFilter).subscribe({
    //   next: res => {
    //     this.orders = res.data;
    //     this.loading = false;
    //   },
    //   error: () => this.loading = false
    // });
  }

  updateStatus(orderId: number, status: any) {
    // this.service.updateOrderStatus(orderId, status).subscribe(() => {
    //   this.loadOrders();
    // });
  }
}
