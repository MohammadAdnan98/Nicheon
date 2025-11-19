import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/ProfileService';

@Component({
  selector: 'app-profil-edite',
  templateUrl: './profil-edite.component.html',
  styleUrls: ['./profil-edite.component.css']
})
export class ProfilEditeComponent implements OnInit {

  editForm!: FormGroup;
  loading = false;
  userData: any = {};   // user data loaded from API or localStorage
  businessId = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.businessId = parsed?.businessId || parsed?.BusinessId || 0;
    }

    if (this.businessId > 0) {
      this.loadProfile(this.businessId);
    } else {
      this.loadFromLocal();
      this.initForm();
    }
  }

  // ⭐ Load profile from API
  loadProfile(businessId: number) {
    this.profileService.getProfile(businessId).subscribe({
      next: (res: any) => {
        this.userData = {
          businessId: res.businessId,
          fullName: res.fullName || res.contactPerson,
          primaryEmail: res.businessEmail,
          primaryPhone: res.contactPhone,
          businessName: res.businessName,
          businessType: res.businessType,
          gstNumber: res.gstNumber,
          pan: res.pan,
          address: res.address,
          landmark: res.landmark,
          city: res.city,
          state: res.state,
          country: res.country,
          pincode: res.pincode,
          profileImage: 'assets/Image/profile-logo.jpg' // static for now
        };

        this.initForm();
      },
      error: (err) => {
        console.error("Error loading profile:", err);
        this.loadFromLocal();
        this.initForm();
      }
    });
  }

  // ⭐ Fallback: Load from local storage if no API profile found
  loadFromLocal() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userData = JSON.parse(stored);
      this.userData.profileImage = this.userData.profileImage || 'assets/Image/profile-logo.jpg';
    }
  }

  // ⭐ Initialize Reactive Form
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

  // ⭐ Image Upload → Base64 Preview
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

  // ⭐ Save Profile (Call Real API)
  saveProfile(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formData = this.editForm.value;

    const payload = {
      businessId: this.userData.businessId,
      businessName: formData.businessName,
      businessType: formData.businessType,
      gstNumber: formData.gstNumber,
      pan: formData.pan,
      contactPerson: formData.fullName,
      contactPhone: formData.primaryPhone,
      businessEmail: formData.primaryEmail,
      address: formData.address,
      landmark: formData.landmark,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode
    };

    this.profileService.updateProfile(payload).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.loading = false;

        // Refresh profile page after saving
        this.router.navigate(['/seller-profile']);
      },
      error: (error) => {
        console.error('Failed to update profile', error);
        this.loading = false;
        alert('Failed to update profile.');
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/seller-profile']);
  }

}
