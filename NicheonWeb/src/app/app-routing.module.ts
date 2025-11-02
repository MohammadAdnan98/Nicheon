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

const routes: Routes = [
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
  { path: 'seller-listings', component: ListingsComponent },
  { path: 'buyer-listings', component: BuyerListingsComponent },
  //{ path: 'seller-add-product', component: AddScrapListingComponent },
  { path: 'message', component: MessageComponent },
  { path: 'message-list', component: MessageLayoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'Browser-serach', component: BrowseSearchingComponent },
  { path: 'bookmark', component: BookmarkComponent },
  { path: 'product-deatil', component: ProductDetailComponent },
  { path: 'seller-add-product', component: AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
