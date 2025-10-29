import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // ✅ we are now using CSS
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userRole: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userRole = params['role'] || '';
    });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    debugger;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.spinner.show();

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.spinner.hide();

        debugger;

        if (response?.user?.token) {
          localStorage.setItem('token', response.user.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          this.snackBar.open('Login successful!', 'OK', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });

          // const role = response.user.role?.toLowerCase();
          // if (role === 'seller' || role === 'manufacturer' || role === 'wholesaler') {
            this.router.navigate(['/seller-dashboard']);
          // } else {
          //   this.router.navigate(['/buyer/dashboard']);
          // }
        } else {
          this.snackBar.open(response?.message || 'Invalid login', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.snackBar.open('Login failed. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  navigate(): void {
    this.router.navigate(['/auth/registration'], {
      queryParams: { role: this.userRole },
    });
  }

  navigatetoForgotPage(): void {
    this.router.navigate(['/auth/forgot']);
  }
}
