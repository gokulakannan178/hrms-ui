import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicycheckmasterviewComponent } from './onboardpolicycheckmasterview.component';

describe('OnboardpolicycheckmasterviewComponent', () => {
  let component: OnboardpolicycheckmasterviewComponent;
  let fixture: ComponentFixture<OnboardpolicycheckmasterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicycheckmasterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicycheckmasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
