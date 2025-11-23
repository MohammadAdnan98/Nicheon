import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
})
export class OtpVerificationComponent implements OnInit {
  @ViewChild('singleOtp') singleOtpRef!: ElementRef<HTMLInputElement>;

  otpValue = '';
  resendTimer = 30;
  intervalId: any;
  showSuccessScreen = false;
  email = '';

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // optional email query param
    this.email = this.route.snapshot.queryParamMap.get('email') || '';

    // start countdown
    this.startResendCountdown();

    // focus input after view loads
    setTimeout(() => {
      this.singleOtpRef?.nativeElement?.focus();
    }, 200);
  }

  // Clean input — allow only digits and up to 6 characters
  onSingleInput(e: Event) {
    const el = e.target as HTMLInputElement;
    let v = (el.value || '').replace(/\D/g, '');
    if (v.length > 6) v = v.slice(0, 6);
    this.otpValue = v;
    el.value = v;

    // auto-submit when 6 digits typed
    if (v.length === 6) {
      // small delay for UX
      setTimeout(() => this.onSubmit(), 120);
    }
  }

  // Paste support
  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text') || '';
    const digits = text.replace(/\D/g, '').slice(0, 6);
    this.otpValue = digits;
    if (this.singleOtpRef && this.singleOtpRef.nativeElement) {
      this.singleOtpRef.nativeElement.value = digits;
    }
    if (digits.length === 6) {
      setTimeout(() => this.onSubmit(), 120);
    }
  }

  // Submit to API
  onSubmit() {
    const otp = (this.otpValue || '').trim();
    if (otp.length !== 6) {
      this.snackBar.open('Please enter a 6-digit OTP', 'Close', { duration: 2500 });
      this.singleOtpRef?.nativeElement?.focus();
      return;
    }

    // show spinner if you use it
    this.spinner.show();

    this.authService.verifyOtp({ email: this.email, otp }).subscribe({
      next: (res: any) => {
        this.spinner.hide();
        const msg = (res && (res as any).message) ? (res as any).message : '';

        if (msg.toLowerCase().includes('success') || (res && (res as any).success)) {
          this.showSuccessScreen = true;
          this.snackBar.open('OTP verified!', 'Close', { duration: 1800 });
          setTimeout(() => this.router.navigate(['/auth/login']), 1500);
        } else {
          const text = msg || 'Invalid OTP. Please try again.';
          this.snackBar.open(text, 'Close', { duration: 2800 });
          this.clearInput();
        }
      },
      error: () => {
        this.spinner.hide();
        this.snackBar.open('Server error. Try again later.', 'Close', { duration: 2800 });
      }
    });
  }

  clearInput() {
    this.otpValue = '';
    if (this.singleOtpRef && this.singleOtpRef.nativeElement) {
      this.singleOtpRef.nativeElement.value = '';
      this.singleOtpRef.nativeElement.focus();
    }
  }

  // Resend OTP behavior
  resendOtp() {
    // reset value + timer
    this.clearInput();
    this.resendTimer = 30;
    this.startResendCountdown();

    // call your API to resend OTP if available (example):
    // this.authService.resendOtp({ email: this.email }).subscribe();

    this.snackBar.open('OTP resent', 'Close', { duration: 2000 });
  }

  startResendCountdown() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.resendTimer > 0) this.resendTimer--;
      else clearInterval(this.intervalId);
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
