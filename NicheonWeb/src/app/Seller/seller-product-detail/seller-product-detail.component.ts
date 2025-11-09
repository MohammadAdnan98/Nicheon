import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService';

type Img = { url: string; alt?: string };
type Spec = { label: string; value: string | number | null | undefined };

@Component({
  selector: 'app-seller-product-detail',
  templateUrl: './seller-product-detail.component.html',
  styleUrls: ['./seller-product-detail.component.css'],
})
export class SellerProductDetailComponent implements OnInit {
  loading = true;
  productId!: number;
  product: any = null;

  gallery: Img[] = [];
  activeImage: string = 'assets/Image/no-image.png';

  specs: Spec[] = [];
  pricePerGram = 0;
  indicativeTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.productId = idParam ? +idParam : 0;
      if (!this.productId) {
        const qp = this.route.snapshot.queryParamMap.get('id');
        this.productId = qp ? +qp : 0;
      }
      if (!this.productId) {
        this.router.navigate(['/seller-listings']);
        return;
      }
      this.loadProduct();
    });
  }

  loadProduct(): void {
    this.loading = true;
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res?.data ?? res ?? this.getDemoProduct(this.productId);
        this.setupProduct(this.product);
        this.loading = false;
      },
      error: () => {
        this.product = this.getDemoProduct(this.productId);
        this.setupProduct(this.product);
        this.loading = false;
      },
    });
  }

  setupProduct(p: any): void {
    const imgs =
      p.images?.map((i: any) => ({ url: i.imageUrl || i.url, alt: i.altText })) ??
      [];
    if (p.primaryImage && !imgs.some((i: { url: any; }) => i.url === p.primaryImage)) {
      imgs.unshift({ url: p.primaryImage, alt: 'Primary' });
    }
    this.gallery = imgs.length ? imgs : [{ url: 'assets/Image/no-image.png' }];
    this.activeImage = this.gallery[0].url;

    this.pricePerGram = +p.pricePerGram || 0;
    const weight = +p.weightGrams || 0;
    this.indicativeTotal = Math.round(this.pricePerGram * weight);

    this.specs = [
      { label: 'Product Code', value: p.productCode },
      { label: 'Karat', value: p.karat },
      { label: 'Weight', value: `${p.weightGrams} g` },
      { label: 'Colour', value: p.colour },
      { label: 'Gender', value: p.gender },
      { label: 'MOQ', value: p.moq ?? p.MOQ ?? 1 },
      { label: 'Stock', value: p.stock },
      { label: 'Hallmarked', value: p.isHallmarked ? 'Yes' : 'No' },
    ];
  }

  selectImage(img: Img): void {
    this.activeImage = img.url;
  }

  back(): void {
    this.router.navigate(['/product-listings']);
  }

  editProduct(): void {
    this.router.navigate(['/seller-edit-product', this.product.productId]);
  }

  deleteProduct(): void {
    if (!confirm(`Delete "${this.product.productName}"?`)) return;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user?.businessId || 1;
    this.productService.deleteProduct(this.product.productId, businessId).subscribe({
      next: () => {
        alert('Product deleted successfully.');
        this.router.navigate(['/seller-listings']);
      },
      error: () => alert('Failed to delete product.'),
    });
  }

  promote(): void {
    alert('✨ Promote feature coming soon.');
  }

  // Fallback demo data if API not ready
  getDemoProduct(id: number) {
    return {
      productId: id,
      productCode: 'NCN-22K-CHN-001',
      productName: '22K Gold Chain Classic',
      shortDescription: 'Handcrafted 22K gold chain with premium polish.',
      description:
        'This BIS-hallmarked 22K gold chain is elegantly handcrafted for everyday luxury. Anti-tarnish finish, guaranteed purity.',
      karat: '22K',
      colour: 'Yellow Gold',
      gender: 'Unisex',
      weightGrams: 16.4,
      pricePerGram: 6290,
      stock: 8,
      MOQ: 1,
      isActive: true,
      isHallmarked: true,
      hallmarkNumber: 'BIS/HM/22K/2025/00991',
      createdAt: new Date().toISOString(),
      images: [
        { imageUrl: 'assets/Image/goldchain.jpg', altText: 'Front View' },
        { imageUrl: 'assets/Image/gildbiscuit.jpg', altText: 'Detail' },
        { imageUrl: 'assets/Image/silverchain.png', altText: 'On Model' },
      ],
      primaryImage: 'assets/Image/goldchain.jpg',
    };
  }
}
