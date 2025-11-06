import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService';

type Img = { url: string; alt?: string };
type Spec = { label: string; value: string | number | null | undefined };

@Component({
  selector: 'app-seller-product-detail',
  templateUrl: './seller-product-detail.component.html',
  styleUrls: ['./seller-product-detail.component.css']
})
export class SellerProductDetailComponent implements OnInit {
  loading = true;
  productId!: number;
  product: any = null;

  gallery: Img[] = [];
  activeImage: string = 'assets/Image/no-image.png';

  // computed cards
  specs: Spec[] = [];
  pricePerGram = 0;
  indicativeTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // support both /seller-product/:id and ?id= pattern
    this.route.paramMap.subscribe(p => {
      const idParam = p.get('id');
      if (idParam) this.productId = +idParam;
    });
    if (!this.productId) {
      const qp = this.route.snapshot.queryParamMap.get('id');
      this.productId = qp ? +qp : 0;
    }

    if (!this.productId) {
      // fallback if no id (navigate back to listings)
      this.router.navigate(['/seller-listings']);
      return;
    }

    this.loadProduct();
  }

  loadProduct(): void {
    this.loading = true;

    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res?.data ?? res;
        if (!this.product || !this.product.productId) {
          // fallback to demo if API not ready/empty
          this.product = this.getDemoProduct(this.productId);
        }
        this.hydrateUI(this.product);
        this.loading = false;
      },
      error: () => {
        // fallback demo
        this.product = this.getDemoProduct(this.productId);
        this.hydrateUI(this.product);
        this.loading = false;
      }
    });
  }

  hydrateUI(p: any): void {
    // gallery
    const imgs = (p.images as any[] | undefined)?.map(i => ({ url: i.imageUrl || i.url, alt: i.altText })) ?? [];
    if (p.primaryImage && !imgs.some(i => i.url === p.primaryImage)) {
      imgs.unshift({ url: p.primaryImage, alt: 'Primary' });
    }
    this.gallery = imgs.length ? imgs : [{ url: 'assets/Image/no-image.png' }];
    this.activeImage = this.gallery[0].url;

    // price
    this.pricePerGram = Number(p.pricePerGram || 0);
    const weight = Number(p.weightGrams || 0);
    this.indicativeTotal = Math.round(this.pricePerGram * weight);

    // specs
    this.specs = [
      { label: 'Product Code', value: p.productCode || '—' },
      { label: 'Karat', value: p.karat || '—' },
      { label: 'Weight', value: p.weightGrams ? `${p.weightGrams} g` : '—' },
      { label: 'Colour', value: p.colour || '—' },
      { label: 'Gender', value: p.gender || 'Unisex' },
      { label: 'MOQ', value: p.moq ?? p.MOQ ?? 1 },
      { label: 'Stock', value: p.stock ?? 0 },
      { label: 'Hallmarked', value: p.isHallmarked ? 'Yes' : 'No' },
    ];
  }

  selectImage(img: Img) {
    this.activeImage = img.url;
  }

  back() {
    this.router.navigate(['/product-listings']);
  }

  editProduct() {
    this.router.navigate(['/seller-edit-product', this.product.productId]);
  }

  deleteProduct() {
    if (!confirm(`Delete product "${this.product.productName}"?`)) return;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user?.businessId || 1;

    this.productService.deleteProduct(this.product.productId, businessId).subscribe({
      next: () => {
        alert('Product deleted.');
        this.router.navigate(['/seller-listings']);
      },
      error: () => alert('Failed to delete.')
    });
  }

  promote() {
    alert('Promote feature coming soon.');
  }

  // DEMO fallback (if API empty)
  getDemoProduct(id: number) {
    const demo = {
      productId: id,
      businessId: 1,
      productCode: 'NCN-22K-CHN-001',
      productName: '22K Gold Chain Classic',
      shortDescription: 'Handcrafted 22K chain with premium finish.',
      description:
        'Finely handcrafted 22K gold chain. Perfect daily wear. BIS Hallmarked. Anti-tarnish polished. Limited stock.',
      gender: 'Unisex',
      colour: 'Yellow Gold',
      karat: '22K',
      weightGrams: 16.4,
      pricePerGram: 6290,
      makingCharges: 2200,
      MOQ: 1,
      stock: 8,
      isHallmarked: true,
      hallmarkNumber: 'BIS/HM/22K/IND/2025/00991',
      isActive: true,
      createdAt: new Date().toISOString(),
      images: [
        { imageUrl: 'assets/Image/goldchain.jpg', altText: 'Front' },
        { imageUrl: 'assets/Image/gildbiscuit.jpg', altText: 'Clasp' },
        { imageUrl: 'assets/Image/silverchain.png', altText: 'Worn' }
      ],
      primaryImage: 'assets/Image/goldchain.jpg'
    };
    return demo;
  }

  
}
