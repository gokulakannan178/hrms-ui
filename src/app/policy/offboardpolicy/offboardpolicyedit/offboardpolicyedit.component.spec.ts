import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardpolicyeditComponent } from './offboardpolicyedit.component';

describe('OffboardpolicyeditComponent', () => {
  let component: OffboardpolicyeditComponent;
  let fixture: ComponentFixture<OffboardpolicyeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardpolicyeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardpolicyeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
