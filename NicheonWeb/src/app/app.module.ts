import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { ForgotpasswordComponent } from './authentication/forgotpassword/forgotpassword.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OtpVerificationComponent } from './authentication/otp-verification/otp-verification.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from './Seller/add-product/add-product.component';
import { SellerOrdersComponent } from './Seller/seller-orders/seller-orders.component';
import { SellerOrderDetailsComponent } from './Seller/seller-order-details/seller-order-details.component';
import { ProfilEditeComponent } from './shared/profil-edite/profil-edite.component';
import { SellerProductDetailComponent } from './Seller/seller-product-detail/seller-product-detail.component';
import { SellerEditProductComponent } from './Seller/seller-edit-product/seller-edit-product.component';
import { FileUploadComponent } from './shared/file-upload/file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { BuyerProductListComponent } from './Buyer/buyer-product-list/buyer-product-list.component';
import { BuyerSharedHeaderFooterComponent } from './Buyer/buyer-shared-header-footer/buyer-shared-header-footer.component';
import { BuyerSharedFooterComponent } from './Buyer/buyer-shared-footer/buyer-shared-footer.component';
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


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegistrationComponent,
    ForgotpasswordComponent,
    SellerDashboardComponent,
    BuyerDashboardComponent,
    ListingsComponent,
    AddScrapListingComponent,
    MessageComponent,
    MessageLayoutComponent,
    ProfileComponent,
    BrowseSearchingComponent,
    BookmarkComponent,
    ProductDetailComponent,
    OtpVerificationComponent,
    AddProductComponent,
    SellerOrdersComponent,
    SellerOrderDetailsComponent,
    ProfilEditeComponent,
    SellerProductDetailComponent,
    SellerEditProductComponent,
    FileUploadComponent,
    HomeComponent,
    BuyerProductListComponent,
    BuyerSharedHeaderFooterComponent,
    BuyerSharedFooterComponent,
    BuyerProductDetailsComponent,
    BuyerCartComponent,
    BuyerCheckoutComponent,
    BuyerOrderSuccessComponent,
    BuyerOrdersComponent,
    BuyerTrackOrderComponent,
    BuyerOrderDetailsComponent,
    BuyerWishlistComponent,
    BuyerProfileComponent,
    BuyerProfileEditComponent,
    BuyerSavedAddressComponent,
    BuyerSecurityComponent
   ],
  imports: [
    BrowserModule,
    // ✅ Only keep this
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    AdminRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
