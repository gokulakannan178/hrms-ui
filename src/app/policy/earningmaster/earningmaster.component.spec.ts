import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningmasterComponent } from './earningmaster.component';

describe('EarningmasterComponent', () => {
  let component: EarningmasterComponent;
  let fixture: ComponentFixture<EarningmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
