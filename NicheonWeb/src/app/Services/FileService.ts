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

    // Upload new images (1–6 files)
  uploadProductImages(businessId: number, productId: number, formData: FormData): Observable<any> {
    debugger;
    const headers = this.getAuthHeaders(); // browser sets multipart boundary automatically
    return this.http.post(
      `${this.base}/UploadProductImages/${businessId}/${productId}`,
      formData,
      { headers }
    );
  }


 // Load product images
  getProductImages(productId: number): Observable<any> {
    return this.http.get(`${this.base}/GetProductImages/${productId}`);
  }

  // Delete a single image
  deleteImage(imageId: number): Observable<any> {
    return this.http.delete(`${this.base}/DeleteProductImage/${imageId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
