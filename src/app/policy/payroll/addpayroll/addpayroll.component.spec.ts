import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpayrollComponent } from './addpayroll.component';

describe('AddpayrollComponent', () => {
  let component: AddpayrollComponent;
  let fixture: ComponentFixture<AddpayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
