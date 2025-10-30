import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit, OnDestroy {
  forgotForm!: FormGroup;
  submitted = false;

  // UI flow state
  showResetSection = false;
  otpSent = false;

  // timer
  resendTimer = 0;
  private timerRef: any;

  // keep email for step 2
  private requestedEmail = '';

  // subscription cleanup
  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /(^[6-9]\d{9}$)|(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)/
            ),
          ],
        ],
        otp: ['', [Validators.minLength(6), Validators.maxLength(6)]],
        newPassword: ['', [Validators.minLength(8), Validators.maxLength(16)]],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnDestroy(): void {
    if (this.timerRef) clearInterval(this.timerRef);
    this.subs.forEach(s => s.unsubscribe());
  }

  // showResetSection = false -> user clicks Send OTP
  sendOTP(): void {
    this.submitted = true;

    const emailControl = this.forgotForm.get('email');
    if (!emailControl || emailControl.invalid) {
      this.snackBar.open('Please enter a valid email or mobile number', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    const email = emailControl.value.trim();
    this.spinner.show();

    const sub = this.authService.forgotPassword(email).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        // expecting message like "Password reset OTP sent to your email."
        if (res?.message && res.message.toLowerCase().includes('otp')) {
          this.requestedEmail = email;
          this.showResetSection = true;
          this.otpSent = true;
          this.startResendTimer();
          this.snackBar.open('OTP sent. Check your email (or SMS).', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
        } else {
          this.snackBar.open(res?.message || 'Failed to send OTP', 'Close', {
            duration: 3500,
            panelClass: ['snackbar-error'],
          });
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.error(err);
        this.snackBar.open('Error sending OTP. Try again later.', 'Close', {
          duration: 3500,
          panelClass: ['snackbar-error'],
        });
      },
    });

    this.subs.push(sub);
  }

  // Reset password using previously submitted email + otp + newPassword
  onSubmit(): void {
    this.submitted = true;

    // If reset section is not visible, treat as sendOTP path (but normally user uses sendOTP button)
    if (!this.showResetSection) {
      this.sendOTP();
      return;
    }

    const otpControl = this.forgotForm.get('otp');
    const newPassControl = this.forgotForm.get('newPassword');

    if (!otpControl || !newPassControl || this.forgotForm.invalid) {
      this.snackBar.open('Please fix validation errors.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    const payloadEmail = this.requestedEmail || this.forgotForm.get('email')?.value;
    const otp = otpControl.value.trim();
    const newPassword = newPassControl.value;

    if (!payloadEmail) {
      this.snackBar.open('Email missing. Start by sending OTP first.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    this.spinner.show();
    const sub = this.authService.resetPassword(payloadEmail, newPassword, otp).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        if (res?.message && res.message.toLowerCase().includes('successful')) {
          this.snackBar.open('Password reset successful! Please login.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['auth/login']);
        } else {
          this.snackBar.open(res?.message || 'Password reset failed', 'Close', {
            duration: 3500,
            panelClass: ['snackbar-error'],
          });
        }
      },
      error: (err) => {
        this.spinner.hide();
        console.error(err);
        this.snackBar.open('Server error. Please try again later.', 'Close', {
          duration: 3500,
          panelClass: ['snackbar-error'],
        });
      },
    });

    this.subs.push(sub);
  }

  // simple password-match validator for form group
  private passwordMatchValidator(group: FormGroup) {
    const p1 = group.get('newPassword')?.value;
    const p2 = group.get('confirmPassword')?.value;
    return p1 === p2 ? null : { passwordMismatch: true };
  }

  // Resend timer (30s)
  private startResendTimer(): void {
    this.resendTimer = 30;
    if (this.timerRef) clearInterval(this.timerRef);
    this.timerRef = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        clearInterval(this.timerRef);
        this.otpSent = false;
      }
    }, 1000);
  }
}
