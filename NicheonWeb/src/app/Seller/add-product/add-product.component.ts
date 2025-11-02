import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService';

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

  previewImages: string[] = [];
  loading = false;

  constructor(private productService: ProductService, private router: Router) {}

  // ✅ Fixed: Allow adding up to 6 images total, without replacing previous ones
  onImageUpload(event: any): void {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    const availableSlots = 6 - this.previewImages.length;
    if (availableSlots <= 0) {
      alert('You can upload a maximum of 6 images.');
      return;
    }

    const uploadCount = Math.min(files.length, availableSlots);
    for (let i = 0; i < uploadCount; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.previewImages.splice(index, 1);
  }

  submitProduct(): void {
    if (!this.product.productName) {
      alert('Please enter product name.');
      return;
    }
    if (this.product.isHallmarked && !this.product.hallmarkNumber) {
      alert('Please enter hallmark number.');
      return;
    }
    if (this.previewImages.length < 1) {
      alert('Please upload at least 1 image.');
      return;
    }

    this.loading = true;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const businessId = user?.businessId || 1;

    const productData = {
      businessId: businessId,
      productCode: 'PROD-' + Date.now(),
      ...this.product,
    };

    this.productService.createProduct(productData).subscribe({
      next: (res) => {
        const newProductId = res.productId || res.id;
        console.log('✅ Product Created:', res);

        if (this.previewImages.length > 0 && newProductId) {
          let sort = 1;
          for (const img of this.previewImages) {
            const imageData = {
              productId: newProductId,
              businessId: businessId,
              imageUrl: img,
              altText: `${this.product.productName} Image ${sort}`,
              isPrimary: sort === 1,
              sortOrder: sort++,
            };
            this.productService.addProductImage(imageData).subscribe();
          }
        }

        alert('✅ Product added successfully!');
        this.loading = false;
        this.router.navigate(['/seller-dashboard']);
      },
      error: (err) => {
        console.error('❌ Error:', err);
        alert('Failed to add product.');
        this.loading = false;
      },
    });
  }
}
