import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient) {}

  // ✅ Helper: Get auth headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🧾 1️⃣ Get all products for the seller
  getSellerProducts(businessId: number, page = 1, pageSize = 20): Observable<any> {
  return this.http.get(`${this.apiUrl}/list?businessId=${businessId}&page=${page}&pageSize=${pageSize}`, {
    headers: this.getHeaders()
  });
}


  // 🔍 2️⃣ Get product by ID
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`, {
      headers: this.getHeaders()
    });
  }

  // ➕ 3️⃣ Create new product
  createProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, productData, {
      headers: this.getHeaders()
    });
  }

  // ================================
  //  UPDATE PRODUCT (NEW API ROUTE)
  // ================================
  updateProduct(productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateProduct`, productData, {
      headers: this.getHeaders()
    });
  }

  // ================================
  //  DELETE PRODUCT (NEW API ROUTE)
  // ================================
  deleteProduct(productId: number, businessId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/DeleteProduct/${productId}/${businessId}`,
      { headers: this.getHeaders() }
    );
  }

  // ================================
  //  ADD IMAGE (if needed in future)
  // ================================
  addProductImage(data: {
    productId: number;
    businessId: number;
    imageUrl: string;
    altText?: string;
    isPrimary: boolean;
    sortOrder: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-image`, data, {
      headers: this.getHeaders()
    });
  }

  // ================================
  //  DELETE IMAGE (OLD API - NOT USED NOW)
  // ================================
  deleteProductImage(imageId: number, businessId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/delete-image/${imageId}/${businessId}`,
      { headers: this.getHeaders() }
    );
  }
}
