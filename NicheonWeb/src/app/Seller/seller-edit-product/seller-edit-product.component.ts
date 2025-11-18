import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/Services/ProductService';
import { FileService } from 'src/app/Services/FileService';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent implements OnInit {

  loading = true;
  saving = false;

  // ================================
  // PRODUCT MODEL
  // ================================
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

  // ================================
  // IMAGE MODEL
  // ================================
  maxImages = 6;
  previewImages: string[] = [];     // absolute URLs + new data URLs
  imageFiles: File[] = [];          // only new image files
  existingImages: any[] = [];       // { imageId, imageUrl }
  removedImageIds: number[] = [];   // deleted existing image IDs
  primaryIndex: number = 0;         // which image is primary

  get primaryPreview() {
    return this.previewImages[this.primaryIndex] || null;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fileService: FileService,
    private location: Location
  ) {}

  // ================================
  // LOAD PRODUCT
  // ================================
  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!productId) {
      this.router.navigate(['/seller-listings']);
      return;
    }

    this.loadProduct(productId);
  }

  loadProduct(productId: number) {
    this.productService.getProductById(productId).subscribe({
      next: (res) => {
        const p = res?.data ?? res;
        this.hydrate(p);
        this.loading = false;
      },
      error: () => {
        alert('Failed to load product');
        this.loading = false;
      }
    });
  }

  // ================================
  // HYDRATE PRODUCT DATA
  // ================================
  hydrate(p: any) {
    this.product = { ...this.product, ...p };

    // existing images from server ↓
    this.existingImages = (p.images || []).map((img: any) => ({
      imageId: img.imageId,
      imageUrl: img.imageUrl.startsWith('http')
        ? img.imageUrl
        : `${environment.imgUrl}/${img.imageUrl.replace(/^\//, '')}`,
      isPrimary: img.isPrimary
    }));

    // previewImages = existingImages
    this.previewImages = this.existingImages.map(x => x.imageUrl);

    // find primary index
    const idx = this.existingImages.findIndex(x => x.isPrimary);
    this.primaryIndex = idx >= 0 ? idx : 0;
  }

  // ================================
  // IMAGE UPLOAD
  // ================================
  onImageUpload(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const available = this.maxImages - this.previewImages.length;
    const selected = files.slice(0, available);

    selected.forEach(file => {
      this.imageFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  // ================================
  // REMOVE IMAGE
  // ================================
  removeImage(i: number) {
    const preview = this.previewImages[i];

    // DELETE EXISTING IMAGE
    const existing = this.existingImages.find(x => x.imageUrl === preview);
    if (existing) {
      this.removedImageIds.push(existing.imageId);
      this.existingImages = this.existingImages.filter(x => x.imageId !== existing.imageId);
    }

    // DELETE NEW IMAGE
    const newStartIndex = this.existingImages.length;
    if (i >= newStartIndex) {
      const newFileIndex = i - newStartIndex;
      if (this.imageFiles[newFileIndex]) {
        this.imageFiles.splice(newFileIndex, 1);
      }
    }

    this.previewImages.splice(i, 1);

    if (this.primaryIndex === i) this.primaryIndex = 0;
    if (this.primaryIndex > i) this.primaryIndex--;
  }

  setPrimary(i: number) {
    this.primaryIndex = i;
  }

  // ================================
  // SAVE PRODUCT
  // ================================
 
  async submitProduct() {
  if (!this.product.productName) return alert('Enter product name');

  this.saving = true;

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const businessId = user.businessId || 1;

  // 🟢 BUILD CLEAN PAYLOAD (NO IMAGES ARRAY)
  const payload = {
    productId: this.product.productId,
    businessId,
    productName: this.product.productName,
    categoryId: this.product.categoryId,
    metalId: this.product.metalId,
    karat: this.product.karat,
    colour: this.product.colour,
    weightGrams: this.product.weightGrams,
    pricePerGram: this.product.pricePerGram,
    makingCharges: this.product.makingCharges,
    MOQ: this.product.moq,
    stock: this.product.stock,
    description: this.product.description,
    isHallmarked: this.product.isHallmarked
  };

  this.productService.updateProduct(payload).subscribe({
    next: async () => {
      // 🗑 Delete removed images
      for (let imgId of this.removedImageIds) {
        await firstValueFrom(this.fileService.deleteImage(imgId));
      }

      // 📤 Upload NEW images
      if (this.imageFiles.length > 0) {
        const formData = new FormData();
        this.imageFiles.forEach(f => formData.append('files', f));

        await firstValueFrom(
          this.fileService.uploadProductImages(
            businessId,
            this.product.productId,
            formData
          )
        );
      }

      this.saving = false;
      alert('Product updated successfully.');
      this.router.navigate(['/seller-product'], {
        queryParams: { id: this.product.productId }
      });
    },
    error: () => {
      this.saving = false;
      alert('Update failed.');
    }
  });
}


  // ================================
  // DELETE PRODUCT
  // ================================
  confirmDelete() {
    if (!confirm('Delete this product?')) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user.businessId || 1;

    // this.productService.deleteProduct(this.product.productId, businessId).subscribe({
    //   next: () => {
    //     alert('Product deleted');
    //     this.router.navigate(['/seller-listings']);
    //   },
    //   error: () => alert('Deletion failed')
    // });

    this.productService.deleteProduct(this.product.productId, businessId).subscribe({
        next: () => {
          alert('🗑 Product deleted.');
          this.router.navigate(['/product-listings']);
        },
        error: () => alert('Failed to delete product.')
      });
  }

  goBack() {
    this.location.back();
  }
}
