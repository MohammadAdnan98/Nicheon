import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}
