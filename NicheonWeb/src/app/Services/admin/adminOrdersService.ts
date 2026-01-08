import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
export class AdminOrdersService {
  private baseUrl = environment.apiUrl + '/admin/orders';

  constructor(private http: HttpClient) {}

  private headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  }

  getOrders(status?: string) {
    const params: any = {};
    if (status && status !== 'ALL') {
      params.status = status;
    }

    return this.http.get<any>(this.baseUrl, {
      params,
      headers: this.headers()
    });
  }

  updateStatus(orderId: number, status: string, adminId: number) {
    return this.http.post(
      `${this.baseUrl}/${orderId}/status`,
      {},
      {
        params: { status, adminId },
        headers: this.headers() // ✅ FIXED
      }
    );
  }
}


