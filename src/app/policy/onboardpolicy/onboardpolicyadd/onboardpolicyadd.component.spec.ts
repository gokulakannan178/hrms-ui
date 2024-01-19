import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicyaddComponent } from './onboardpolicyadd.component';

describe('OnboardpolicyaddComponent', () => {
  let component: OnboardpolicyaddComponent;
  let fixture: ComponentFixture<OnboardpolicyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
