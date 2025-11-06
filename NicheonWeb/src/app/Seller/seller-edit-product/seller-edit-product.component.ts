import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/ProductService';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent {

  product: any = {};
  productImages: string[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.loadProduct(id);
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data || res;
        this.productImages = this.product.images || [];
        this.loading = false;
      },
      error: () => {
        alert('Failed to load product.');
        this.loading = false;
      }
    });
  }

  onImageSelect(event: any) {
    const files = event.target.files;
    if (this.productImages.length + files.length > 6) return alert("Max 6 images allowed.");

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => this.productImages.push(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.productImages.splice(index, 1);
  }

  saveProduct() {
    this.product.images = [...this.productImages];
    this.productService.updateProduct(this.product).subscribe(() => {
      alert('✅ Product Updated!');
      this.router.navigate(['/seller-product'], { queryParams: { id: this.product.productId } });
    });
  }

  confirmDelete() {
    if (confirm("Delete this product?")) {
      this.productService.deleteProduct(this.product.productId, this.product.businessId).subscribe(() => {
        alert("🗑 Product deleted.");
        this.router.navigate(['/listings']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/seller-product'], { queryParams: { id: this.product.productId } });
  }
}
