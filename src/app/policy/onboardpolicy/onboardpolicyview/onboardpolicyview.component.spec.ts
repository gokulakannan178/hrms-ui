import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicyviewComponent } from './onboardpolicyview.component';

describe('OnboardpolicyviewComponent', () => {
  let component: OnboardpolicyviewComponent;
  let fixture: ComponentFixture<OnboardpolicyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
