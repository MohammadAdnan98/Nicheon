import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  products: any[] = [];
  orders: any[] = [];
  summaryCards: any[] = [];
  sellerName = '';
  businessName = '';
  verified = true;
  loading = true;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.sellerName = user?.fullName || 'Seller';
    this.businessName = user?.businessName || 'Your Business';
    this.verified = user?.isVerified ?? true;

    this.loadDashboard();
  }

  loadDashboard() {
    this.productService.getSellerProducts(1).subscribe({
      next: (res) => {
        this.products = Array.isArray(res) ? res : res.data || [];
        this.loadDemoOrders();
      },
      error: (err) => {
        console.warn('API failed, using demo data');
        this.loadDemoData();
      }
    });
  }

  loadDemoData() {
    this.products = [
      { productName: 'Gold Ring', pricePerGram: 5800, image: 'assets/Image/goldring.png', stock: 10, productId: 101 },
      { productName: 'Silver Chain', pricePerGram: 90, image: 'assets/Image/silverchain.png', stock: 25, productId: 102 }
    ];
    this.loadDemoOrders();
  }

  loadDemoOrders() {
    this.orders = [
      { buyer: 'Raj Jewellers', product: 'Gold Ring', quantity: 2, amount: 12000, status: 'Pending' },
      { buyer: 'Anand Jewellers', product: 'Silver Chain', quantity: 5, amount: 4500, status: 'Accepted' }
    ];

    // this.summaryCards = [
    //   { label: 'Products', value: this.products.length },
    //   { label: 'Orders', value: this.orders.length },
    //   { label: 'Active Orders', value: this.orders.filter(o => o.status === 'Pending').length },
    //   { label: 'Earnings', value: '₹45,200' }
    // ];

    this.loading = false;
  }

  summary = [
  { label: "New Orders", value: 0 },
  { label: "Accepted", value: 0 },
  { label: "Shipped", value: 0 },
  { label: "Revenue (Demo)", value: "₹0" }
];

loadDemoSummary() {
  this.summary = [
    { label: "New Orders", value: this.orders.filter(o => o.status === 'New').length },
    { label: "Accepted", value: this.orders.filter(o => o.status === 'Accepted').length },
    { label: "Shipped", value: this.orders.filter(o => o.status === 'Shipped').length },
    { label: "Revenue (Demo)", value: "₹" + this.orders.reduce((sum, o) => sum + o.totalAmount, 0) }
  ];
}

  addProduct() {
    this.router.navigate(['/seller-add-product']);
  }

  viewProduct(ProductId: any): void {
    debugger;
   this.router.navigate(['/seller-product', ProductId]);
}

}
