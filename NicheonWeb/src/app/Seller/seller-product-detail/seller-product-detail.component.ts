import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seller-product-detail',
  templateUrl: './seller-product-detail.component.html',
  styleUrls: ['./seller-product-detail.component.css'],
})
export class SellerProductDetailComponent implements OnInit {

  loading = true;
  productId!: number;
  product: any = null;

  gallery: any[] = [];
  activeImage: string = 'assets/Image/no-image.png';

  pricePerGram = 0;
  indicativeTotal = 0;
  specs: any[] = [];

  // 🔍 Amazon Zoom Variables
  zoomEnabled = false;
  @ViewChild('mainImage') mainImage!: ElementRef;
  @ViewChild('zoomContainer') zoomContainer!: ElementRef;
  lensSize = 120;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;

    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res?.data ?? res;
        this.setupProduct(this.product);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  setupProduct(p: any) {
    // IMAGE FIX
    this.gallery = (p.images || []).map((i: any) => {
      let url = `${environment.imgUrl}/${i.imageUrl?.replace(/^\//, '')}`;
      return { url, alt: i.altText };
    });

    if (this.gallery.length === 0)
      this.gallery = [{ url: 'assets/Image/NoImageUploaded.png' }];

    this.activeImage = this.gallery[0].url;

    this.pricePerGram = p.pricePerGram || 0;
    this.indicativeTotal = Math.round(this.pricePerGram * (p.weightGrams || 0));

    this.specs = [
      { label: 'Product Code', value: p.productCode },
      { label: 'Karat', value: p.karat },
      { label: 'Weight', value: p.weightGrams + ' g' },
      { label: 'Colour', value: p.colour },
      { label: 'Gender', value: p.gender },
      { label: 'MOQ', value: p.moq },
      { label: 'Stock', value: p.stock },
      { label: 'Hallmarked', value: p.isHallmarked ? 'Yes' : 'No' }
    ];
  }

  selectImage(img: any) {
    this.activeImage = img.url;
  }

  back() {
    this.router.navigate(['/product-listings']);
  }

  editProduct() {
    this.router.navigate(['/seller-edit-product', this.product.productId]);
  }

  deleteProduct() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!confirm(`Delete ${this.product.productName}?`)) return;

    // this.productService.deleteProduct(this.product.productId, user.businessId)
    //   .subscribe(() => this.router.navigate(['/seller-listings']));

      this.productService.deleteProduct(this.product.productId, user.businessId).subscribe({
        next: () => {
          alert('🗑 Product deleted.');
          this.router.navigate(['/product-listings']);
        },
        error: () => alert('Failed to delete product.')
      });
  }

  promote() {
    alert("Promote feature coming soon!");
  }

  // 🔍 AMAZON ZOOM FUNCTIONS
  enableZoom() {
    this.zoomEnabled = true;
  }

  disableZoom() {
    this.zoomEnabled = false;
  }

  onZoom(event: any) {
    if (!this.zoomEnabled) return;

    const img = this.mainImage.nativeElement;
    const container = this.zoomContainer.nativeElement;
    const rect = container.getBoundingClientRect();

    const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
    const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;

    const lens = container.querySelector('.zoom-lens');

    let lensX = x - this.lensSize / 2;
    let lensY = y - this.lensSize / 2;

    if (lensX < 0) lensX = 0;
    if (lensY < 0) lensY = 0;
    if (lensX > rect.width - this.lensSize) lensX = rect.width - this.lensSize;
    if (lensY > rect.height - this.lensSize) lensY = rect.height - this.lensSize;

    lens.style.left = lensX + 'px';
    lens.style.top = lensY + 'px';

    const zoomBox = document.querySelector('.zoom-result') as HTMLElement;
    if (!zoomBox) return;

    const fx = lensX / rect.width;
    const fy = lensY / rect.height;

    zoomBox.style.backgroundPosition = `${fx * 100}% ${fy * 100}%`;
  }
}
