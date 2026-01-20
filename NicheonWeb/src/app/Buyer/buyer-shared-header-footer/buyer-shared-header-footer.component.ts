import { Component } from '@angular/core';
import { BuyerHomeService } from 'src/app/Services/buyer/BuyerHomeService';

@Component({
  selector: 'app-buyer-shared-header-footer',
  templateUrl: './buyer-shared-header-footer.component.html',
  styleUrls: ['./buyer-shared-header-footer.component.css']
})
export class BuyerSharedHeaderFooterComponent {
searchText: string = '';
  searchSuggestions: any[] = [];
  searchResults: any[] = [];
  isSearching: boolean = false;

  // Pagination
  page = 1;
  pageSize = 20;
  totalCount = 0;

  loadingHome = false;
  loadingSearch = false;
  userId!: number;

   constructor(private buyerHomeService: BuyerHomeService) {}

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

   openCamera(): void {
    alert('Camera search – Phase 2');
  }

}
