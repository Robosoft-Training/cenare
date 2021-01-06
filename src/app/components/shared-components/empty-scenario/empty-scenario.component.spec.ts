import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyScenarioComponent } from './empty-scenario.component';

describe('EmptyScenarioComponent', () => {
  let component: EmptyScenarioComponent;
  let fixture: ComponentFixture<EmptyScenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyScenarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyScenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
