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
import { BuyerListingsComponent } from './Buyer/buyer-listings/buyer-listings.component';
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
    BuyerListingsComponent,
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
    ProfilEditeComponent
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
