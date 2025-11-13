import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private base = `${environment.apiUrl}/File`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  uploadProductImages(businessId: number, productId: number, formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders(); // DO NOT set Content-Type, browser will set multipart boundary
    return this.http.post(`${this.base}/UploadProductImages/${businessId}/${productId}`, formData, { headers });
  }

  getProductImages(productId: number): Observable<any> {
    return this.http.get(`${this.base}/GetProductImages/${productId}`);
  }

  deleteImage(imageId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.base}/DeleteProductImage/${imageId}`, { headers });
  }
}
