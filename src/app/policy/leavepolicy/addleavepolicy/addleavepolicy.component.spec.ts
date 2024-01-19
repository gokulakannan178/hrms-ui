import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddleavepolicyComponent } from './addleavepolicy.component';

describe('AddleavepolicyComponent', () => {
  let component: AddleavepolicyComponent;
  let fixture: ComponentFixture<AddleavepolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddleavepolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddleavepolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
