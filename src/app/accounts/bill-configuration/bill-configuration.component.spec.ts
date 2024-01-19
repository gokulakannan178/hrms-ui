import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillConfigurationComponent } from './bill-configuration.component';

describe('BillConfigurationComponent', () => {
  let component: BillConfigurationComponent;
  let fixture: ComponentFixture<BillConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
