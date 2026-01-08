import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/Services/admin/adminOrdersService';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  status = 'ALL';
  adminId = 1;

  statusOptions = [
    'Pending',
    'Accepted',
    'Shipped',
    'Delivered',
    'Cancelled'
  ];

  constructor(private service: AdminOrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.service.getOrders(this.status).subscribe(res => {
      this.orders = res.data;
    });
  }

  saveStatus(order: any) {
    this.service
      .updateStatus(order.orderId, order.status, this.adminId)
      .subscribe(() => this.loadOrders());
  }
}



