import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaverequestadminComponent } from './leaverequestadmin.component';

describe('LeaverequestadminComponent', () => {
  let component: LeaverequestadminComponent;
  let fixture: ComponentFixture<LeaverequestadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaverequestadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaverequestadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
