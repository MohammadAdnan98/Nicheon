import { Component, OnInit } from '@angular/core';
import { AdminOrdersService } from 'src/app/Services/admin/adminOrdersService';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];
  statusFilter: string = 'ALL';
  adminId = 1;

  // store selected status per order (TEMP only)
  selectedStatus: { [orderId: number]: string } = {};

  constructor(private service: AdminOrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.service.getOrders(this.statusFilter).subscribe(res => {
      this.orders = res.data;

      // initialize dropdowns with CURRENT order status
      this.orders.forEach(o => {
        this.selectedStatus[o.orderId] = o.status;
      });
    });
  }

  onStatusChange(orderId: number, value: string) {
    // ONLY update local state, no API call here
    this.selectedStatus[orderId] = value;
  }

  saveStatus(orderId: number) {
    const statusToSave = this.selectedStatus[orderId];

    this.service
      .updateStatus(orderId, statusToSave, this.adminId)
      .subscribe(() => {
        this.loadOrders();
      });
  }
}
