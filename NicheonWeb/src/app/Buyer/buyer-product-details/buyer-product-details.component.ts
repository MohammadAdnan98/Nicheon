import { Component, OnInit } from '@angular/core';

interface ProductImage {
  id: number;
  url: string;
}

interface PriceSlab {
  minQty: number;
  maxQty?: number;
  price: number;
}

interface VariationOption {
  id: number;
  label: string;
  image?: string;
}

@Component({
  selector: 'app-buyer-product-details',
  templateUrl: './buyer-product-details.component.html',
  styleUrls: ['./buyer-product-details.component.css']
})
export class BuyerProductDetailsComponent {

 /* =========================
     BASIC PRODUCT INFO
  ========================= */
  product = {
    id: 101,
    name: 'Hot Selling Brass Zircon Adjustable Ring',
    category: 'Artificial Jewellery',
    rating: 4.9,
    reviews: 500,
    sold: 1200,
    moq: 2,
    description: `
      Premium quality brass ring with zircon stones.
      Ideal for bulk orders, gifting, weddings, and resellers.
      Custom branding & packaging available.
    `
  };

  /* =========================
     IMAGES
  ========================= */
  images: ProductImage[] = [
    { id: 1, url: 'assets/demo/product-1.jpg' },
    { id: 2, url: 'assets/demo/product-2.jpg' },
    { id: 3, url: 'assets/demo/product-3.jpg' },
    { id: 4, url: 'assets/demo/product-4.jpg' }
  ];

  selectedImage: string = '';

  /* =========================
     PRICE SLABS (B2B)
  ========================= */
  priceSlabs: PriceSlab[] = [
    { minQty: 2, maxQty: 49, price: 2.21 },
    { minQty: 50, maxQty: 199, price: 2.08 },
    { minQty: 200, price: 1.95 }
  ];

  currentUnitPrice: number = 2.21;

  /* =========================
     VARIATIONS
  ========================= */
  colors: VariationOption[] = [
    { id: 1, label: 'White', image: 'assets/demo/color-white.jpg' },
    { id: 2, label: 'Colorful', image: 'assets/demo/color-colorful.jpg' }
  ];

  sizes: VariationOption[] = [
    { id: 1, label: 'Adjustable' }
  ];

  selectedColor!: VariationOption;
  selectedSize!: VariationOption;

  /* =========================
     QUANTITY & CART
  ========================= */
  quantity: number = 2;
  cartCount: number = 0;

  /* =========================
     TABS
  ========================= */
  activeTab: 'attributes' | 'reviews' | 'supplier' | 'description' = 'attributes';

  /* =========================
     SELLER INFO
  ========================= */
  supplier = {
    name: 'Xiamen Ju Min Yue Network Co., Ltd.',
    country: 'CN',
    experience: '2 yrs',
    rating: 4.8,
    responseTime: '< 2h',
    phone: '919999999999' // WhatsApp
  };

  constructor() {}

  ngOnInit(): void {
    this.selectedImage = this.images[0].url;
    this.selectedColor = this.colors[0];
    this.selectedSize = this.sizes[0];
    this.updatePriceByQty();
  }

  /* =========================
     IMAGE HANDLERS
  ========================= */
  selectImage(img: ProductImage): void {
    this.selectedImage = img.url;
  }

  /* =========================
     VARIATION HANDLERS
  ========================= */
  selectColor(color: VariationOption): void {
    this.selectedColor = color;
  }

  selectSize(size: VariationOption): void {
    this.selectedSize = size;
  }

  /* =========================
     QUANTITY & PRICE
  ========================= */
  increaseQty(): void {
    this.quantity++;
    this.updatePriceByQty();
  }

  decreaseQty(): void {
    if (this.quantity > this.product.moq) {
      this.quantity--;
      this.updatePriceByQty();
    }
  }

  updatePriceByQty(): void {
    const slab = this.priceSlabs.find(s =>
      this.quantity >= s.minQty && (s.maxQty ? this.quantity <= s.maxQty : true)
    );
    this.currentUnitPrice = slab ? slab.price : this.priceSlabs[0].price;
  }

  get subtotal(): number {
    return +(this.quantity * this.currentUnitPrice).toFixed(2);
  }

  /* =========================
     ACTION BUTTONS
  ========================= */
  startOrder(): void {
    console.log('Start Order:', {
      productId: this.product.id,
      qty: this.quantity,
      color: this.selectedColor.label,
      size: this.selectedSize.label
    });
    alert('Start Order clicked (Phase-1)');
  }

  addToCart(): void {
    this.cartCount++;
    console.log('Added to cart:', this.cartCount);
  }

  chatOnWhatsApp(): void {
    const message = encodeURIComponent(
      `Hello, I'm interested in ${this.product.name}.
       Qty: ${this.quantity}, Color: ${this.selectedColor.label}`
    );
    window.open(
      `https://wa.me/${this.supplier.phone}?text=${message}`,
      '_blank'
    );
  }

  /* =========================
     TABS
  ========================= */
  setTab(tab: 'attributes' | 'reviews' | 'supplier' | 'description'): void {
    this.activeTab = tab;
  }

}
