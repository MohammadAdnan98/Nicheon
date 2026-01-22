import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSecurityComponent } from './buyer-security.component';

describe('BuyerSecurityComponent', () => {
  let component: BuyerSecurityComponent;
  let fixture: ComponentFixture<BuyerSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
