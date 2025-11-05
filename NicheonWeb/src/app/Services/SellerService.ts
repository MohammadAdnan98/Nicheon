import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) {}

  updateSellerProfile(data: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put(`${environment.apiUrl}/Seller/update-profile`, data, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    })
  });
}

}
