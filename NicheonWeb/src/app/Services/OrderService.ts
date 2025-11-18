import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}/SellerOrders`;

  constructor(private http: HttpClient) {}

  // 🔐 Auth Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 📌 1. GET seller orders
  getOrders(sellerBusinessId: number) {
    return this.http.get(
      `${this.apiUrl}/GetOrders/${sellerBusinessId}`,
      { headers: this.getHeaders() }
    );
  }

  // 📌 2. POST update status (Accept / Ship / Reject)
  updateStatus(orderId: number, status: string, notes?: string) {
    return this.http.post(
      `${this.apiUrl}/UpdateStatus`,
      { orderId, status, notes },
      { headers: this.getHeaders() }
    );
  }
}
