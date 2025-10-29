import { Component, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
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
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  otpDigits: string[] = ['', '', '', '', '', ''];
  resendTimer: number = 30;
  intervalId: any;
  showSuccessScreen: boolean = false;
  email: string = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.startResendCountdown();
  }

  /** ✅ Handle single input entry safely */
  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const parent = input.parentElement;
    if (!parent) return;

    const value = input.value.replace(/\D/g, ''); // Allow only digits

    // store first char only
    this.otpDigits[index] = value ? value[0] : '';
    input.value = this.otpDigits[index];

    // move to next input if typed
    if (value && index < this.otpDigits.length - 1) {
      const nextInput = parent.children[index + 1] as HTMLInputElement | undefined;
      nextInput?.focus();
    }
  }

  /** ✅ Handle backspace navigation */
  onKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const parent = input.parentElement;
    if (!parent) return;

    if (event.key === 'Backspace') {
      if (input.value === '') {
        if (index > 0) {
          const prevInput = parent.children[index - 1] as HTMLInputElement | undefined;
          prevInput?.focus();
          this.otpDigits[index - 1] = '';
          if (prevInput) prevInput.value = '';
        }
      } else {
        input.value = '';
        this.otpDigits[index] = '';
      }
      event.preventDefault();
    }
  }

  /** ✅ Handle paste entire OTP (like Gmail, Paytm) */
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');

    digits.forEach((num, i) => {
      this.otpDigits[i] = num;
      const input = this.otpInputs.get(i)?.nativeElement;
      if (input) input.value = num;
    });
  }

  /** ✅ Verify OTP via backend API */
  verifyOtp(): void {
    const otp = this.otpDigits.join('').trim();

    if (otp.length !== 6) {
      this.snackBar.open('Please enter a valid 6-digit OTP!', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    this.spinner.show();

    this.authService.verifyOtp({ email: this.email, otp }).subscribe({
      next: (res: any) => {
        this.spinner.hide();

        if (res.message?.includes('successfully')) {
          this.showSuccessScreen = true;
          this.snackBar.open('OTP verified successfully!', 'Close', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });

          setTimeout(() => this.router.navigate(['auth/login']), 2000);
        } else {
          this.snackBar.open(res.message || 'Invalid OTP. Try again.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      },
      error: () => {
        this.spinner.hide();
        this.snackBar.open('Server error. Please try again later.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  /** ✅ Resend OTP Timer */
  resendOtp(): void {
    this.otpDigits = ['', '', '', '', '', ''];
    this.resendTimer = 30;
    this.startResendCountdown();
    this.snackBar.open('OTP has been resent!', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }

  /** ✅ Countdown logic */
  startResendCountdown(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.resendTimer > 0) this.resendTimer--;
      else clearInterval(this.intervalId);
    }, 1000);
  }
}
