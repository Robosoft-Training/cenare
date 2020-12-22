import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLazyModulesComponent } from './shared-lazy-modules.component';

describe('SharedLazyModulesComponent', () => {
  let component: SharedLazyModulesComponent;
  let fixture: ComponentFixture<SharedLazyModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedLazyModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLazyModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
