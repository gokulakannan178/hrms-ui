import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicycheckmasteraddComponent } from './onboardpolicycheckmasteradd.component';

describe('OnboardpolicycheckmasteraddComponent', () => {
  let component: OnboardpolicycheckmasteraddComponent;
  let fixture: ComponentFixture<OnboardpolicycheckmasteraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicycheckmasteraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicycheckmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
