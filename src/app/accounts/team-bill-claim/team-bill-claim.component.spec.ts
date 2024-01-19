import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamBillClaimComponent } from './team-bill-claim.component';

describe('TeamBillClaimComponent', () => {
  let component: TeamBillClaimComponent;
  let fixture: ComponentFixture<TeamBillClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBillClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamBillClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
