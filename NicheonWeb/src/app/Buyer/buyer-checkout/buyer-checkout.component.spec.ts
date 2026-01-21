import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCheckoutComponent } from './buyer-checkout.component';

describe('BuyerCheckoutComponent', () => {
  let component: BuyerCheckoutComponent;
  let fixture: ComponentFixture<BuyerCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
