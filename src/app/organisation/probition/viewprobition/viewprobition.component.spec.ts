import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprobitionComponent } from './viewprobition.component';

describe('ViewprobitionComponent', () => {
  let component: ViewprobitionComponent;
  let fixture: ComponentFixture<ViewprobitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewprobitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprobitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
