import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from 'src/app/Services/admin/AdminDashboardService';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  stats: any;
  recentOrders: any[] = [];

  constructor(private dashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboardService.getDashboard().subscribe(res => {
       this.stats = res.data.stats;   
      this.recentOrders = res.data.recentOrders || [];
    });
  }
}
