import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  otpDigits: string[] = ['', '', '', '', '', ''];
  resendTimer: number = 30;
  intervalId: any;
  message: string = '';
  messageType: 'success' | 'error' = 'success';
  showSuccessScreen: boolean = false;

  constructor(private router: Router,private snackBar: MatSnackBar,) {}

  ngOnInit() {
    this.startResendCountdown();
  }

  moveNext(event: any, nextIndex: number) {
    const input = event.target;
    if (input.value.length === 1) {
      const next = input.parentElement.children[nextIndex];
      if (next) next.focus();
    }
  }

  verifyOtp() {
    debugger;
    const otp = this.otpDigits.join('');
    if (otp.length < 6) {
      // this.showMessage('Please enter the full 6-digit OTP!', 'error');
       this.snackBar.open('Please enter the full 6-digit OTP!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
      return;
    }

    if (otp === '123456') {
      this.showSuccessScreen = true;
      // this.showMessage('OTP Verified! Redirecting...', 'success');

      const userRole = 'seller'; // or 'buyer'
      
      debugger;
      setTimeout(() => {
        if (userRole === 'seller') {
          this.router.navigate(['/seller-dashboard']);
        } else if (userRole === 'buyer') {
          this.router.navigate(['/buyer-dashboard']);
        }
      }, 2000);
    } else {
      this.showMessage('Invalid OTP. Redirecting...', 'error');
      this.snackBar.open('Invalid OTP Please try again!', 'Close', {
              duration:3000,
              panelClass: ['snackbar-error'],
            });
      // setTimeout(() => {
      //   this.router.navigate(['/invalid-otp']);
      // }, 1500);
    }
  }

  resendOtp() {
    this.otpDigits = ['', '', '', '', '', ''];
    this.resendTimer = 30;
    this.startResendCountdown();
    // this.showMessage('OTP has been resent!', 'success');
    this.snackBar.open('OTP has been resent!', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }

  startResendCountdown() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  showMessage(msg: string, type: 'success' | 'error') {
    debugger;
    this.message = msg;
    this.messageType = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
