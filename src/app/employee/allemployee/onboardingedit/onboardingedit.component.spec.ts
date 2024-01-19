import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingeditComponent } from './onboardingedit.component';

describe('OnboardingeditComponent', () => {
  let component: OnboardingeditComponent;
  let fixture: ComponentFixture<OnboardingeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
