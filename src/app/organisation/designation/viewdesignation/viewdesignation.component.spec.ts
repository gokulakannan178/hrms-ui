import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdesignationComponent } from './viewdesignation.component';

describe('ViewdesignationComponent', () => {
  let component: ViewdesignationComponent;
  let fixture: ComponentFixture<ViewdesignationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdesignationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
