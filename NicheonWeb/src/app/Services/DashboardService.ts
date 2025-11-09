import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// ✅ Interface for strong typing
export interface DashboardResponse {
  sellerInfo: any;
  summary: any;
  recentOrders: any[];
  topProducts: any[];
  unreadNotifications: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiUrl}/Dashboard`; // ✅ correct property name

  constructor(private http: HttpClient) {}

  // ✅ Helper: Get auth headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ✅ Corrected API call
  getDashboard(businessId: number): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.apiUrl}/${businessId}`, {
      headers: this.getHeaders()
    });
  }
}
