import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WaitlistService {
  private apiUrl = `${environment.apiUrl}/Waitlist`;

  constructor(private http: HttpClient) {}

  join(payload: any) {
    return this.http.post(`${this.apiUrl}/Join`, payload);
  }
}
