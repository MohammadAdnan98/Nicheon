import { Component, OnInit } from '@angular/core';
import { AdminBuyerService } from 'src/app/Services/admin/AdminBuyerService';

@Component({
  selector: 'app-admin-buyers',
  templateUrl: './admin-buyers.component.html',
  styleUrls: ['./admin-buyers.component.css']
})
export class AdminBuyersComponent implements OnInit {
 buyers: any[] = [];
  profileStatus = 1; // Pending default
  adminId = 1; 

  constructor(private buyerService: AdminBuyerService) {}

  ngOnInit(): void {
    this.loadBuyers();
  }

  loadBuyers() {
    this.buyerService.getBuyers(this.profileStatus)
      .subscribe(res => {
        this.buyers = res.data;
      });
  }

  changeStatus(userId: number, statusId: number) {
    this.buyerService.toggleBuyerStatus(userId, statusId, this.adminId)
      .subscribe(() => this.loadBuyers());
  }
}
