import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardcheckmastereditComponent } from './offboardcheckmasteredit.component';

describe('OffboardcheckmastereditComponent', () => {
  let component: OffboardcheckmastereditComponent;
  let fixture: ComponentFixture<OffboardcheckmastereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardcheckmastereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardcheckmastereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
