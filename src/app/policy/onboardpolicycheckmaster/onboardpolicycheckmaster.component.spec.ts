import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicycheckmasterComponent } from './onboardpolicycheckmaster.component';

describe('OnboardpolicycheckmasterComponent', () => {
  let component: OnboardpolicycheckmasterComponent;
  let fixture: ComponentFixture<OnboardpolicycheckmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicycheckmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicycheckmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
