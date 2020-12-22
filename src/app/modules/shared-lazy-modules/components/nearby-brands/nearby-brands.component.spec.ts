import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyBrandsComponent } from './nearby-brands.component';

describe('NearbyBrandsComponent', () => {
  let component: NearbyBrandsComponent;
  let fixture: ComponentFixture<NearbyBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NearbyBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
