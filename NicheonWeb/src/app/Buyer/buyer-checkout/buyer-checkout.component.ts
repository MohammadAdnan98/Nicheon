import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-checkout',
  templateUrl: './buyer-checkout.component.html',
  styleUrls: ['./buyer-checkout.component.css']
})
export class BuyerCheckoutComponent {
  
  hasSavedAddress = true; // toggle to false to test form

  address = {
    fullName: 'Saiyed Mohammad Adnan',
    line1: 'C-325/A, Shaheen Bagh',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110025',
    phone: '+91 9XXXXXXXXX'
  };

  totalItems = 1;
  itemTotal = 180;

  editAddress() {
    this.hasSavedAddress = false;
  }

  saveAddress() {
    this.hasSavedAddress = true;
  }

  placeOrder() {
    alert('Order placed with Cash on Delivery');
  }

}
