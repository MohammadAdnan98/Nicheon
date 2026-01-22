import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSavedAddressComponent } from './buyer-saved-address.component';

describe('BuyerSavedAddressComponent', () => {
  let component: BuyerSavedAddressComponent;
  let fixture: ComponentFixture<BuyerSavedAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSavedAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerSavedAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
