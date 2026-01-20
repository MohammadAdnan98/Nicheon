import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerHomeService } from 'src/app/Services/buyer/BuyerHomeService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buyer-dashboard',
  templateUrl: './buyer-dashboard.component.html',
  styleUrls: ['./buyer-dashboard.component.css']
})
export class BuyerDashboardComponent {
 
 
  // =========================
  // ENV
  // =========================
  imageBaseUrl = environment.imgUrl;
  defaultImage = 'assets/images/no-image.png';

  // =========================
  // USER
  // =========================
  userId!: number;

  // =========================
  // HOME DATA
  // =========================
  categories: any[] = [];
  metals: any[] = [];
  topSellers: any[] = [];
  featuredProducts: any[] = [];
  recentlyViewed: any[] = [];
  trendingProducts: any[] = [];
  recommendations: any[] = [];
  topCategories: any[] = [];
  banners: any[] = [];

  // =========================
  // SEARCH
  // =========================
  searchText: string = '';
  searchSuggestions: any[] = [];
  searchResults: any[] = [];
  isSearching: boolean = false;

  // Pagination
  page = 1;
  pageSize = 20;
  totalCount = 0;

  // =========================
  // LOADING STATES
  // =========================
  loadingHome = false;
  loadingSearch = false;
  selectedMetalId: number | null = null;

  constructor(private buyerHomeService: BuyerHomeService) {}

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('UserId')) || 1;
    this.loadHomeData();
    this.loadExtraSections();
  }

  // =========================
  // HOME PAGE DATA
  // =========================
  loadHomeData(): void {
    this.loadingHome = true;

    this.buyerHomeService.getBuyerHome(this.userId).subscribe({
      next: (res) => {
        if (res?.success) {
          this.categories = res.data.categories || [];
          this.metals = res.data.metals || [];
          this.topSellers = res.data.topSellers || [];
          this.featuredProducts = res.data.featured || [];
          this.recentlyViewed = res.data.recentlyViewed || [];
        }
        this.loadingHome = false;
      },
      error: () => {
        this.loadingHome = false;
      }
    });
  }

  // =========================
  // EXTRA SECTIONS
  // =========================
  loadExtraSections(): void {
    this.buyerHomeService.getTrendingProducts().subscribe(res => {
      this.trendingProducts = res?.data || [];
    });

    this.buyerHomeService.getRecommendations(this.userId).subscribe(res => {
      this.recommendations = res?.data || [];
    });

    this.buyerHomeService.getTopCategories(this.userId).subscribe(res => {
      this.topCategories = res?.data || [];
    });

    this.buyerHomeService.getBanners().subscribe(res => {
      this.banners = res?.data || [];
    });
  }

  // =========================
  // SEARCH FLOW (HOME SEARCH)
  // =========================
  onSearchChange(): void {
    if (!this.searchText || this.searchText.length < 2) {
      this.searchSuggestions = [];
      return;
    }

    this.buyerHomeService.searchProducts({
      q: this.searchText,
      page: 1,
      pageSize: 5
    }).subscribe(res => {
      this.searchSuggestions = res?.data || [];
    });
  }

  onSearchSubmit(): void {
    if (!this.searchText) return;

    this.loadingSearch = true;
    this.page = 1;

    // Record search
    this.buyerHomeService.recordSearchTerm(this.userId, this.searchText).subscribe();

    this.buyerHomeService.searchProducts({
      q: this.searchText,
      sort: 'relevance',
      page: this.page,
      pageSize: this.pageSize
    }).subscribe({
      next: (res) => {
        this.searchResults = res?.data || [];
        this.totalCount = res?.totalCount || 0;
        this.loadingSearch = false;
        this.isSearching = true;
      },
      error: () => {
        this.loadingSearch = false;
      }
    });
  }

  loadMoreSearch(): void {
    this.page++;

    this.buyerHomeService.searchProducts({
      q: this.searchText,
      sort: 'relevance',
      page: this.page,
      pageSize: this.pageSize
    }).subscribe(res => {
      this.searchResults = [...this.searchResults, ...(res?.data || [])];
    });
  }

  // =========================
  // PRODUCT CLICK
  // =========================
  openProduct(product: any): void {
    this.buyerHomeService.logProductView(product.productId, this.userId).subscribe();
    // later navigate to product detail
    // this.router.navigate(['/product', product.productId]);
  }

  // =========================
  // IMAGE HANDLING
  // =========================
  getProductImage(url?: string): string {
    if (!url) return this.defaultImage;
    if (url.startsWith('http')) return url;
    return this.imageBaseUrl + url;
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (!img.src.includes('no-image.png')) {
      img.src = this.defaultImage;
    }
  }

  // =========================
  // CAMERA SEARCH (PLACEHOLDER)
  // =========================
  openCamera(): void {
    alert('Camera search – Phase 2');
  }

  // =========================
  // FILTER CLICKS
  // =========================
  filterByCategory(category: any): void {
    this.searchText = category.categoryName;
    this.onSearchSubmit();
  }

  filterByMetal(metal: any): void {
  this.selectedMetalId = metal.metalId;

  this.buyerHomeService.searchProducts({
    metalIds: metal.metalId.toString(),
    page: 1,
    pageSize: this.pageSize
  }).subscribe(res => {
    this.searchResults = res?.data || [];
    this.isSearching = true;
  });
}

metalImageMap: Record<string, string> = {
  Artificial: 'assets/Image/metal/Artificial_Metal.png',
  Diamond: 'assets/Image/metal/Diamond_Metal.png',
  Gold: 'assets/Image/metal/Gold_Metal.png',
  Platinum: 'assets/Image/metal/Platinum_Metal.png',
  Silver: 'assets/Image/metal/Silver_Metal.png'
};

getMetalImage(metalName: string): string {
  return this.metalImageMap[metalName] || 'assets/Image/NoImageUploaded.png';
}

}
