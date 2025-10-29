import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: [
          '',
          [Validators.required, Validators.minLength(8), Validators.maxLength(16)],
        ],
        confirmPassword: ['', Validators.required],
        role: ['Seller', Validators.required],
        businessName: ['', Validators.required],
        businessType: ['', Validators.required],
        gstNumber: [''],
        address: ['', Validators.required],
        landmark: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['India'],
        pincode: [
          '',
          [Validators.required, Validators.minLength(5), Validators.maxLength(10)],
        ],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const payload = { ...this.registrationForm.value };
    delete payload.confirmPassword; // not needed by API

    this.spinner.show();

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.spinner.hide();
        if (res.message?.includes('successful')) {
          this.snackBar.open('Registration successful! Verify OTP.', 'OK', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['auth/otp-verification'], {
            queryParams: { email: payload.email },
          });
        } else {
          this.snackBar.open(res.message || 'Registration failed!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.snackBar.open('Server error. Try again later.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
