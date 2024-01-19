import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffboardcheckmasteraddComponent } from './offboardcheckmasteradd.component';

describe('OffboardcheckmasteraddComponent', () => {
  let component: OffboardcheckmasteraddComponent;
  let fixture: ComponentFixture<OffboardcheckmasteraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffboardcheckmasteraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffboardcheckmasteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
