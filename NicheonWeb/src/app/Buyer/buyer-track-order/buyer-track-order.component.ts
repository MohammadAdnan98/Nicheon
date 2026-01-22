import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED';

@Component({
  selector: 'app-buyer-track-order',
  templateUrl: './buyer-track-order.component.html',
  styleUrls: ['./buyer-track-order.component.css']
})
export class BuyerTrackOrderComponent {

// =========================
  // ROUTE / ORDER
  // =========================
  orderId!: string;

  // =========================
  // ORDER DATA (PHASE 1)
  // =========================
  order = {
    orderId: 'ORD-20250214-001',
    orderDate: '14 Feb 2025',
    totalAmount: 180,
    status: 'PROCESSING' as OrderStatus,

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
        productId: 1,
        name: 'Hot Selling Brass Zircon Adjustable Ring for Women',
        image: 'assets/Image/Earring_01.png',
        supplier: 'Xiamen Ju Min Yue Network Co., Ltd.',
        color: 'White',
        size: 'Adjustable',
        design: 'Casual',
        qty: 1,
        price: 180
      }
    ]
  };

  // =========================
  // TIMELINE CONFIG
  // =========================
  timelineSteps = [
    { key: 'PLACED', label: 'Order Placed', date: '14 Feb' },
    { key: 'CONFIRMED', label: 'Confirmed by Seller', date: '14 Feb' },
    { key: 'PROCESSING', label: 'Processing', date: 'In progress' },
    { key: 'SHIPPED', label: 'Shipped', date: '' },
    { key: 'DELIVERED', label: 'Delivered', date: '' }
  ];

  constructor(private route: ActivatedRoute) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    // Phase 2:
    // this.orderId = this.route.snapshot.paramMap.get('orderId')!;
    // this.loadOrder(this.orderId);
  }

  // =========================
  // STATUS HELPERS (UI LOGIC)
  // =========================

  isCompleted(stepKey: string): boolean {
    return this.getStatusIndex(stepKey) < this.getStatusIndex(this.order.status);
  }

  isActive(stepKey: string): boolean {
    return stepKey === this.order.status;
  }

  private getStatusIndex(status: string): number {
    return this.timelineSteps.findIndex(s => s.key === status);
  }

  // =========================
  // CALCULATIONS
  // =========================
  get itemTotal(): number {
    return this.order.items.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );
  }

  // =========================
  // USER ACTIONS
  // =========================

  contactSeller(): void {
    // Phase 2: WhatsApp / Chat integration
    alert('Contact seller – Phase 2');
  }

  raiseIssue(): void {
    // Phase 2: Support / ticket system
    alert('Raise issue – Phase 2');
  }

  // =========================
  // API READY (PHASE 2)
  // =========================
  /*
  loadOrder(orderId: string): void {
    this.orderService.getOrderById(orderId).subscribe(res => {
      this.order = res.data;
    });
  }
  */

}
