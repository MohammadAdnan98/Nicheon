import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 
import { AdminSellersComponent } from './admin-sellers/admin-sellers.component';
import { AdminBuyersComponent } from './admin-buyers/admin-buyers.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'admin/dashboard', component: AdminDashboardComponent },
      { path: 'admin/sellers', component: AdminSellersComponent },
      { path: 'admin/buyers', component: AdminBuyersComponent },
      { path: 'admin/products', component: AdminProductsComponent},
      { path: 'admin/orders', component: AdminOrdersComponent},
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
