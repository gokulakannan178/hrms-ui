import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicyComponent } from './onboardpolicy.component';

describe('OnboardpolicyComponent', () => {
  let component: OnboardpolicyComponent;
  let fixture: ComponentFixture<OnboardpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
