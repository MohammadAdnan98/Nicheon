import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/Services/OrderService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seller-order-details',
  templateUrl: './seller-order-details.component.html',
  styleUrls: ['./seller-order-details.component.css']
})
export class SellerOrderDetailsComponent implements OnInit {

  order: any = null;
  orderId!: number;

  // Toast
  toastMessage: string = "";
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderId = Number(localStorage.getItem('OrderId') || 0);
    this.loadOrderDetails();
  }

  // ⭐ Load Order Details
  loadOrderDetails() {
    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (res: any) => {
        this.order = {
          ...res,
          items: res.items.map((item: any) => ({
            ...item,
            images: item.images.map((img: string) => {
              if (img.startsWith('/')) img = img.substring(1);
              return `${environment.imgUrl}/${img}`;
            })
          }))
        };
      },
      error: (err) => {
        console.error("Error loading order details", err);
      }
    });
  }

  // ⭐ Confirm Popup
  confirm(msg: string): Promise<boolean> {
    return new Promise(resolve => {
      if (window.confirm(msg)) resolve(true);
      else resolve(false);
    });
  }

  // ⭐ TOAST (same style as dashboard)
  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.toastMessage = "";
      this.toastType = "success";
    }, 3000);
  }

  // ⭐ Update Order Status
  async updateStatus(newStatus: string, toastMsg: string) {
    const confirmMsg =
      newStatus === "Accepted"
        ? "Are you sure you want to ACCEPT this order?"
        : newStatus === "Rejected"
          ? "Are you sure you want to REJECT this order?"
          : "Mark this order as SHIPPED?";

    const ok = await this.confirm(confirmMsg);
    if (!ok) return;

    this.orderService.updateStatus(this.order.orderId, newStatus).subscribe({
      next: () => {
        this.order.status = newStatus;
        this.showToast(toastMsg, 'success');
      },
      error: (err) => {
        console.error("Status update failed", err);
        this.showToast("Failed to update order status!", 'error');
      }
    });
  }

  // ⭐ Action Buttons
  accept() { this.updateStatus("Accepted", "Order Accepted successfully!"); }
  reject() { this.updateStatus("Rejected", "Order Rejected successfully!"); }
  ship()   { this.updateStatus("Shipped", "Order marked as Shipped!"); }

  statusColor(status: string) {
    return status === "Pending"
      ? 'bg-new'
      : status === "Accepted"
      ? 'bg-accepted'
      : status === "Shipped"
      ? 'bg-shipped'
      : 'bg-rejected';
  }

  viewProduct(productId: number) {
    this.router.navigate(['/seller-product', productId]);
  }

  goBack() {
    this.router.navigate(['/seller-orders']);
  }
}
