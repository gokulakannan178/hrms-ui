import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtploginComponent } from './otplogin.component';

describe('OtploginComponent', () => {
  let component: OtploginComponent;
  let fixture: ComponentFixture<OtploginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtploginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtploginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
