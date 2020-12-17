import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePopularBrandsComponent } from './home-popular-brands.component';

describe('HomePopularBrandsComponent', () => {
  let component: HomePopularBrandsComponent;
  let fixture: ComponentFixture<HomePopularBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePopularBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePopularBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
