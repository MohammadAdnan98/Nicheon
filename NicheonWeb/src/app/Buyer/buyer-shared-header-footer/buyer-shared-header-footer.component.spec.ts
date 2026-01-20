import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSharedHeaderFooterComponent } from './buyer-shared-header-footer.component';

describe('BuyerSharedHeaderFooterComponent', () => {
  let component: BuyerSharedHeaderFooterComponent;
  let fixture: ComponentFixture<BuyerSharedHeaderFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSharedHeaderFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerSharedHeaderFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
