import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerWishlistComponent } from './buyer-wishlist.component';

describe('BuyerWishlistComponent', () => {
  let component: BuyerWishlistComponent;
  let fixture: ComponentFixture<BuyerWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerWishlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
