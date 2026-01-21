import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCartComponent } from './buyer-cart.component';

describe('BuyerCartComponent', () => {
  let component: BuyerCartComponent;
  let fixture: ComponentFixture<BuyerCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
