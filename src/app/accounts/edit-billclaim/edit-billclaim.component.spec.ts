import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillclaimComponent } from './edit-billclaim.component';

describe('EditBillclaimComponent', () => {
  let component: EditBillclaimComponent;
  let fixture: ComponentFixture<EditBillclaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBillclaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
