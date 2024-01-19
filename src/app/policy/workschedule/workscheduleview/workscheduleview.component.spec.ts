import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkscheduleviewComponent } from './workscheduleview.component';

describe('WorkscheduleviewComponent', () => {
  let component: WorkscheduleviewComponent;
  let fixture: ComponentFixture<WorkscheduleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkscheduleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkscheduleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
