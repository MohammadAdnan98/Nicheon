import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseSearchingComponent } from './browse-searching.component';

describe('BrowseSearchingComponent', () => {
  let component: BrowseSearchingComponent;
  let fixture: ComponentFixture<BrowseSearchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseSearchingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
