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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
   this.orderId = Number(localStorage.getItem('OrderId') || 0);
  
    this.loadOrderDetails();
  }

  // ⭐ Load Order Details from API
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

  // ⭐ Update Order Status
  updateStatus(newStatus: string) {
    this.orderService.updateStatus(this.order.orderId, newStatus).subscribe({
      next: () => {
        this.order.status = newStatus;
      },
      error: (err) => console.error("Status update failed", err)
    });
  }

  // ⭐ Action Buttons
  accept() { this.updateStatus("Accepted"); }
  reject() { this.updateStatus("Rejected"); }
  ship()   { this.updateStatus("Shipped"); }

  // ⭐ UI Helper
  statusColor(status: string) {
    return status === "Pending" ? 'bg-new'
         : status === "Accepted" ? 'bg-accepted'
         : status === "Shipped" ? 'bg-shipped'
         : 'bg-rejected';
  }

  viewProduct(productId: number) {
    this.router.navigate(['/seller-product', productId]);
  }

  goBack() {
    this.router.navigate(['/seller-orders']);
  }
}
