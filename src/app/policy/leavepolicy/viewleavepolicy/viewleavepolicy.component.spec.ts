import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewleavepolicyComponent } from './viewleavepolicy.component';

describe('ViewleavepolicyComponent', () => {
  let component: ViewleavepolicyComponent;
  let fixture: ComponentFixture<ViewleavepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewleavepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewleavepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
