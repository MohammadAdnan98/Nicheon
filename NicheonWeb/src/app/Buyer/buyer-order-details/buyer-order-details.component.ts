import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type OrderStatus = 'PLACED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';


@Component({
  selector: 'app-buyer-order-details',
  templateUrl: './buyer-order-details.component.html',
  styleUrls: ['./buyer-order-details.component.css']
})
export class BuyerOrderDetailsComponent {
 order = {
    orderId: 'ORD-20250214-001',
    orderDate: '14 Feb 2025',
    status: 'DELIVERED' as OrderStatus,
    paymentMethod: 'Cash on Delivery (COD)',

    address: {
      name: 'Saiyed Mohammad Adnan',
      line1: 'Fourth Floor, C-325/A, Ajns Apartment',
      line2: 'Shaheen Bagh, Jamia Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110025',
      country: 'India'
    },

    items: [
      {
        name: 'Hot Selling Brass Zircon Adjustable Ring for Women',
        image: 'assets/Image/Earring_01.png',
        supplier: 'Xiamen Ju Min Yue Network Co., Ltd.',
        color: 'White',
        size: 'Adjustable',
        design: 'Casual',
        qty: 1,
        price: 180
      }
    ],

    shippingCharge: 0
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Phase 2:
    // load order by orderId from API
  }

  /* =========================
     CALCULATIONS
  ========================= */
  get itemTotal(): number {
    return this.order.items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
  }

  get grandTotal(): number {
    return this.itemTotal + this.order.shippingCharge;
  }

  /* =========================
     STATUS HELPERS
  ========================= */
  getStatusLabel(): string {
    switch (this.order.status) {
      case 'PLACED': return 'Order Placed';
      case 'PROCESSING': return 'Processing';
      case 'SHIPPED': return 'Shipped';
      case 'DELIVERED': return 'Delivered';
      case 'CANCELLED': return 'Cancelled';
      default: return '';
    }
  }

  /* =========================
     ACTIONS
  ========================= */
  trackOrder(): void {
    this.router.navigate(['/buyer/track-order', this.order.orderId]);
  }

  reorder(): void {
    alert('Reorder added to cart (Phase 2)');
  }

  cancelOrder(): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.order.status = 'CANCELLED';
    }
  }

  returnOrder(): void {
    alert('Return request initiated (Phase 2)');
  }

  contactSeller(): void {
    alert('Contact seller (Phase 2)');
  }

  raiseIssue(): void {
    alert('Raise issue (Phase 2)');
  }
}
