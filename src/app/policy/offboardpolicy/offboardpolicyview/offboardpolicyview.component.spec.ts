import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardpolicyviewComponent } from './offboardpolicyview.component';

describe('OffboardpolicyviewComponent', () => {
  let component: OffboardpolicyviewComponent;
  let fixture: ComponentFixture<OffboardpolicyviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardpolicyviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardpolicyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
