import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicyeditComponent } from './onboardpolicyedit.component';

describe('OnboardpolicyeditComponent', () => {
  let component: OnboardpolicyeditComponent;
  let fixture: ComponentFixture<OnboardpolicyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
