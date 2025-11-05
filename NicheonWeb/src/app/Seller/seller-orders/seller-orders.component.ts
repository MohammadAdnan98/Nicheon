import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {

  constructor(private router: Router) {}

  


  loading = true;

  orders: any[] = [
    {
      orderNumber: 1024,
      buyerName: "Raj Jewellers",
      city: "Surat",
      items: [{ name: "18K Gold Chain", qty: 2 }],
      totalAmount: 152000,
      paymentMethod: "NEFT",
      status: "New",
      orderDate: new Date(),
      selected: false
    },
    {
      orderNumber: 1025,
      buyerName: "Anand Gold Traders",
      city: "Jaipur",
      items: [{ name: "Gold Biscuit (24K)", qty: 5 }],
      totalAmount: 445000,
      paymentMethod: "RTGS",
      status: "Accepted",
      orderDate: new Date(),
      selected: false
    }
  ];

  filteredOrders = [...this.orders];
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
    setTimeout(() => {
      this.updateStats();
      this.loading = false;
    }, 800);
  }

  updateStats() {
    this.stats.newOrders = this.orders.filter(o => o.status == "New").length;
    this.stats.accepted = this.orders.filter(o => o.status == "Accepted").length;
    this.stats.shipped = this.orders.filter(o => o.status == "Shipped").length;
    this.stats.revenue = this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
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

  accept(o: any) { o.status = "Accepted"; this.updateStats(); }
  reject(o: any) { o.status = "Rejected"; this.updateStats(); }
  ship(o: any) { o.status = "Shipped"; this.updateStats(); }

  bulkAccept() { this.selectedOrders.forEach(o => this.accept(o)); }
  bulkReject() { this.selectedOrders.forEach(o => this.reject(o)); }
  bulkShip() { this.selectedOrders.forEach(o => this.ship(o)); }

  refresh() { this.applyFilter(); }

  viewDetails(order: any) {
  this.router.navigate(['/seller-order-details', order.orderNumber]);
}

goDashboard() {
  this.router.navigate(['/seller-dashboard']);
}

  
}
