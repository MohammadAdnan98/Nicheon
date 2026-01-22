import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerProfileEditComponent } from './buyer-profile-edit.component';

describe('BuyerProfileEditComponent', () => {
  let component: BuyerProfileEditComponent;
  let fixture: ComponentFixture<BuyerProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerProfileEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
