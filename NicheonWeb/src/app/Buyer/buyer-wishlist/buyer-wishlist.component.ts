import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buyer-wishlist',
  templateUrl: './buyer-wishlist.component.html',
  styleUrls: ['./buyer-wishlist.component.css']
})
export class BuyerWishlistComponent implements OnInit {

  // =========================
  // DUMMY DATA (PHASE 1)
  // =========================
  wishlist: any[] = [];

  ngOnInit(): void {
    this.loadWishlist();
  }

  // =========================
  // LOAD WISHLIST
  // =========================
  loadWishlist(): void {
    // Phase 1: Dummy data
    this.wishlist = [
      {
        productId: 1,
        name: 'Brass Zircon Adjustable Ring',
        supplier: 'Xiamen Ju Min Yue Network Co., Ltd.',
        color: 'White',
        size: 'Adjustable',
        price: 180,
        image: 'assets/Image/Earring_01.png'
      },
      {
        productId: 2,
        name: 'Gold Plated Crystal Ring',
        supplier: 'Shree Jewellers',
        color: 'Gold',
        size: '10',
        price: 170,
        image: 'assets/Image/goldring.png'
      }
    ];

    // Phase 2 (API ready)
    /*
    this.wishlistService.getWishlist().subscribe(res => {
      this.wishlist = res.data;
    });
    */
  }

   // =========================
  // UI STATE
  // =========================
  searchText = '';
  filterStatus: 'ALL' | 'PURCHASED' | 'UNPURCHASED' = 'ALL';
  sortBy: 'RECENT' | 'PRICE_LOW' | 'PRICE_HIGH' = 'RECENT';



  // =========================
  // RECOMMENDED PRODUCTS
  // =========================
  recommendedProducts = [
    {
      name: 'Malabar Gold Diamond Ring',
      price: 22587,
      image: 'assets/Image/goldring.png'
    },
    {
      name: '22K Pure Gold Ring',
      price: 39470,
      image: 'assets/Image/goldchain.jpg'
    },
    {
      name: 'Sterling Silver Ring',
      price: 2450,
      image: 'assets/Image/silverring.png'
    }
  ];

  // =========================
  // FILTER + SORT
  // =========================
  filteredWishlist() {
    let list = [...this.wishlist];

    if (this.searchText) {
      list = list.filter(i =>
        i.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.filterStatus === 'PURCHASED') {
      list = list.filter(i => i.purchased);
    }

    if (this.filterStatus === 'UNPURCHASED') {
      list = list.filter(i => !i.purchased);
    }

    if (this.sortBy === 'PRICE_LOW') {
      list.sort((a, b) => a.price - b.price);
    }

    if (this.sortBy === 'PRICE_HIGH') {
      list.sort((a, b) => b.price - a.price);
    }

    if (this.sortBy === 'RECENT') {
      list.sort(
        (a, b) => b.addedAt.getTime() - a.addedAt.getTime()
      );
    }

    return list;
  }

  // =========================
  // ACTIONS
  // =========================
  addToCart(item: any): void {
    alert(`Added "${item.name}" to cart`);
  }

  removeFromWishlist(item: any): void {
    this.wishlist = this.wishlist.filter(i => i.id !== item.id);
  }

  viewProduct(item: any): void {
    alert(`Navigate to product: ${item.name}`);
  }

  // =========================
  // PHASE 2 (API READY)
  // =========================
  /*
  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(res => {
      this.wishlist = res.data;
    });
  }
  */
  

}
