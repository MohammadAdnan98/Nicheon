import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/SellerProfile`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getProfile(businessId: number) {
    return this.http.get(`${this.apiUrl}/GetByBusinessId/${businessId}`, { headers: this.getHeaders() });
  }

  updateProfile(formData: FormData) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
        // ❌ Do NOT set Content-Type here
    });
    return this.http.post(`${this.apiUrl}/UpdateProfile`, formData, { headers });
}


}
