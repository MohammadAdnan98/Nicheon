import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  getSellerOrders(): Observable<any[]> {
    return of([
      {
        orderId: 'ORD-1024',
        buyerName: 'Diamond Express Traders',
        date: '2025-11-04',
        status: 'Pending',
        items: [
          { name: '18k Gold Chain', image: 'assets/Image/gold-dust.jpg' },
          { name: 'Gold Bangles', image: 'assets/Image/gold-scrap.jpg' }
        ]
      },
      {
        orderId: 'ORD-1025',
        buyerName: 'Raj Jewels',
        date: '2025-11-03',
        status: 'Accepted',
        items: [
          { name: 'Silver Polishing Dust', image: 'assets/Image/silver-dust.jpg' }
        ]
      }
    ]);
  }
}
