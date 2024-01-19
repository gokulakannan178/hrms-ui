import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillclaimComponent } from './view-billclaim.component';

describe('ViewBillclaimComponent', () => {
  let component: ViewBillclaimComponent;
  let fixture: ComponentFixture<ViewBillclaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBillclaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBillclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
