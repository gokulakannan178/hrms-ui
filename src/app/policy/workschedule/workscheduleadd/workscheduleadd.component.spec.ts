import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkscheduleaddComponent } from './workscheduleadd.component';

describe('WorkscheduleaddComponent', () => {
  let component: WorkscheduleaddComponent;
  let fixture: ComponentFixture<WorkscheduleaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkscheduleaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkscheduleaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
