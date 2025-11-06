import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seller-order-details',
  templateUrl: './seller-order-details.component.html',
  styleUrls: ['./seller-order-details.component.css']
})
export class SellerOrderDetailsComponent implements OnInit {

  order: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const orderNumber = this.route.snapshot.paramMap.get('id');

    // ✅ Dummy data — replace later with API result
    this.order = {
      orderNumber: orderNumber,
      buyerName: "Raj Jewellers",
      businessName: "Raj Gold Works",
      city: "Surat",
      state: "Gujarat",
      phone: "9876543210",
      status: "New",
      paymentMethod: "NEFT",
      orderDate: new Date(),
      totalAmount: 597000,

      items: [
        {
          productId: 101,
          productName: "Gold Chain (18K)",
          metal: "Gold",
          karat: "18K",
          colour: "Yellow",
          weightGrams: 12.5,
          size: "20 inch",
          qty: 2,
          price: 152000,
          images: ["assets/Image/goldchain.jpg"]
        },
        {
          productId: 102,
          productName: "Gold Biscuit (24K)",
          metal: "Gold",
          karat: "24K",
          weightGrams: 5,
          qty: 5,
          price: 445000,
          images: ["assets/Image/gildbiscuit.jpg"]
        }
      ]
    };
  }

  statusColor(status: string) {
    return status === "New" ? 'bg-new'
         : status === "Accepted" ? 'bg-accepted'
         : status === "Shipped" ? 'bg-shipped'
         : 'bg-rejected';
  }

  goBack() { this.router.navigate(['/seller-orders']); }
  accept() { this.order.status = "Accepted"; }
  reject() { this.order.status = "Rejected"; }
  ship() { this.order.status = "Shipped"; }

  viewProduct(productId: number) {
  debugger;
   this.router.navigate(['/seller-product', productId]);
  }
}
