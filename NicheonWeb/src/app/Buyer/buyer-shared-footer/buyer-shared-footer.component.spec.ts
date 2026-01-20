import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSharedFooterComponent } from './buyer-shared-footer.component';

describe('BuyerSharedFooterComponent', () => {
  let component: BuyerSharedFooterComponent;
  let fixture: ComponentFixture<BuyerSharedFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSharedFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerSharedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
