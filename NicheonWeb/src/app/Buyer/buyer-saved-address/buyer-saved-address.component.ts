import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-saved-address',
  templateUrl: './buyer-saved-address.component.html',
  styleUrls: ['./buyer-saved-address.component.css']
})
export class BuyerSavedAddressComponent {

  // =========================
  // DUMMY ADDRESSES (PHASE 1)
  // =========================
  addresses = [
    {
      id: 1,
      name: 'Saiyed Mohammad Adnan',
      phone: '9876543210',
      line1: 'Fourth Floor, C-325/A, Ajns Apartment',
      line2: 'Shaheen Bagh, Jamia Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110025',
      country: 'India',
      isDefault: true
    },
    {
      id: 2,
      name: 'Office Address',
      phone: '9876500000',
      line1: 'Tech Park, Block B',
      line2: 'Sector 62',
      city: 'Noida',
      state: 'UP',
      pincode: '201309',
      country: 'India',
      isDefault: false
    }
  ];

  // =========================
  // MODAL STATE
  // =========================
  showAddressModal = false;
  showDeleteConfirm = false;
  isEditMode = false;

  selectedAddress: any = null;

  // =========================
  // FORM MODEL
  // =========================
  form: any = {};

  // =========================
  // ADD / EDIT
  // =========================
  openAddAddress(): void {
    this.isEditMode = false;
    this.form = {
      name: '',
      phone: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      isDefault: false
    };
    this.showAddressModal = true;
  }

  openEditAddress(address: any): void {
    this.isEditMode = true;
    this.selectedAddress = address;
    this.form = { ...address };
    this.showAddressModal = true;
  }

  saveAddress(): void {
    if (this.isEditMode) {
      Object.assign(this.selectedAddress, this.form);
    } else {
      this.form.id = Date.now();
      this.addresses.push(this.form);
    }

    if (this.form.isDefault) {
      this.setAsDefault(this.form);
    }

    this.closeModal();
  }

  closeModal(): void {
    this.showAddressModal = false;
    this.selectedAddress = null;
  }

  // =========================
  // DEFAULT
  // =========================
  setAsDefault(address: any): void {
    this.addresses.forEach(a => a.isDefault = false);
    address.isDefault = true;
  }

  // =========================
  // DELETE
  // =========================
  confirmDelete(address: any): void {
    this.selectedAddress = address;
    this.showDeleteConfirm = true;
  }

  deleteAddress(): void {
    this.addresses =
      this.addresses.filter(a => a !== this.selectedAddress);
    this.closeDelete();
  }

  closeDelete(): void {
    this.showDeleteConfirm = false;
    this.selectedAddress = null;
  }

  // =========================
  // PHASE 2 API READY
  // =========================
  /*
  loadAddresses() {
    this.addressService.getAddresses().subscribe(...)
  }

  saveAddressAPI() {}
  deleteAddressAPI() {}
  */
}
