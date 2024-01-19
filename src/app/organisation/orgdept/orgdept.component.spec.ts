import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgdeptComponent } from './orgdept.component';

describe('OrgdeptComponent', () => {
  let component: OrgdeptComponent;
  let fixture: ComponentFixture<OrgdeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgdeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgdeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
