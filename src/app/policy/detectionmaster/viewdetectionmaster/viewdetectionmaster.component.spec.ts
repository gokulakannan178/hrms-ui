import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdetectionmasterComponent } from './viewdetectionmaster.component';

describe('ViewdetectionmasterComponent', () => {
  let component: ViewdetectionmasterComponent;
  let fixture: ComponentFixture<ViewdetectionmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdetectionmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdetectionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
