import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSellersComponent } from './admin-sellers/admin-sellers.component';
import { AdminBuyersComponent } from './admin-buyers/admin-buyers.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component'; 

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminSellersComponent,
    AdminBuyersComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule {}
