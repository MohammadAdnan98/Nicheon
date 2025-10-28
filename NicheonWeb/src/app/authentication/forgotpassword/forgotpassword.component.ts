import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent 
{

   forgotForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group(
      {
        mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        otp: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  sendOTP() {
    const mobile = this.forgotForm.get('mobile')?.value;
    if (mobile) {
      console.log('Sending OTP to:', mobile);
      // Implement OTP send logic
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.valid) {
      const payload = this.forgotForm.value;
      console.log('Resetting password with:', payload);
      // Implement password reset logic
    }
  }

}
