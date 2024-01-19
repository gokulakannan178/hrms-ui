import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnoticepolicyComponent } from './viewnoticepolicy.component';

describe('ViewnoticepolicyComponent', () => {
  let component: ViewnoticepolicyComponent;
  let fixture: ComponentFixture<ViewnoticepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewnoticepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnoticepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
