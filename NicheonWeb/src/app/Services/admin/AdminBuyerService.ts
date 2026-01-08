import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminBuyerService {

  private baseUrl = environment.apiUrl + '/admin/buyers';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getBuyers(status: number) {
    return this.http.get<any>(
      `${this.baseUrl}?profileStatus=${status}`,
      { headers: this.getHeaders() }
    );
  }

  toggleBuyerStatus(userId: number, statusId: number, adminId: number) {
    return this.http.post(
      `${this.baseUrl}/${userId}/status?statusId=${statusId}&adminId=${adminId}`,
      {},
      { headers: this.getHeaders() }
    );
  }
}
