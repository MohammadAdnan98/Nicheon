import { Component } from '@angular/core';

type OrderStatus = 'Delivered' | 'Shipped' | 'Processing' | 'Confirmed';

@Component({
  selector: 'app-buyer-orders',
  templateUrl: './buyer-orders.component.html',
  styleUrls: ['./buyer-orders.component.css']
})
export class BuyerOrdersComponent {

  // =========================
  // DUMMY ORDERS (PHASE 1)
  // =========================
  orders = [
    {
      orderId: 'ORD10231',
      date: '20 Jan 2026',
      status: 'Delivered' as OrderStatus,
      total: 180,
      items: [
        {
          name: 'Brass Zircon Adjustable Ring',
          supplier: 'Xiamen Ju Min Yue Network Co., Ltd.',
          color: 'White',
          size: 'Adjustable',
          qty: 1,
          price: 180,
          image: 'assets/Image/Earring_01.png'
        }
      ]
    },
    {
      orderId: 'ORD10255',
      date: '18 Jan 2026',
      status: 'Shipped' as OrderStatus,
      total: 510,
      items: [
        {
          name: 'Gold Plated Crystal Ring',
          supplier: 'Shree Jewellers',
          color: 'Gold',
          size: '10',
          qty: 3,
          price: 170,
          image: 'assets/Image/goldring.png'
        }
      ]
    }
  ];

  // =========================
  // CONFIRMATION MODAL STATE
  // =========================
  showConfirmModal = false;
  confirmTitle = '';
  confirmMessage = '';

  private selectedOrder: any = null;
  private actionType: 'RETURN' | 'CANCEL' | null = null;

  // =========================
  // RETURN FLOW
  // =========================
  confirmReturn(order: any): void {
    this.selectedOrder = order;
    this.actionType = 'RETURN';

    this.confirmTitle = 'Return Product';
    this.confirmMessage =
      'Are you sure you want to return this product? Return request will be sent to the seller.';

    this.showConfirmModal = true;
  }

  // =========================
  // CANCEL FLOW
  // =========================
  confirmCancel(order: any): void {
    this.selectedOrder = order;
    this.actionType = 'CANCEL';

    this.confirmTitle = 'Cancel Order';
    this.confirmMessage =
      'Are you sure you want to cancel this order? This action cannot be undone.';

    this.showConfirmModal = true;
  }

  // =========================
  // CONFIRM ACTION
  // =========================
  confirmAction(): void {
    if (!this.selectedOrder || !this.actionType) return;

    if (this.actionType === 'RETURN') {
      this.handleReturn(this.selectedOrder);
    }

    if (this.actionType === 'CANCEL') {
      this.handleCancel(this.selectedOrder);
    }

    this.closeConfirm();
  }

  // =========================
  // CLOSE MODAL
  // =========================
  closeConfirm(): void {
    this.showConfirmModal = false;
    this.selectedOrder = null;
    this.actionType = null;
  }

  // =========================
  // HANDLERS (PHASE 1)
  // =========================
  private handleReturn(order: any): void {
    // Phase 2: API call
    console.log('Return requested for order:', order.orderId);
    alert(`Return request submitted for Order ${order.orderId}`);
  }

  private handleCancel(order: any): void {
    // Phase 2: API call
    console.log('Cancel requested for order:', order.orderId);

    // UI update (simulate success)
    order.status = 'Cancelled';

    alert(`Order ${order.orderId} has been cancelled`);
  }

  // =========================
  // PHASE 2 (API READY)
  // =========================
  /*
  loadOrders(): void {
    this.orderService.getBuyerOrders().subscribe(res => {
      this.orders = res.data;
    });
  }

  cancelOrder(orderId: string): void {
    this.orderService.cancelOrder(orderId).subscribe();
  }

  returnOrder(orderId: string): void {
    this.orderService.returnOrder(orderId).subscribe();
  }
  */
}
