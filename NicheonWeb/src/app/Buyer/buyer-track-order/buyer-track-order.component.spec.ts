import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerTrackOrderComponent } from './buyer-track-order.component';

describe('BuyerTrackOrderComponent', () => {
  let component: BuyerTrackOrderComponent;
  let fixture: ComponentFixture<BuyerTrackOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerTrackOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerTrackOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
