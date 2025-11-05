import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilEditeComponent } from './profil-edite.component';

describe('ProfilEditeComponent', () => {
  let component: ProfilEditeComponent;
  let fixture: ComponentFixture<ProfilEditeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilEditeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilEditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
