import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-security',
  templateUrl: './buyer-security.component.html',
  styleUrls: ['./buyer-security.component.css']
})
export class BuyerSecurityComponent {

  // =========================
  // USER DATA (PHASE 1)
  // =========================
  user = {
    email: 'adnan@example.com',
    phone: '+91 98765 43210',
    passwordUpdated: '2 months ago',
    twoFactorEnabled: false
  };

  // =========================
  // ACTIVE SESSIONS
  // =========================
  sessions = [
    {
      device: 'Chrome on Windows',
      location: 'New Delhi, India',
      lastActive: 'Now',
      current: true
    },
    {
      device: 'Android App',
      location: 'Delhi, India',
      lastActive: '2 days ago',
      current: false
    }
  ];

  // =========================
  // MODAL STATE
  // =========================
  showModal = false;
  modalTitle = '';
  modalMessage = '';
  modalAction: (() => void) | null = null;

  // =========================
  // ACTIONS
  // =========================
  openChangeEmail() {
    this.openModal(
      'Change Email',
      'Are you sure you want to change your email address?'
    );
  }

  openChangePhone() {
    this.openModal(
      'Change Phone Number',
      'OTP will be sent to verify the new number.'
    );
  }

  openChangePassword() {
    this.openModal(
      'Change Password',
      'You will be logged out after password change.'
    );
  }

  toggle2FA() {
    console.log('2FA updated:', this.user.twoFactorEnabled);
  }

  logoutSession(session: any) {
    this.openModal(
      'Log out session',
      `Log out from ${session.device}?`,
      () => {
        this.sessions = this.sessions.filter(s => s !== session);
      }
    );
  }

  logoutAll() {
    this.openModal(
      'Log out from all devices',
      'This will log you out everywhere.',
      () => {
        alert('Logged out from all devices');
      }
    );
  }

  // =========================
  // MODAL HANDLING
  // =========================
  openModal(title: string, message: string, action?: () => void) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.modalAction = action || null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.modalAction = null;
  }

  confirmModal() {
    if (this.modalAction) this.modalAction();
    this.closeModal();
  }
}
