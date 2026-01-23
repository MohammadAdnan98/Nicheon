import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ForgotpasswordComponent } from './authentication/forgotpassword/forgotpassword.component';
import { SellerDashboardComponent } from './Seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboardComponent } from './Buyer/buyer-dashboard/buyer-dashboard.component';
import { ListingsComponent } from './Seller/listings/listings.component';
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
import { BuyerProductListComponent } from './Buyer/buyer-product-list/buyer-product-list.component';
import { BuyerProductDetailsComponent } from './Buyer/buyer-product-details/buyer-product-details.component';
import { BuyerCartComponent } from './Buyer/buyer-cart/buyer-cart.component';
import { BuyerCheckoutComponent } from './Buyer/buyer-checkout/buyer-checkout.component';
import { BuyerOrderSuccessComponent } from './Buyer/buyer-order-success/buyer-order-success.component';
import { BuyerOrdersComponent } from './Buyer/buyer-orders/buyer-orders.component';
import { BuyerTrackOrderComponent } from './Buyer/buyer-track-order/buyer-track-order.component';
import { BuyerOrderDetailsComponent } from './Buyer/buyer-order-details/buyer-order-details.component';
import { BuyerWishlistComponent } from './Buyer/buyer-wishlist/buyer-wishlist.component';
import { BuyerProfileComponent } from './Buyer/buyer-profile/buyer-profile.component';
import { BuyerProfileEditComponent } from './Buyer/buyer-profile-edit/buyer-profile-edit.component';
import { BuyerSavedAddressComponent } from './Buyer/buyer-saved-address/buyer-saved-address.component';
import { BuyerSecurityComponent } from './Buyer/buyer-security/buyer-security.component';
import { BuyerProductsComponent } from './Buyer/buyer-products/buyer-products.component';

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
  { path: 'seller-edit-product/:id', component: SellerEditProductComponent },
  { path: 'buyer-product-list/:id', component: BuyerProductListComponent},
  { path: 'buyer-product-details',component: BuyerProductDetailsComponent},
  { path: 'cart/:id',component: BuyerCartComponent},
  { path: 'checkout/:id',component: BuyerCheckoutComponent},
  { path: 'order-success', component: BuyerOrderSuccessComponent},
  { path: 'Order-list/:id', component: BuyerOrdersComponent},
  { path: 'buyer-track-order/:id', component: BuyerTrackOrderComponent},
  { path: 'order-details/:id', component: BuyerOrderDetailsComponent},
  { path: 'wishlist/:id', component: BuyerWishlistComponent},
  { path: 'buyer-profile', component: BuyerProfileComponent},
  { path: 'profile-edit', component: BuyerProfileEditComponent},
  { path: 'address-update', component: BuyerSavedAddressComponent},
  { path: 'buyer-security', component: BuyerSecurityComponent},
  { path: 'buyer-product', component: BuyerProductsComponent}

  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
