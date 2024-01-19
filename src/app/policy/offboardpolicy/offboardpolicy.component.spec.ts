import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardpolicyComponent } from './offboardpolicy.component';

describe('OffboardpolicyComponent', () => {
  let component: OffboardpolicyComponent;
  let fixture: ComponentFixture<OffboardpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardpolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
