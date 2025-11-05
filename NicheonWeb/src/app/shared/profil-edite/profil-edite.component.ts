import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/Services/SellerService';

@Component({
  selector: 'app-profil-edite',
  templateUrl: './profil-edite.component.html',
  styleUrls: ['./profil-edite.component.css']
})
export class ProfilEditeComponent {

editForm!: FormGroup;
  loading = false;
  userData: any = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userData = JSON.parse(stored);
    }

    this.initForm();
  }

  initForm(): void {
   this.editForm = this.fb.group({
  fullName: [this.userData.fullName, Validators.required],
  primaryEmail: [this.userData.primaryEmail, [Validators.required, Validators.email]],
  primaryPhone: [this.userData.primaryPhone, Validators.required],
  businessName: [this.userData.businessName, Validators.required],
  businessType: [this.userData.businessType, Validators.required],
  gstNumber: [this.userData.gstNumber],
  pan: [this.userData.pan],

  address: [this.userData.address],
  landmark: [this.userData.landmark],
  city: [this.userData.city],
  state: [this.userData.state],
  country: [this.userData.country],
  pincode: [this.userData.pincode],

  profileImage: [this.userData.profileImage]
});

  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = this.editForm.value;

    // Future: call actual API
    this.sellerService.updateSellerProfile(formData).subscribe({
      next: () => {
        localStorage.setItem('user', JSON.stringify(formData));
        alert('Profile updated successfully!');
        this.loading = false;
        this.router.navigate(['/seller-profile']);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        alert('Failed to update profile.');
        this.loading = false;
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/seller-profile']);
  }

}
