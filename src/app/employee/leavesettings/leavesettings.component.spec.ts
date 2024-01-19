import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesettingsComponent } from './leavesettings.component';

describe('LeavesettingsComponent', () => {
  let component: LeavesettingsComponent;
  let fixture: ComponentFixture<LeavesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
