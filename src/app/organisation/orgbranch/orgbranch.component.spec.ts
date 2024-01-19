import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgbranchComponent } from './orgbranch.component';

describe('OrgbranchComponent', () => {
  let component: OrgbranchComponent;
  let fixture: ComponentFixture<OrgbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
