import { Component, OnInit, HostListener } from '@angular/core';
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
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.observeScroll();
  }

  createForm(): void {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
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
        pincode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        terms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  // Smooth fade-in animation on scroll
  @HostListener('window:scroll', [])
  observeScroll() {
    const sections = document.querySelectorAll('.fade-section');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        section.classList.add('visible');
      }
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.spinner.show();

    const payload = { ...this.registrationForm.value };
    delete payload.confirmPassword;

    this.authService.register(payload).subscribe({
      next: (res) => {
        this.spinner.hide();
        this.loading = false;

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
      error: () => {
        this.spinner.hide();
        this.loading = false;
        this.snackBar.open('Server error. Try again later.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}
