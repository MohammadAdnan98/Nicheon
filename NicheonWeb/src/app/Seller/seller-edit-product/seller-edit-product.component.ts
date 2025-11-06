import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService';
import { Location } from '@angular/common';


@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent {

   loading = true;
  saving = false;

  // form model
  product: any = {
    productId: 0,
    productName: '',
    categoryId: 1,
    metalId: 1,
    karat: '',
    colour: '',
    weightGrams: 0,
    pricePerGram: 0,
    makingCharges: 0,
    moq: 1,
    stock: 0,
    description: '',
    isHallmarked: false,
    hallmarkNumber: ''
  };

  // images
  maxImages = 6;
  previewImages: string[] = [];        // display (existing + new)
  imageFiles: File[] = [];             // only newly added files
  primaryIndex: number = 0;            // which preview index is primary
  get primaryPreview() { return this.previewImages[this.primaryIndex] || null; }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private location: Location

  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadProduct(id);
  }

  // Load from API else demo
  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        const p = Array.isArray(res) ? res[0] : res;
        if (!p) { this.useDemo(id); return; }

        this.hydrateFromServer(p);
        this.loading = false;
      },
      error: () => {
        this.useDemo(id);
      }
    });
  }

  hydrateFromServer(p: any) {
    // map server entity -> form model
    this.product = {
      productId: p.productId,
      productName: p.productName,
      categoryId: p.categoryId ?? 1,
      metalId: p.metalId ?? 1,
      karat: p.karat ?? '',
      colour: p.colour ?? '',
      weightGrams: p.weightGrams ?? 0,
      pricePerGram: p.pricePerGram ?? 0,
      makingCharges: p.makingCharges ?? 0,
      moq: p.moq ?? p.MOQ ?? 1,
      stock: p.stock ?? 0,
      description: p.description ?? '',
      isHallmarked: !!p.isHallmarked,
      hallmarkNumber: p.hallmarkNumber ?? ''
    };

    // existing images
    const imgs = (p.images ?? []).map((x: any) => x.imageUrl);
    if (p.primaryImage && !imgs.includes(p.primaryImage)) imgs.unshift(p.primaryImage);
    this.previewImages = imgs.slice(0, this.maxImages);
    this.primaryIndex = Math.max(0, this.previewImages.indexOf(p.primaryImage || this.previewImages[0]));
  }

  useDemo(id: number) {
    const demo = this.getDemoProduct(id);
    this.hydrateFromServer(demo);
    this.loading = false;
  }

  // ===== Images =====
  onImageUpload(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const remaining = this.maxImages - this.previewImages.length;
    const files = Array.from(input.files).slice(0, remaining);

    files.forEach(file => {
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result as string);
        if (this.previewImages.length === 1) this.primaryIndex = 0;
      };
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  removeImage(i: number) {
    // if removed image is from newly added files, drop the file too
    const existingCount = this.previewImages.length - this.imageFiles.length;
    const addedIndex = i - existingCount;
    if (addedIndex >= 0) {
      this.imageFiles.splice(addedIndex, 1);
    }
    this.previewImages.splice(i, 1);
    if (this.primaryIndex >= this.previewImages.length) {
      this.primaryIndex = Math.max(0, this.previewImages.length - 1);
    }
  }

  setPrimary(i: number) {
    this.primaryIndex = i;
  }

  // ===== Actions =====
  submitProduct() {
    if (this.product.isHallmarked && !this.product.hallmarkNumber) {
      alert('Please enter Hallmark Number.');
      return;
    }

    this.saving = true;

    // Build payload for backend (matches your Product entity/update SP)
    const payload = {
      productId: this.product.productId,
      businessId: 1, // replace with real businessId from auth
      productCode: this.product.productCode ?? '',
      productName: this.product.productName,
      shortDescription: this.product.shortDescription ?? '',
      description: this.product.description,
      gender: this.product.gender ?? 'Unisex',
      colour: this.product.colour,
      karat: this.product.karat,
      weightGrams: this.product.weightGrams,
      pricePerGram: this.product.pricePerGram,
      makingCharges: this.product.makingCharges,
      MOQ: this.product.moq,
      stock: this.product.stock,
      isHallmarked: this.product.isHallmarked,
      hallmarkNumber: this.product.hallmarkNumber,
      isActive: true
    };

    this.productService.updateProduct(payload).subscribe({
      next: () => {
        // Image upload (your API expects URL; keep as TODO)
        // In phase-2 you’ll upload to S3/Cloud + call addProductImage for each URL.
        // For now we just show success.
        this.saving = false;
        alert('✅ Product updated successfully.');
        this.router.navigate(['/seller-product'], { queryParams: { id: this.product.productId } });
      },
      error: () => {
        this.saving = false;
        alert('Failed to update product.');
      }
    });
  }

  confirmDelete() {
    if (!confirm('Delete this product?')) return;
    const businessId = 1; // from auth later
    this.productService.deleteProduct(this.product.productId, businessId).subscribe({
      next: () => {
        alert('🗑 Product deleted.');
        this.router.navigate(['/listings']);
      },
      error: () => alert('Delete failed.')
    });
  }

  goBack() {
  if (window.history.length > 1) {
    this.location.back();
  } else {
    this.router.navigate(['/seller-dashboard']);
  }
}

  // ===== Demo product (as requested) =====
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
