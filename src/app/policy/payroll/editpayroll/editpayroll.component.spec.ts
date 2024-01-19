import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpayrollComponent } from './editpayroll.component';

describe('EditpayrollComponent', () => {
  let component: EditpayrollComponent;
  let fixture: ComponentFixture<EditpayrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpayrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
