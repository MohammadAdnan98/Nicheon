import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ForgotpasswordComponent } from './authentication/forgotpassword/forgotpassword.component';
import { SellerDashboardComponent } from './Seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './Buyer/buyer-dashboard/buyer-dashboard.component';
import { ListingsComponent } from './Seller/listings/listings.component';
import { BuyerListingsComponent } from './Buyer/buyer-listings/buyer-listings.component';
import { AddScrapListingComponent } from './Seller/add-scrap-listing/add-scrap-listing.component';
import { MessageComponent } from './shared/message/message.component';
import { MessageLayoutComponent } from './shared/message-layout/message-layout.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { BrowseSearchingComponent } from './Buyer/browse-searching/browse-searching.component';
import { BookmarkComponent } from './Buyer/bookmark/bookmark.component';
import { ProductDetailComponent } from './Buyer/product-detail/product-detail.component';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { AddProductComponent } from './Seller/add-product/add-product.component';
import { SellerOrdersComponent } from './Seller/seller-orders/seller-orders.component';
import { SellerOrderDetailsComponent } from './Seller/seller-order-details/seller-order-details.component';
import { ProfilEditeComponent } from './shared/profil-edite/profil-edite.component';
import { SellerProductDetailComponent } from './Seller/seller-product-detail/seller-product-detail.component';
import { SellerEditProductComponent } from './Seller/seller-edit-product/seller-edit-product.component';

const routes: Routes = [
   {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'forgot', component: ForgotpasswordComponent },
      { path: 'otp-verification', component: OtpVerificationComponent }
    ]
  },

  { path: 'seller-dashboard', component: SellerDashboardComponent },
  { path: 'buyer-dashboard', component: BuyerDashboardComponent },
  { path: 'product-listings', component: ListingsComponent },
  { path: 'buyer-listings', component: BuyerListingsComponent },
  //{ path: 'seller-add-product', component: AddScrapListingComponent },
  { path: 'seller-messages', component: MessageComponent },
  { path: 'seller-messages-list', component: MessageLayoutComponent },
  { path: 'seller-profile', component: ProfileComponent },
  { path: 'Browser-serach', component: BrowseSearchingComponent },
  { path: 'bookmark', component: BookmarkComponent },
  { path: 'product-deatil', component: ProductDetailComponent },
  { path: 'seller-add-product', component: AddProductComponent},
  { path: 'seller-orders', component: SellerOrdersComponent},
  { path: 'seller-order-details/:id', component: SellerOrderDetailsComponent },
  { path: 'seller-profile-Edite', component: ProfilEditeComponent },
  { path: 'seller-product/:id', component: SellerProductDetailComponent },
  { path: 'seller-edit-product/:id', component: SellerEditProductComponent }
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
