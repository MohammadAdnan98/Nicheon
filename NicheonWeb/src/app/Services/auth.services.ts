import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) {}

  // 🔐 Login Method
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 📝 Register Method
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Register`, userData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // ✅ Verify OTP Method
  verifyOtp(data: { email: string; otp: string }) {
    return this.http.post(`${this.apiUrl}/VerifyOtp`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 🔁 Forgot Password (Send OTP)
  forgotPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/ForgotPassword`,
      { email },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  // 🔄 Reset Password
  resetPassword(
    email: string,
    newPassword: string,
    otp: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/ResetPassword`,
      { email, newPassword, otp },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // ✅ Check Login Status
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
