import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/DashboardService';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
  products: any[] = [];
  orders: any[] = [];
  sellerName = '';
  businessName = '';
  verified = true;
  loading = true;
  summary: any[] = [];
  unreadNotifications = 0;
  showNotifications = false;
  unreadCount = 0;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.sellerName = user?.fullName || 'Seller';
    this.businessName = user?.businessName || 'Your Business';
    this.verified = user?.isVerified ?? true;

    const businessId = user?.businessId || 1; // ✅ fix: correct property casing
    this.loadDashboard(businessId);
  }

  loadDashboard(businessId: number) {
    this.loading = true;
    this.dashboardService.getDashboard(businessId).subscribe({
      next: (res) => {
        console.log('✅ Dashboard Data:', res);

        // 🟢 Seller Info
        if (res.sellerInfo) {
          this.businessName = res.sellerInfo.businessName || this.businessName;
          this.verified = res.sellerInfo.isVerified ?? this.verified;
        }

        // 🟢 Summary cards (fix key names to match API)
        const s = res.summary ?? { newOrders: 0, acceptedOrders: 0, shippedOrders: 0, revenue: 0 };
        this.summary = [
          { label: 'New Orders', value: s.newOrders ?? 0 },
          { label: 'Accepted', value: s.acceptedOrders ?? 0 },
          { label: 'Shipped', value: s.shippedOrders ?? 0 },
          { label: 'Revenue', value: '₹' + (s.revenue ?? 0) }
        ];

        // 🟢 Recent Orders
        this.orders = (res.recentOrders || []).map(o => ({
          buyer: o.buyerName,
          product: o.itemsSummary || '',
          quantity: o.quantity || '',
          amount: o.totalAmount || 0,
          status: o.status || 'New',
          orderId: o.orderId
        }));

        // 🟢 Top Products
        this.products = (res.topProducts || []).map(p => {
          let img = p.primaryImage || '';

          // Remove duplicate slashes
          img = img.replace(/\/{2,}/g, '/');

          // Build full URL only once
          const fullImageUrl = img.startsWith('/')
            ? `${environment.imgUrl}${img}`
            : `${environment.imgUrl}/${img}`;

          return {
            productId: p.productId,
            productName: p.productName,
            pricePerGram: p.pricePerGram,
            image: fullImageUrl || 'assets/Image/no-image.png'
          };
        });


        // 🟢 Notifications
        this.unreadNotifications = res.unreadNotifications || 0;
        this.unreadCount = this.unreadNotifications;

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Dashboard API failed:', err);
        this.setDemoData();
      }
    });
  }

  private setDemoData() {
    this.products = [
      { productId: 101, productName: 'Gold Ring', pricePerGram: 5800, image: 'assets/Image/goldring.png' },
      { productId: 102, productName: 'Silver Chain', pricePerGram: 90, image: 'assets/Image/silverchain.png' }
    ];
    this.orders = [
      { buyer: 'Raj Jewellers', product: 'Gold Ring', quantity: 2, amount: 12000, status: 'Pending' }
    ];
    this.summary = [
      { label: 'New Orders', value: 0 },
      { label: 'Accepted', value: 0 },
      { label: 'Shipped', value: 0 },
      { label: 'Revenue', value: '₹0' }
    ];
    this.loading = false;
  }

  addProduct() {
    this.router.navigate(['/seller-add-product']);
  }

  viewProduct(ProductId: any): void {
    this.router.navigate(['/seller-product', ProductId]);
  }

  notifications = [
    {
      icon: 'bi-bag-check text-success',
      message: 'Your order #1023 has been accepted by Anand Jewellers.',
      time: '2 hours ago',
      read: false
    },
    {
      icon: 'bi-box-seam text-warning',
      message: 'New product "22K Gold Chain" was approved.',
      time: 'Yesterday',
      read: false
    },
    {
      icon: 'bi-currency-rupee text-gold',
      message: 'Payment received for order #1021.',
      time: '2 days ago',
      read: true
    }
  ];

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAllRead() {
    this.notifications.forEach(n => n.read = true);
    this.unreadCount = 0;
  }
}
