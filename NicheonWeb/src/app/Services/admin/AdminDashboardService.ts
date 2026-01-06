import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardResponse } from '../DashboardService';

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
    private apiUrl = `${environment.apiUrl}/admin/dashboard`; // ✅ correct property name
  
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
//    getDashboard(): Observable<any> {
//     return this.http.get<any>(this.apiUrl);
//   }


  getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`, {
      headers: this.getHeaders()
    });
  }
    
}
