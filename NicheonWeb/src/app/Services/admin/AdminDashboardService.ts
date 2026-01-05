import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {

  private api = '/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(this.api);
  }
}
