import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminProductService {
  private baseUrl = environment.apiUrl + '/admin/products';

  constructor(private http: HttpClient) {}

  private headers() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  getProducts(status: number | null) {
    return this.http.get<any>(this.baseUrl, {
      params: status ? { status } : {},
      ...this.headers()
    });
  }

  approve(productId: number, adminId: number) {
    return this.http.post(
      `${this.baseUrl}/${productId}/approve`,
      null,
      { params: { adminId }, ...this.headers() }
    );
  }

  reject(productId: number, adminId: number, reason: string) {
    return this.http.post(
      `${this.baseUrl}/${productId}/reject`,
      reason,
      { params: { adminId }, ...this.headers() }
    );
  }

  updateStatus(productId: number, statusId: number, adminId: number) {
    return this.http.post(
      `${this.baseUrl}/${productId}/status`,
      null,
      { params: { adminId ,statusId}, ...this.headers() }
    );
  }
}
