import { Component } from '@angular/core';
import { BuyerHomeService } from 'src/app/Services/buyer/BuyerHomeService';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent {
 
 // ========================
  // USER CONTEXT
  // ========================
  userId: number = 10; // after login set dynamically

  // ========================
  // HOME DATA
  // ========================
  categories: any[] = [];
  trendingProducts: any[] = [];
  recommendations: any[] = [];
  recentlyViewed: any[] = [];
  topCategories: any[] = [];

  // ========================
  // SEARCH
  // ========================
  searchText: string = '';
  searchResults: any[] = [];
  isSearching: boolean = false;

  // ========================
  // PAGINATION
  // ========================
  page: number = 1;
  pageSize: number = 20;
  hasMore: boolean = true;

  // ========================
  // UI STATE
  // ========================
  loadingHome: boolean = false;
  loadingSearch: boolean = false;
  errorMessage: string = '';

  constructor(private buyerService: BuyerHomeService) {}

  // ========================
  // INIT
  // ========================
  ngOnInit(): void {
    this.loadBuyerHome();
  }

  // ========================
  // LOAD BUYER HOME DATA
  // ========================
  loadBuyerHome(): void {
    this.loadingHome = true;

    this.buyerService.getBuyerHome(this.userId).subscribe({
      next: (res) => {
        const data = res.data;

        this.categories = data.categories || [];
        this.trendingProducts = data.trending || [];
        this.recommendations = data.recommendations || [];
        this.recentlyViewed = data.recentlyViewed || [];
        this.topCategories = data.topCategories || [];

        this.loadingHome = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load buyer home';
        this.loadingHome = false;
      }
    });
  }

  // ========================
  // SEARCH PRODUCTS
  // ========================
  searchProducts(reset: boolean = true): void {
    if (!this.searchText.trim()) return;

    if (reset) {
      this.page = 1;
      this.searchResults = [];
      this.hasMore = true;
    }

    if (!this.hasMore) return;

    this.loadingSearch = true;
    this.isSearching = true;

    // record search keyword
    this.buyerService.recordSearchTerm(this.userId, this.searchText).subscribe();

    this.buyerService.searchProducts(
      this.searchText,
      this.page,
      this.pageSize
    ).subscribe({
      next: (res) => {
        const items = res.data || [];

        this.searchResults.push(...items);

        if (items.length < this.pageSize) {
          this.hasMore = false;
        }

        this.page++;
        this.loadingSearch = false;
      },
      error: () => {
        this.loadingSearch = false;
      }
    });
  }

  // ========================
  // CLICK PRODUCT
  // ========================
  onProductClick(product: any): void {
    if (!product?.productId) return;

    // log view
    this.buyerService
      .logProductView(this.userId, product.productId)
      .subscribe();

    // navigate to product detail page
    // this.router.navigate(['/buyer/product', product.productId]);
  }

  // ========================
  // LOAD MORE (INFINITE SCROLL)
  // ========================
  loadMore(): void {
    if (this.isSearching) {
      this.searchProducts(false);
    }
  }

  // ========================
  // CLEAR SEARCH
  // ========================
  clearSearch(): void {
    this.searchText = '';
    this.searchResults = [];
    this.isSearching = false;
    this.page = 1;
    this.hasMore = true;
  }

}
