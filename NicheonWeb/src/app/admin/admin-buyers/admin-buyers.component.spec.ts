import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBuyersComponent } from './admin-buyers.component';

describe('AdminBuyersComponent', () => {
  let component: AdminBuyersComponent;
  let fixture: ComponentFixture<AdminBuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBuyersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
