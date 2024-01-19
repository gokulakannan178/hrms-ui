import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardpolicycheckmastereditComponent } from './onboardpolicycheckmasteredit.component';

describe('OnboardpolicycheckmastereditComponent', () => {
  let component: OnboardpolicycheckmastereditComponent;
  let fixture: ComponentFixture<OnboardpolicycheckmastereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardpolicycheckmastereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardpolicycheckmastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
