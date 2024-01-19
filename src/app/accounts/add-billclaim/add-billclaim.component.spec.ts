import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillclaimComponent } from './add-billclaim.component';

describe('AddBillclaimComponent', () => {
  let component: AddBillclaimComponent;
  let fixture: ComponentFixture<AddBillclaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBillclaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
