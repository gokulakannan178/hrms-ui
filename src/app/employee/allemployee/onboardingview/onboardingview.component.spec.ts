import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingviewComponent } from './onboardingview.component';

describe('OnboardingviewComponent', () => {
  let component: OnboardingviewComponent;
  let fixture: ComponentFixture<OnboardingviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
