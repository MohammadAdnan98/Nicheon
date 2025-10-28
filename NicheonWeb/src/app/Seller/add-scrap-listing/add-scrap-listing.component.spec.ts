import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScrapListingComponent } from './add-scrap-listing.component';

describe('AddScrapListingComponent', () => {
  let component: AddScrapListingComponent;
  let fixture: ComponentFixture<AddScrapListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScrapListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScrapListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
