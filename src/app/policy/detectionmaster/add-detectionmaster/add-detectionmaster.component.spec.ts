import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetectionmasterComponent } from './add-detectionmaster.component';

describe('AddDetectionmasterComponent', () => {
  let component: AddDetectionmasterComponent;
  let fixture: ComponentFixture<AddDetectionmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDetectionmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDetectionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
