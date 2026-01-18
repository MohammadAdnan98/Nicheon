import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerHomeService {

  private baseUrl = `${environment.apiUrl}/BuyerHome`;

  constructor(private http: HttpClient) {}

  /* =====================================================
     COMMON AUTH HEADER (SAME AS SELLER / ADMIN)
     ===================================================== */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /* =====================================================
     BUYER HOME DASHBOARD
     API: GET /BuyerHome/home
     ===================================================== */
  getBuyerHome(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString());

    return this.http.get<any>(
      `${this.baseUrl}/home`,
      { headers, params }
    );
  }

  /* =====================================================
     SEARCH PRODUCTS
     API: GET /BuyerHome/search
     ===================================================== */
  searchProducts(
    searchText: string,
    page: number,
    pageSize: number,
    sort: string = 'relevance'
  ): Observable<any> {

    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('q', searchText)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sort', sort);

    return this.http.get<any>(
      `${this.baseUrl}/search`,
      { headers, params }
    );
  }

  /* =====================================================
     LOG PRODUCT VIEW
     API: POST /BuyerHome/log-view/{productId}
     ===================================================== */
  logProductView(userId: number, productId: number): Observable<any> {
    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString());

    return this.http.post<any>(
      `${this.baseUrl}/log-view/${productId}`,
      {},
      { headers, params }
    );
  }

  /* =====================================================
     TRENDING PRODUCTS
     API: GET /BuyerHome/trending
     ===================================================== */
  getTrendingProducts(days: number = 14, limit: number = 12): Observable<any> {
    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('days', days.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(
      `${this.baseUrl}/trending`,
      { headers, params }
    );
  }

  /* =====================================================
     RECOMMENDATIONS
     API: GET /BuyerHome/recommendations
     ===================================================== */
  getRecommendations(userId: number, limit: number = 12): Observable<any> {
    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(
      `${this.baseUrl}/recommendations`,
      { headers, params }
    );
  }

  /* =====================================================
     TOP CATEGORIES
     API: GET /BuyerHome/top-categories
     ===================================================== */
  getTopCategories(
    userId: number,
    limit: number = 8,
    days: number = 30
  ): Observable<any> {

    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('limit', limit.toString())
      .set('days', days.toString());

    return this.http.get<any>(
      `${this.baseUrl}/top-categories`,
      { headers, params }
    );
  }

  /* =====================================================
     RECORD SEARCH TERM
     API: POST /BuyerHome/record-search
     ===================================================== */
  recordSearchTerm(userId: number, searchTerm: string): Observable<any> {
    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString());

    return this.http.post<any>(
      `${this.baseUrl}/record-search`,
      JSON.stringify(searchTerm),
      { headers, params }
    );
  }

  /* =====================================================
     TOP SEARCHES
     API: GET /BuyerHome/top-searches
     ===================================================== */
  getTopSearches(days: number = 30, limit: number = 10): Observable<any> {
    const headers = this.getAuthHeaders();

    const params = new HttpParams()
      .set('days', days.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(
      `${this.baseUrl}/top-searches`,
      { headers, params }
    );
  }

  /* =====================================================
     BANNERS
     API: GET /BuyerHome/banners
     ===================================================== */
  getBanners(): Observable<any> {
    const headers = this.getAuthHeaders();

    return this.http.get<any>(
      `${this.baseUrl}/banners`,
      { headers }
    );
  }
}
