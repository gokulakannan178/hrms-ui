import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardpolicyaddComponent } from './offboardpolicyadd.component';

describe('OffboardpolicyaddComponent', () => {
  let component: OffboardpolicyaddComponent;
  let fixture: ComponentFixture<OffboardpolicyaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardpolicyaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardpolicyaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
