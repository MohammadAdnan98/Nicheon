import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/Services/ProfileService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profil-edite',
  templateUrl: './profil-edite.component.html',
  styleUrls: ['./profil-edite.component.css']
})
export class ProfilEditeComponent implements OnInit {

  editForm!: FormGroup;
  loading = false;
  userData: any = {};
  businessId = 0;
  selectedLogoFile: File | null = null;

  // ⭐ Toast
  toastMessage = "";
  toastType: 'success' | 'error' = 'success';
  showToastBox = false;

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

  // ⭐ Toast Method
  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToastBox = true;

    setTimeout(() => {
      this.showToastBox = false;
    }, 3000);
  }

  // ⭐ Load API Profile
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
          profileImage: `${environment.imgUrl}${res.profileLogo}` || 'assets/Image/profile-logo.jpg'
        };
        this.initForm();
      },
      error: () => {
        this.loadFromLocal();
        this.initForm();
      }
    });
  }

  loadFromLocal() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userData = JSON.parse(stored);
    }
  }

  // ⭐ Initialize Form
  initForm(): void {
    this.editForm = this.fb.group({
      fullName: [this.userData.fullName, Validators.required],
      primaryEmail: [this.userData.primaryEmail, Validators.required],
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

  // ⭐ File Select (Preview + Store File)
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedLogoFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.editForm.patchValue({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // ⭐ Save Profile With Toasts
  saveProfile(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const formValues = this.editForm.value;

    const formData = new FormData();

    formData.append("businessId", this.businessId.toString());
    formData.append("businessName", formValues.businessName);
    formData.append("businessType", formValues.businessType);
    formData.append("gstNumber", formValues.gstNumber || "");
    formData.append("pan", formValues.pan || "");
    formData.append("fullName", formValues.fullName);
    formData.append("contactPhone", formValues.primaryPhone);
    formData.append("businessEmail", formValues.primaryEmail);
    formData.append("address", formValues.address);
    formData.append("landmark", formValues.landmark);
    formData.append("city", formValues.city);
    formData.append("state", formValues.state);
    formData.append("country", formValues.country);
    formData.append("pincode", formValues.pincode);

    if (this.selectedLogoFile) {
      formData.append("logoFile", this.selectedLogoFile);
    }

    this.profileService.updateProfile(formData).subscribe({
      next: () => {
        this.loading = false;

        this.showToast("Profile updated successfully!", "success");

        setTimeout(() => {
         this.router.navigate(['/seller-profile']);
        }, 1500);
      },
      error: (error) => {
        console.error("Error updating profile", error);
        this.loading = false;

        this.showToast("Failed to update profile!", "error");
      }
    });
  }

  cancelEdit() {
    this.router.navigate(['/seller-profile']);
  }

}
