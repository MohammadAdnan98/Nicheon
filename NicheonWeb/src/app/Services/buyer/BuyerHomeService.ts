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

  /* ======================================================
     AUTH HEADER (SAME AS SELLER / ADMIN)
     ====================================================== */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /* ======================================================
     BUYER HOME PAGE DATA
     API: GET /api/BuyerHome/home?UserId=1
     RESPONSE:
     - metals
     - categories
     - topSellers
     - featured
     - recentlyViewed
     ====================================================== */
  getBuyerHome(userId: number): Observable<any> {
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('UserId', userId.toString());

    return this.http.get<any>(
      `${this.baseUrl}/home`,
      { headers, params }
    );
  }

  // ==============================
  // SEARCH PRODUCTS (HOME + SEARCH PAGE)
  // ==============================
  // GET: /api/BuyerHome/search
  searchProducts(filters: {
    q?: string;
    metalIds?: string;
    styleIds?: string;
    karats?: string;
    minPrice?: number;
    maxPrice?: number;
    isHallmarked?: number;
    sort?: string;
    page?: number;
    pageSize?: number;
  }): Observable<any> {

    let params = new HttpParams();

    Object.keys(filters).forEach((key: string) => {
      const value = (filters as any)[key];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<any>(
      `${this.baseUrl}/search`,
      {
        headers: this.getHeaders(),
        params
      }
    );
  }

  /* ======================================================
     LOG PRODUCT VIEW
     API: POST /api/BuyerHome/log-view/{productId}
     ====================================================== */
  logProductView(userId: number, productId: number): Observable<any> {
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString());

    return this.http.post<any>(
      `${this.baseUrl}/log-view/${productId}`,
      {},
      { headers, params }
    );
  }

  /* ======================================================
     TRENDING PRODUCTS (OPTIONAL SECTION)
     API: GET /api/BuyerHome/trending
     ====================================================== */
  getTrendingProducts(days: number = 14, limit: number = 12): Observable<any> {
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('days', days.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(
      `${this.baseUrl}/trending`,
      { headers, params }
    );
  }

  /* ======================================================
     RECOMMENDATIONS (OPTIONAL SECTION)
     API: GET /api/BuyerHome/recommendations
     ====================================================== */
  getRecommendations(userId: number, limit: number = 12): Observable<any> {
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(
      `${this.baseUrl}/recommendations`,
      { headers, params }
    );
  }

  /* ======================================================
     TOP CATEGORIES (OPTIONAL SECTION)
     API: GET /api/BuyerHome/top-categories
     ====================================================== */
  getTopCategories(
    userId: number,
    limit: number = 8,
    days: number = 30
  ): Observable<any> {

    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('limit', limit.toString())
      .set('days', days.toString());

    return this.http.get<any>(
      `${this.baseUrl}/top-categories`,
      { headers, params }
    );
  }

  /* ======================================================
     RECORD SEARCH TERM
     API: POST /api/BuyerHome/record-search
     ====================================================== */
  recordSearchTerm(userId: number, searchText: string): Observable<any> {
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('userId', userId.toString());

    return this.http.post<any>(
      `${this.baseUrl}/record-search`,
      JSON.stringify(searchText),
      { headers, params }
    );
  }

  /* ======================================================
     BANNERS (OPTIONAL – FUTURE)
     API: GET /api/BuyerHome/banners
     ====================================================== */
  getBanners(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(
      `${this.baseUrl}/banners`,
      { headers }
    );
  }

   // ==============================
  // TOP SEARCHES (TRENDING KEYWORDS)
  // ==============================
  // GET: /api/BuyerHome/top-searches
  getTopSearches(days: number = 30, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('days', days.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(
      `${this.baseUrl}/top-searches`,
      {
        headers: this.getHeaders(),
        params
      }
    );
  }
}
