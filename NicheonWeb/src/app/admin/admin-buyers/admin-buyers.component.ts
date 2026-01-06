import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/Services/admin/AdminDashboardService';
// import { AdminBuyerDto } from '../models/admin-buyer.dto';

@Component({
  selector: 'app-admin-buyers',
  templateUrl: './admin-buyers.component.html',
  styleUrls: ['./admin-buyers.component.css']
})
export class AdminBuyersComponent implements OnInit {

  buyers: any[] = [];

  // ✅ IMPORTANT: number | null
  statusFilter: number | null = null;

  constructor(private service: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadBuyers();
  }

  loadBuyers(): void {
    // this.service.getBuyers(this.statusFilter).subscribe({
    //   next: (res) => this.buyers = res.data,
    //   error: () => alert('Failed to load buyers')
    // });
  }

  changeStatus(userId: number, statusId: number): void {
    // this.service.updateStatus(userId, statusId).subscribe(() => {
    //   this.loadBuyers();
    // });
  }
}
