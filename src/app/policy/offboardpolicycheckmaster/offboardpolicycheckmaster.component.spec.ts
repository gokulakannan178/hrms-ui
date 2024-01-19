import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardpolicycheckmasterComponent } from './offboardpolicycheckmaster.component';

describe('OffboardpolicycheckmasterComponent', () => {
  let component: OffboardpolicycheckmasterComponent;
  let fixture: ComponentFixture<OffboardpolicycheckmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardpolicycheckmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardpolicycheckmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
