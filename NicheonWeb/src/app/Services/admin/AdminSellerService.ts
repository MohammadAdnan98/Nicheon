import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminSellerService {
  private baseUrl = environment.apiUrl + '/admin/sellers';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // GET sellers by status
  getSellers(status: number) {
    return this.http.get<any>(this.baseUrl, {
      headers: this.getHeaders(),
      params: { status }
    });
  }

  // APPROVE seller
  approveSeller(userId: number, adminId: number) {
    return this.http.post(
      `${this.baseUrl}/${userId}/approve`,
      {},
      {
        headers: this.getHeaders(),
        params: { adminId }
      }
    );
  }

  // CHANGE seller status
  changeStatus(userId: number, statusId: number, adminId: number) {
    return this.http.post(
      `${this.baseUrl}/${userId}/status`,
      {},
      {
        headers: this.getHeaders(),
        params: { statusId, adminId }
      }
    );
  }
}
