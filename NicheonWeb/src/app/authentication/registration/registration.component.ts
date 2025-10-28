import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  isSeller: boolean = false;
  productslist: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
        panno: ['', Validators.required],

        // Seller fields
        businessType: [''],
        businessName: [''],
        gstin: [''],
        shopno: [''],
        buildingName: [''],
        landmark: [''],
        address: [''],
        city: [''],
        state: [''],
        pincode: [''],
        kycDocs: [null],

        // Buyer fields
        Exprience: [''],
        Capacity: [''],

        terms: [false, Validators.requiredTrue],
        subscribe: [false],
      },
      { validators: this.passwordMatchValidator }
    );

    // this.Getproductlist();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onRoleChange() {
    const role = this.registrationForm.get('role')?.value;
    this.isSeller = role === 'seller';

    if (this.isSeller) {
      this.registrationForm
        .get('businessName')
        ?.setValidators([Validators.required]);
    } else {
      this.registrationForm.get('businessName')?.clearValidators();
    }

    this.registrationForm.get('businessName')?.updateValueAndValidity();
  }

  onSubmit(): void {
    debugger;
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

      const isSeller = formData.role.toLowerCase() === 'seller';

      const payload = {
        fullName: formData.fullName,
        email: formData.email || null,
        mobile: formData.mobile,
        password: formData.password,
        role: isSeller ? 'Seller' : 'Buyer',
        panNo: formData.panno || null,
        sellerTypeId: isSeller
          ? formData.businessType === 'company'
            ? 2
            : 1
          : 0, // Assuming 1=localShop, 2=company
        gstin: isSeller ? formData.gstin || null : null,
        businessName: isSeller ? formData.businessName || null : null,
        shopNo: isSeller ? formData.shopno || null : null,
        buildingName: isSeller ? formData.buildingName || null : null,
        landmark: isSeller ? formData.landmark || null : null,
        address: formData.address || null,
        city: isSeller ? formData.city || null : null,
        state: isSeller ? formData.state || null : null,
        pincode: isSeller ? formData.pincode || null : null,
        exprience: !isSeller ? Number(formData.Exprience || 0) : 0,
        capacity: !isSeller ? Number(formData.Capacity || 0) : 0,
      };

      this.authService.register(payload).subscribe({
        next: (res: any) => {
          debugger;
          if (res.message === 'User registered successfully.') {
            this.snackBar.open('Registration successful!', 'Close', {
              duration:3000,
              panelClass: ['snackbar-success'],
            });
            this.registrationForm.reset();
            this.router.navigate(['/otp-verification']);

            console.log(res);
          } else if (res.message === 'User already exists.') {
            this.snackBar.open('User already exists!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          }
          else
          {
            this.snackBar.open('Registration failed. Try again!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (err) => {
          this.snackBar.open('Registration failed. Try again!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
          console.error(err);
        },
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registrationForm.patchValue({ kycDocs: file });
    }
  }

  // Getproductlist() {
  //   this.authService.getProducts().subscribe({
  //     next: (data) => {
  //       this.productslist = data;
  //       console.log('Products fetched successfully:', this.productslist);
  //     },
  //     error: (err) => {
  //       console.error('API Error:', err);
  //     },
  //   });
  // }
}
