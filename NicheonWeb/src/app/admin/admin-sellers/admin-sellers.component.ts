import { Component, OnInit } from '@angular/core';
import { AdminSellerService } from 'src/app/Services/admin/adminSellerService';

@Component({
  selector: 'app-admin-sellers',
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.css']
})
export class AdminSellersComponent implements OnInit {

  sellers: any[] = [];
  status = 2; // default: Pending
  adminId = 1; // logged-in admin id

  constructor(private sellerService: AdminSellerService) {}

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers() {
    this.sellerService.getSellers(this.status).subscribe(res => {
      this.sellers = res.data;
    });
  }

  approve(userId: number) {
    this.sellerService.approveSeller(userId, this.adminId).subscribe(() => {
      this.loadSellers();
    });
  }

  changeStatus(userId: number, statusId: number) {
    this.sellerService.changeStatus(userId, statusId, this.adminId).subscribe(() => {
      this.loadSellers();
    });
  }

}