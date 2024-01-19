import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllorganisationComponent } from './allorganisation.component';

describe('AllorganisationComponent', () => {
  let component: AllorganisationComponent;
  let fixture: ComponentFixture<AllorganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllorganisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllorganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
