import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillClaimComponent } from './bill-claim.component';

describe('BillClaimComponent', () => {
  let component: BillClaimComponent;
  let fixture: ComponentFixture<BillClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
