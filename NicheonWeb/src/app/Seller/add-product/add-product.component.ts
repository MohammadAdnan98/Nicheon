import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService';
import { FileService } from 'src/app/Services/FileService';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: any = {
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
    hallmarkNumber: '',
  };

  selectedFiles: File[] = [];
  previewImages: string[] = [];
  loading = false;

  toastMessage = '';
  toastType: 'success' | 'error' | '' = '';

  constructor(
    private productService: ProductService,
    private fileService: FileService,
    private router: Router
  ) {}

  // Back button
  goBack() {
    this.router.navigate(['/seller-dashboard']);
  }

  // When shared file uploader sends files
  onFilesChanged(files: File[]) {
    this.selectedFiles = files;

    // Build preview
    this.previewImages = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewImages.push(e.target.result);
      reader.readAsDataURL(file);
    });
  }

  setPrimary(index: number) {
    const img = this.previewImages.splice(index, 1)[0];
    this.previewImages.unshift(img);
  }

  removeImage(index: number) {
    this.previewImages.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  // submitProduct(): void {
  //   if (!this.product.productName) return alert('Please enter product name.');
  //   if (this.product.isHallmarked && !this.product.hallmarkNumber) return alert('Enter hallmark number');
  //   if (this.selectedFiles.length < 1) return alert('Upload at least 1 image');
  //   if (this.selectedFiles.length > 6) return alert('Max 6 images allowed');

  //   this.loading = true;
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   const businessId = user?.businessId || 1;

  //   const productData = {
  //     BusinessId: businessId,
  //     ProductCode: 'PROD-' + Date.now(),
  //     ProductName: this.product.productName,
  //     ShortDescription: this.product.description,
  //     Description: this.product.description,
  //     CategoryId: this.product.categoryId,
  //     MetalId: this.product.metalId,
  //     Karat: this.product.karat,
  //     Colour: this.product.colour,
  //     WeightGrams: this.product.weightGrams,
  //     PricePerGram: this.product.pricePerGram,
  //     MakingCharges: this.product.makingCharges,
  //     MOQ: this.product.moq,
  //     Stock: this.product.stock,
  //     IsHallmarked: this.product.isHallmarked
  //   };

  //   // STEP 1 — CREATE PRODUCT
  //   this.productService.createProduct(productData).subscribe({
  //     next: (res: any) => {
  //       const productId = res.productId;

  //       const formData = new FormData();
  //       this.selectedFiles.forEach(file => formData.append('files', file));

  //       // STEP 2 — UPLOAD IMAGES
  //       this.fileService.uploadProductImages(businessId, productId, formData).subscribe({
  //         next: () => {
  //           alert('Product added successfully');
  //           this.router.navigate(['/seller-dashboard']);
  //         },
  //         error: () => {
  //           alert('Product created but image upload failed');
  //         }
  //       });
  //     },
  //     error: () => {
  //       alert('Failed to create product');
  //     }
  //   });
  // }

  // ---------------- ADD PRODUCT ----------------
  submitProduct(): void {
    if (!this.product.productName)
      return this.showToast('Please enter product name', 'error');

    if (this.product.isHallmarked && !this.product.hallmarkNumber)
      return this.showToast('Enter hallmark number', 'error');

    if (this.selectedFiles.length < 1)
      return this.showToast('Upload at least 1 image', 'error');

    if (this.selectedFiles.length > 6)
      return this.showToast('Max 6 images allowed', 'error');

    this.loading = true;

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user?.businessId || 1;

    const productData = {
      BusinessId: businessId,
      ProductCode: 'PROD-' + Date.now(),
      ProductName: this.product.productName,
      ShortDescription: this.product.description,
      Description: this.product.description,
      CategoryId: this.product.categoryId,
      MetalId: this.product.metalId,
      Karat: this.product.karat,
      Colour: this.product.colour,
      WeightGrams: this.product.weightGrams,
      PricePerGram: this.product.pricePerGram,
      MakingCharges: this.product.makingCharges,
      MOQ: this.product.moq,
      Stock: this.product.stock,
      IsHallmarked: this.product.isHallmarked,
    };
    debugger;
    this.productService.createProduct(productData).subscribe({
      next: (res: any) => {
        const productId = res.productId;
        const formData = new FormData();
        this.selectedFiles.forEach((file) => formData.append('files', file));

        this.fileService
          .uploadProductImages(businessId, productId, formData)
          .subscribe({
            next: () => {
              this.showToast('Product added successfully!', 'success');

              setTimeout(() => {
                localStorage.setItem(
                  'toastMessage',
                  'Product added successfully!'
                );
                localStorage.setItem('toastType', 'success');

                this.router.navigate(['/product-listings']);
              }, 1500);
            },
            error: () => {
              this.showToast(
                'Product created but image upload failed',
                'error'
              );
            },
          });
      },
      error: () => {
        this.showToast('Failed to create product', 'error');
      },
    });
  }

  showToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.toastMessage = '';
      this.toastType = '';
    }, 3000);
  }
}
