import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkscheduleeditComponent } from './workscheduleedit.component';

describe('WorkscheduleeditComponent', () => {
  let component: WorkscheduleeditComponent;
  let fixture: ComponentFixture<WorkscheduleeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkscheduleeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkscheduleeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
