import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrderSuccessComponent } from './buyer-order-success.component';

describe('BuyerOrderSuccessComponent', () => {
  let component: BuyerOrderSuccessComponent;
  let fixture: ComponentFixture<BuyerOrderSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerOrderSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerOrderSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
