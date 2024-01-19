import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardcheckmasterviewComponent } from './offboardcheckmasterview.component';

describe('OffboardcheckmasterviewComponent', () => {
  let component: OffboardcheckmasterviewComponent;
  let fixture: ComponentFixture<OffboardcheckmasterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardcheckmasterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardcheckmasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
