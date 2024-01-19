import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionmasterComponent } from './detectionmaster.component';

describe('DetectionmasterComponent', () => {
  let component: DetectionmasterComponent;
  let fixture: ComponentFixture<DetectionmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectionmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
