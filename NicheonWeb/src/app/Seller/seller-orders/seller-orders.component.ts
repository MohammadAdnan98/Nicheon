import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Services/OrderService';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  loading = true;

  orders: any[] = [];
  filteredOrders: any[] = [];
  selectedOrders: any[] = [];

  searchText = "";
  filterStatus = "";

  stats = {
    newOrders: 0,
    accepted: 0,
    shipped: 0,
    revenue: 0
  };

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user?.businessId;

    if (!businessId) {
      console.error("Business ID not found in localStorage");
      return;
    }

    this.loadOrders(businessId);
  }

  // 🔥 LOAD ORDERS FROM API
  loadOrders(businessId: number) {
    this.loading = true;

    this.orderService.getOrders(businessId).subscribe({
      next: (res: any) => {
        this.orders = res || [];
        this.filteredOrders = [...this.orders];
        this.updateStats();
        this.loading = false;
      },
      error: (err) => {
        console.error("Error loading orders", err);
        this.loading = false;
      }
    });
  }

  updateStats() {
    this.stats.newOrders = this.orders.filter(o => o.status === "New").length;
    this.stats.accepted = this.orders.filter(o => o.status === "Accepted").length;
    this.stats.shipped = this.orders.filter(o => o.status === "Shipped").length;
    this.stats.revenue = this.orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }

  applyFilter() {
    this.filteredOrders = this.orders.filter(o =>
      (o.buyerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        o.orderNumber.toString().includes(this.searchText)) &&
      (this.filterStatus === "" || o.status === this.filterStatus)
    );
  }

  updateSelection() {
    this.selectedOrders = this.orders.filter(o => o.selected);
  }

  toggleSelectAll(event: any) {
    const checked = event.target.checked;
    this.orders.forEach(o => o.selected = checked);
    this.updateSelection();
  }

  // 🔥 UPDATE ORDER STATUS VIA API
  updateOrderStatus(order: any, newStatus: string) {
    this.orderService.updateStatus(order.orderId, newStatus).subscribe({
      next: () => {
        order.status = newStatus;
        this.updateStats();
        this.applyFilter();
      },
      error: (err) => console.error("Update failed", err)
    });
  }

  accept(o: any) { this.updateOrderStatus(o, "Accepted"); }
  reject(o: any) { this.updateOrderStatus(o, "Rejected"); }
  ship(o: any) { this.updateOrderStatus(o, "Shipped"); }

  bulkAccept() { this.selectedOrders.forEach(o => this.accept(o)); }
  bulkReject() { this.selectedOrders.forEach(o => this.reject(o)); }
  bulkShip() { this.selectedOrders.forEach(o => this.ship(o)); }

  refresh() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.loadOrders(user.businessId);
  }

  viewDetails(order: any) {
    this.router.navigate(['/seller-order-details', order.orderNumber]);
  }

  goDashboard() {
    this.router.navigate(['/seller-dashboard']);
  }

}
