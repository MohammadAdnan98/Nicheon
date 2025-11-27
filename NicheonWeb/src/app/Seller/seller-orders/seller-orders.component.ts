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
  toastMessage: string = "";
  toastType: 'success' | 'error' = 'success';
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
        localStorage.setItem('Order', this.orders.length.toString());
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

  updateOrderStatus(order: any, newStatus: string, successMsg: string) {
  this.orderService.updateStatus(order.orderId, newStatus).subscribe({
    next: () => {
      order.status = newStatus;
      this.updateStats();
      this.applyFilter();

      // Show dashboard-style toast
      this.showToast(successMsg, 'success');
    },
    error: () => {
      this.showToast("Failed to update order status!", "error");
    }
  });
}

// -------------------- TOAST (same as dashboard) --------------------
showToast(message: string, type: 'success' | 'error') {
  this.toastMessage = message;
  this.toastType = type;

  setTimeout(() => {
    this.toastMessage = "";
  }, 3000);
}

// -------------------- CONFIRM POPUP --------------------
confirmAction(msg: string): Promise<boolean> {
  return new Promise(resolve => resolve(confirm(msg)));
}

// -------------------- ACTIONS --------------------
async accept(order: any) {
  if (!(await this.confirmAction("Accept this order?"))) return;
  this.updateOrderStatus(order, "Accepted", "Order Accepted successfully!");
}

async reject(order: any) {
  if (!(await this.confirmAction("Reject this order?"))) return;
  this.updateOrderStatus(order, "Rejected", "Order Rejected successfully!");
}

async ship(order: any) {
  if (!(await this.confirmAction("Ship this order?"))) return;
  this.updateOrderStatus(order, "Shipped", "Order marked as Shipped!");
}

// -------------------- BULK ACTIONS --------------------
async bulkAccept() {
  if (!(await this.confirmAction("Accept ALL selected orders?"))) return;
  this.selectedOrders.forEach(o =>
    this.updateOrderStatus(o, "Accepted", "Order Accepted successfully!")
  );
}

async bulkReject() {
  if (!(await this.confirmAction("Reject ALL selected orders?"))) return;
  this.selectedOrders.forEach(o =>
    this.updateOrderStatus(o, "Rejected", "Order Rejected successfully!")
  );
}

async bulkShip() {
  if (!(await this.confirmAction("Ship ALL selected orders?"))) return;
  this.selectedOrders.forEach(o =>
    this.updateOrderStatus(o, "Shipped", "Order marked as Shipped!")
  );
}

// -------------------- OTHER FUNCTIONS --------------------
refresh() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.loadOrders(user.businessId);
}

viewDetails(order: any) {
  this.router.navigate(['/seller-order-details', order.orderNumber]);
  localStorage.setItem('OrderId', order.orderId);
}

goDashboard() {
  this.router.navigate(['/seller-dashboard']);
}


}
