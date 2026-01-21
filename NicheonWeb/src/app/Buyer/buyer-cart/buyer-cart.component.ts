import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-cart',
  templateUrl: './buyer-cart.component.html',
  styleUrls: ['./buyer-cart.component.css']
})
export class BuyerCartComponent {

 cartItems = [
    {
      productId: 1,
      name: 'Brass Zircon Adjustable Ring',
      price: 180,
      quantity: 1
    }
  ];

  get subtotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  get totalItems(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  increaseQty(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQty(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

}
